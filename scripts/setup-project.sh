#!/bin/bash

# Complete project setup script for Revelio Creator Marketplace

echo "🚀 Setting up Revelio Creator Marketplace..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_error "Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

print_success "Node.js version $(node -v) is compatible"

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    print_error "PostgreSQL is not installed. Please install PostgreSQL first."
    print_status "On macOS: brew install postgresql"
    print_status "On Ubuntu: sudo apt-get install postgresql postgresql-contrib"
    exit 1
fi

print_success "PostgreSQL is installed"

# Check if PostgreSQL is running
if ! pg_isready -q; then
    print_warning "PostgreSQL is not running. Starting PostgreSQL..."
    if [[ "$OSTYPE" == "darwin"* ]]; then
        brew services start postgresql
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        sudo systemctl start postgresql
    fi
    
    # Wait a moment for PostgreSQL to start
    sleep 3
    
    if ! pg_isready -q; then
        print_error "Failed to start PostgreSQL. Please start it manually."
        exit 1
    fi
fi

print_success "PostgreSQL is running"

# Install root dependencies
print_status "Installing root dependencies..."
npm install

# Install backend dependencies
print_status "Installing backend dependencies..."
cd backend
npm install

# Install frontend dependencies
print_status "Installing frontend dependencies..."
cd ../frontend
npm install

# Go back to root
cd ..

# Create environment file
print_status "Setting up environment configuration..."
if [ ! -f backend/.env ]; then
    cp backend/env.example backend/.env
    print_success "Created backend/.env file"
    print_warning "Please update the DATABASE_URL in backend/.env with your PostgreSQL credentials"
else
    print_success "Environment file already exists"
fi

# Create database
print_status "Creating database..."
createdb revelio_db 2>/dev/null || print_warning "Database already exists"

# Generate Prisma client
print_status "Generating Prisma client..."
cd backend
npx prisma generate

# Run migrations
print_status "Running database migrations..."
npx prisma migrate dev --name init

# Seed the database
print_status "Seeding database with sample data..."
npm run db:seed

# Go back to root
cd ..

print_success "🎉 Project setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Update backend/.env with your database credentials"
echo "2. Configure social media API keys in backend/.env"
echo "3. Set up Stripe keys in backend/.env"
echo "4. Run 'npm run dev' to start the development servers"
echo ""
echo "🔗 Access points:"
echo "   Frontend: http://localhost:6001"
echo "   Backend API: http://localhost:6002"
echo "   Health check: http://localhost:6002/health"
echo ""
echo "👤 Sample accounts:"
echo "   Admin: admin@revelio.com / admin123"
echo "   Creator: sarah@techwriter.com / creator123"
echo "   Brand: marketing@techcorp.com / brand123"
echo ""
echo "📚 Documentation:"
echo "   README.md - Complete project documentation"
echo "   API endpoints available at /api/*"
echo ""
print_success "Happy coding! 🚀"
