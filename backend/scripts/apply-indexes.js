#!/usr/bin/env node

/**
 * Script to apply database indexes for performance optimization
 * Run this after updating the Prisma schema with new indexes
 */

const { execSync } = require('child_process');
const path = require('path');

console.log('🚀 Applying database indexes for performance optimization...\n');

try {
  // Change to backend directory
  process.chdir(path.join(__dirname, '..'));

  console.log('📊 Generating Prisma client...');
  execSync('npx prisma generate', { stdio: 'inherit' });

  console.log('\n🗄️  Creating database migration for indexes...');
  execSync('npx prisma migrate dev --name add-performance-indexes', { stdio: 'inherit' });

  console.log('\n✅ Database indexes applied successfully!');
  console.log('\n📈 Performance improvements:');
  console.log('   • Faster user lookups by role and creation date');
  console.log('   • Optimized creator searches and filtering');
  console.log('   • Improved content queries and pagination');
  console.log('   • Enhanced analytics and performance queries');
  console.log('   • Better campaign and contract lookups');
  console.log('   • Faster brief and application searches');

} catch (error) {
  console.error('❌ Error applying database indexes:', error.message);
  process.exit(1);
}
