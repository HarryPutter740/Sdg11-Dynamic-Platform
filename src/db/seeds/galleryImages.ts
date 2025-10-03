import { db } from '@/db';
import { galleryImages } from '@/db/schema';

async function main() {
    const sampleGalleryImages = [
        // Nature category (4 images)
        {
            title: 'Central Park Green Oasis',
            altText: 'Aerial view of Central Park surrounded by Manhattan skyscrapers showing urban green space integration',
            imageUrl: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
            category: 'nature',
            order: 1,
            published: true,
            createdAt: new Date('2024-01-15').toISOString(),
            updatedAt: new Date('2024-01-15').toISOString(),
        },
        {
            title: 'Urban Rooftop Garden Paradise',
            altText: 'Lush rooftop garden with vegetables and herbs growing on top of city building with skyline in background',
            imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
            category: 'nature',
            order: 3,
            published: true,
            createdAt: new Date('2024-01-18').toISOString(),
            updatedAt: new Date('2024-01-18').toISOString(),
        },
        {
            title: 'Tree-Lined Boulevard',
            altText: 'Beautiful tree-lined street with mature oak trees creating natural canopy over urban boulevard',
            imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
            category: 'nature',
            order: 5,
            published: true,
            createdAt: new Date('2024-01-20').toISOString(),
            updatedAt: new Date('2024-01-20').toISOString(),
        },
        {
            title: 'Urban Waterfront Restoration',
            altText: 'Restored urban waterfront with native plants and walking paths alongside clean river in city center',
            imageUrl: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
            category: 'nature',
            order: 7,
            published: true,
            createdAt: new Date('2024-01-22').toISOString(),
            updatedAt: new Date('2024-01-22').toISOString(),
        },
        
        // Transport category (4 images)
        {
            title: 'Electric Bus Fleet',
            altText: 'Modern electric bus at city bus stop with solar panel roof and zero emission signage',
            imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
            category: 'transport',
            order: 2,
            published: true,
            createdAt: new Date('2024-01-16').toISOString(),
            updatedAt: new Date('2024-01-16').toISOString(),
        },
        {
            title: 'Protected Bicycle Infrastructure',
            altText: 'Wide protected bicycle lane with green barriers separating cyclists from traffic in busy urban area',
            imageUrl: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
            category: 'transport',
            order: 4,
            published: true,
            createdAt: new Date('2024-01-19').toISOString(),
            updatedAt: new Date('2024-01-19').toISOString(),
        },
        {
            title: 'EV Charging Station Hub',
            altText: 'Modern electric vehicle charging station with multiple charging ports and solar canopy in urban setting',
            imageUrl: 'https://images.unsplash.com/photo-1593941707882-a5bac6861d75?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
            category: 'transport',
            order: 6,
            published: true,
            createdAt: new Date('2024-01-21').toISOString(),
            updatedAt: new Date('2024-01-21').toISOString(),
        },
        {
            title: 'Pedestrian Sky Bridge',
            altText: 'Modern pedestrian bridge with glass panels connecting buildings over busy street with trees and walking areas',
            imageUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
            category: 'transport',
            order: 8,
            published: true,
            createdAt: new Date('2024-01-23').toISOString(),
            updatedAt: new Date('2024-01-23').toISOString(),
        },

        // Architecture category (4 images)
        {
            title: 'Solar Panel Office Complex',
            altText: 'Modern office building with extensive solar panel array on roof and green walls with vertical gardens',
            imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
            category: 'architecture',
            order: 0,
            published: true,
            createdAt: new Date('2024-01-14').toISOString(),
            updatedAt: new Date('2024-01-14').toISOString(),
        },
        {
            title: 'Sustainable High-Rise Tower',
            altText: 'Tall green building with terraced gardens on multiple floors and energy-efficient glass facade',
            imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
            category: 'architecture',
            order: 9,
            published: true,
            createdAt: new Date('2024-01-24').toISOString(),
            updatedAt: new Date('2024-01-24').toISOString(),
        },
        {
            title: 'Eco-Friendly Housing Development',
            altText: 'Modern sustainable housing complex with solar panels, green roofs, and energy-efficient design elements',
            imageUrl: 'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
            category: 'architecture',
            order: 10,
            published: true,
            createdAt: new Date('2024-01-25').toISOString(),
            updatedAt: new Date('2024-01-25').toISOString(),
        },
        {
            title: 'LEED Certified Corporate Campus',
            altText: 'Award-winning green office building with living walls, natural lighting, and sustainable materials',
            imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
            category: 'architecture',
            order: 2,
            published: true,
            createdAt: new Date('2024-01-17').toISOString(),
            updatedAt: new Date('2024-01-17').toISOString(),
        },

        // Housing category (4 images)
        {
            title: 'Affordable Housing Community',
            altText: 'Colorful affordable housing development with playgrounds, community spaces, and accessible design features',
            imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
            category: 'housing',
            order: 1,
            published: true,
            createdAt: new Date('2024-01-15').toISOString(),
            updatedAt: new Date('2024-01-15').toISOString(),
        },
        {
            title: 'Social Housing Innovation',
            altText: 'Modern social housing project with mixed-income units, community garden, and integrated public spaces',
            imageUrl: 'https://images.unsplash.com/photo-1515263487990-61b07816b924?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
            category: 'housing',
            order: 4,
            published: true,
            createdAt: new Date('2024-01-19').toISOString(),
            updatedAt: new Date('2024-01-19').toISOString(),
        },
        {
            title: 'Sustainable Residential District',
            altText: 'Eco-friendly residential neighborhood with energy-efficient homes, shared green spaces, and solar installations',
            imageUrl: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
            category: 'housing',
            order: 7,
            published: true,
            createdAt: new Date('2024-01-22').toISOString(),
            updatedAt: new Date('2024-01-22').toISOString(),
        },
        {
            title: 'Inclusive Housing Complex',
            altText: 'Diverse housing development designed for accessibility with ramps, wide pathways, and universal design principles',
            imageUrl: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
            category: 'housing',
            order: 9,
            published: true,
            createdAt: new Date('2024-01-24').toISOString(),
            updatedAt: new Date('2024-01-24').toISOString(),
        }
    ];

    await db.insert(galleryImages).values(sampleGalleryImages);
    
    console.log('✅ Gallery images seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});