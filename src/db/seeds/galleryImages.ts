import { db } from '@/db';
import { galleryImages } from '@/db/schema';

async function main() {
    const sampleGalleryImages = [
        // Infrastructure Category (4 images)
        {
            title: 'Smart Grid Renewable Energy Integration',
            altText: 'Modern smart electrical grid infrastructure with solar panels, wind turbines, and digital monitoring systems showcasing renewable energy integration and intelligent power distribution networks',
            imageUrl: 'https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=1200&h=800&fit=crop',
            category: 'infrastructure',
            order: 0,
            published: true,
            createdAt: new Date('2024-01-15').toISOString(),
            updatedAt: new Date('2024-01-15').toISOString(),
        },
        {
            title: '5G Wireless Infrastructure Network',
            altText: '5G cell tower and wireless communication infrastructure with advanced antenna arrays and signal transmission equipment against urban skyline backdrop',
            imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
            category: 'infrastructure',
            order: 1,
            published: true,
            createdAt: new Date('2024-01-20').toISOString(),
            updatedAt: new Date('2024-01-20').toISOString(),
        },
        {
            title: 'Digital Transportation Hub',
            altText: 'Modern transportation hub featuring digital displays, smart signage, and integrated mobility solutions with passengers using advanced transit systems',
            imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&h=800&fit=crop',
            category: 'infrastructure',
            order: 2,
            published: true,
            createdAt: new Date('2024-01-25').toISOString(),
            updatedAt: new Date('2024-01-25').toISOString(),
        },
        {
            title: 'Solar Energy Storage Facility',
            altText: 'Large-scale solar panel array with battery energy storage systems and monitoring infrastructure for sustainable power generation and grid stabilization',
            imageUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&h=800&fit=crop',
            category: 'infrastructure',
            order: 3,
            published: true,
            createdAt: new Date('2024-02-01').toISOString(),
            updatedAt: new Date('2024-02-01').toISOString(),
        },
        // Technology Category (4 images)
        {
            title: 'Modern Data Center Operations',
            altText: 'State-of-the-art data center with rows of server racks, advanced cooling systems, and LED status indicators showing cloud computing infrastructure',
            imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=800&fit=crop',
            category: 'technology',
            order: 4,
            published: true,
            createdAt: new Date('2024-02-05').toISOString(),
            updatedAt: new Date('2024-02-05').toISOString(),
        },
        {
            title: 'Industrial IoT Sensor Network',
            altText: 'Internet of Things sensors and monitoring devices deployed in industrial facility with wireless connectivity and real-time data collection capabilities',
            imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=800&fit=crop',
            category: 'technology',
            order: 5,
            published: true,
            createdAt: new Date('2024-02-10').toISOString(),
            updatedAt: new Date('2024-02-10').toISOString(),
        },
        {
            title: 'AI Research Laboratory',
            altText: 'Advanced artificial intelligence research laboratory with high-performance computers, multiple monitors, and scientists working on machine learning algorithms',
            imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=800&fit=crop',
            category: 'technology',
            order: 6,
            published: true,
            createdAt: new Date('2024-02-15').toISOString(),
            updatedAt: new Date('2024-02-15').toISOString(),
        },
        {
            title: 'Robotics Testing Facility',
            altText: 'Modern robotics and automation testing facility with robotic arms, precision equipment, and engineers conducting advanced technology development',
            imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=800&fit=crop',
            category: 'technology',
            order: 7,
            published: true,
            createdAt: new Date('2024-02-20').toISOString(),
            updatedAt: new Date('2024-02-20').toISOString(),
        },
        // Innovation Category (4 images)
        {
            title: 'Startup Incubator Workspace',
            altText: 'Modern startup incubator space with collaborative work areas, open office design, and diverse teams working on innovative technology projects',
            imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop',
            category: 'innovation',
            order: 8,
            published: true,
            createdAt: new Date('2024-02-25').toISOString(),
            updatedAt: new Date('2024-02-25').toISOString(),
        },
        {
            title: 'University Research Center',
            altText: 'State-of-the-art university research center with modern laboratory equipment, scientific instruments, and researchers conducting cutting-edge studies',
            imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200&h=800&fit=crop',
            category: 'innovation',
            order: 9,
            published: true,
            createdAt: new Date('2024-03-01').toISOString(),
            updatedAt: new Date('2024-03-01').toISOString(),
        },
        {
            title: 'Innovation Hub Collaboration',
            altText: 'Dynamic innovation hub featuring diverse teams collaborating on technology projects with modern workspaces, whiteboards, and creative problem-solving areas',
            imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=800&fit=crop',
            category: 'innovation',
            order: 10,
            published: true,
            createdAt: new Date('2024-03-05').toISOString(),
            updatedAt: new Date('2024-03-05').toISOString(),
        },
        {
            title: 'Technology Conference Showcase',
            altText: 'Technology conference or pitch event with entrepreneurs presenting innovative solutions, modern auditorium setting, and audience engagement',
            imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=800&fit=crop',
            category: 'innovation',
            order: 11,
            published: true,
            createdAt: new Date('2024-03-10').toISOString(),
            updatedAt: new Date('2024-03-10').toISOString(),
        },
        // Manufacturing Category (4 images)
        {
            title: 'Automated Factory Assembly Line',
            altText: 'Advanced automated factory floor with robotic assembly lines, precision manufacturing equipment, and smart production systems in Industry 4.0 facility',
            imageUrl: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1200&h=800&fit=crop',
            category: 'manufacturing',
            order: 12,
            published: true,
            createdAt: new Date('2024-03-15').toISOString(),
            updatedAt: new Date('2024-03-15').toISOString(),
        },
        {
            title: 'Smart Manufacturing Control Room',
            altText: 'High-tech manufacturing control room with multiple monitors displaying production data, real-time analytics, and operators managing smart factory operations',
            imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=800&fit=crop',
            category: 'manufacturing',
            order: 13,
            published: true,
            createdAt: new Date('2024-03-20').toISOString(),
            updatedAt: new Date('2024-03-20').toISOString(),
        },
        {
            title: '3D Printing Manufacturing Facility',
            altText: 'Advanced 3D printing and additive manufacturing facility with industrial printers, precision fabrication equipment, and innovative production technologies',
            imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&h=800&fit=crop',
            category: 'manufacturing',
            order: 14,
            published: true,
            createdAt: new Date('2024-03-25').toISOString(),
            updatedAt: new Date('2024-03-25').toISOString(),
        },
        {
            title: 'Sustainable Green Manufacturing',
            altText: 'Eco-friendly sustainable production line incorporating green technology, energy-efficient systems, and environmentally responsible manufacturing processes',
            imageUrl: 'https://images.unsplash.com/photo-1581093458791-9d42e75b2eda?w=1200&h=800&fit=crop',
            category: 'manufacturing',
            order: 15,
            published: true,
            createdAt: new Date('2024-03-30').toISOString(),
            updatedAt: new Date('2024-03-30').toISOString(),
        }
    ];

    await db.insert(galleryImages).values(sampleGalleryImages);
    
    console.log('✅ Gallery images seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});