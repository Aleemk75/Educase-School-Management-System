import 'dotenv/config';
import db from '../config/db.js';

const seedSchools = [
    {
        name: 'Delhi Public School',
        address: 'Mathura Road, New Delhi',
        latitude: 28.5916,
        longitude: 77.2435
    },
    {
        name: 'Modern School',
        address: 'Barakhamba Road, New Delhi',
        latitude: 28.6291,
        longitude: 77.2274
    },
    {
        name: 'The Shri Ram School',
        address: 'Vasant Vihar, New Delhi',
        latitude: 28.5639,
        longitude: 77.1593
    },
    {
        name: 'Vasant Valley School',
        address: 'Vasant Kunj, New Delhi',
        latitude: 28.5350,
        longitude: 77.1352
    },
    {
        name: 'Springdales School',
        address: 'Dhaula Kuan, New Delhi',
        latitude: 28.5873,
        longitude: 77.1603
    }
];

const seedDatabase = async () => {
    console.log('Seeding the database with 5 schools...');
    try {
        const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';

        for (const school of seedSchools) {
            await db.execute(query, [school.name, school.address, school.latitude, school.longitude]);
            console.log(`Added: ${school.name}`);
        }

        console.log('✅ Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding the database:', error.message);
        process.exit(1);
    }
};

seedDatabase();
