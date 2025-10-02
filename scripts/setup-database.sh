#!/bin/bash

# Database setup script for Revelio Creator Marketplace

echo "🚀 Setting up Revelio Database..."

# Check if PostgreSQL is running
if ! pg_isready -q; then
    echo "❌ PostgreSQL is not running. Please start PostgreSQL first."
    echo "   On macOS: brew services start postgresql"
    echo "   On Ubuntu: sudo systemctl start postgresql"
    exit 1
fi

# Create database if it doesn't exist
echo "📊 Creating database..."
createdb revelio_db 2>/dev/null || echo "Database already exists"

# Navigate to backend directory
cd backend

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Run migrations
echo "🗄️ Running database migrations..."
npx prisma migrate dev --name init

# Seed the database
echo "🌱 Seeding database with sample data..."
npm run db:seed

echo "✅ Database setup complete!"
echo ""
echo "Next steps:"
echo "1. Copy backend/env.example to backend/.env"
echo "2. Update the DATABASE_URL in backend/.env"
echo "3. Run 'npm run dev' to start the development servers"
