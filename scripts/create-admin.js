// Script to create the first admin user
// Run with: node scripts/create-admin.js
/* eslint-disable @typescript-eslint/no-require-imports */

const bcrypt = require('bcryptjs');
const { PrismaClient } = require('../src/generated/prisma');

const prisma = new PrismaClient();

async function createAdmin() {
    try {
        console.log('Creating admin user...\n');

        // Admin details - CHANGE THESE!
        const adminData = {
            name: 'Super Admin',
            email: 'admin@sesacampus.com', // Change this
            password: 'Admin@123',          // Change this to a secure password
            role: 'superadmin'
        };

        // Check if admin already exists
        const existingAdmin = await prisma.admin.findUnique({
            where: { email: adminData.email },
        });

        if (existingAdmin) {
            console.log(`❌ Admin with email ${adminData.email} already exists!`);
            process.exit(1);
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(adminData.password, 10);

        // Create admin
        const newAdmin = await prisma.admin.create({
            data: {
                name: adminData.name,
                email: adminData.email,
                password: hashedPassword,
                role: adminData.role,
            },
        });

        console.log('✅ Admin user created successfully!\n');
        console.log('Admin Details:');
        console.log(`  Name: ${newAdmin.name}`);
        console.log(`  Email: ${newAdmin.email}`);
        console.log(`  Role: ${newAdmin.role}`);
        console.log(`  ID: ${newAdmin.id}`);
        console.log('\n⚠️  Please save these credentials and delete this script or change the password!');

    } catch (error) {
        console.error('❌ Error creating admin:', error);
    } finally {
        await prisma.$disconnect();
    }
}

createAdmin();
