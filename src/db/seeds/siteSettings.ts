import { db } from '@/db';
import { siteSettings } from '@/db/schema';

async function main() {
    const currentTimestamp = new Date().toISOString();
    
    const sampleSettings = [
        {
            key: 'site_title',
            value: 'SDG 09: Industry, Innovation and Infrastructure',
            updatedAt: currentTimestamp,
        },
        {
            key: 'site_description',
            value: 'Advancing sustainable industrial development through innovation and resilient infrastructure. Join our global platform dedicated to fostering inclusive and sustainable industrialization, promoting technological advancement, and building robust infrastructure for economic growth and social progress.',
            updatedAt: currentTimestamp,
        },
        {
            key: 'site_url',
            value: 'https://sdg09innovation.org',
            updatedAt: currentTimestamp,
        },
        {
            key: 'admin_email',
            value: 'admin@sdg09innovation.org',
            updatedAt: currentTimestamp,
        },
        {
            key: 'contact_email',
            value: 'contact@sdg09innovation.org',
            updatedAt: currentTimestamp,
        },
        {
            key: 'default_language',
            value: 'EN',
            updatedAt: currentTimestamp,
        },
        {
            key: 'supported_languages',
            value: 'EN,ES',
            updatedAt: currentTimestamp,
        },
        {
            key: 'items_per_page',
            value: '10',
            updatedAt: currentTimestamp,
        },
        {
            key: 'gallery_items_per_page',
            value: '6',
            updatedAt: currentTimestamp,
        },
        {
            key: 'max_upload_size',
            value: '10485760',
            updatedAt: currentTimestamp,
        },
        {
            key: 'social_twitter',
            value: '@SDG09Innovation',
            updatedAt: currentTimestamp,
        },
        {
            key: 'social_linkedin',
            value: 'company/sdg09innovation',
            updatedAt: currentTimestamp,
        },
        {
            key: 'social_youtube',
            value: 'channel/sdg09innovation',
            updatedAt: currentTimestamp,
        },
        {
            key: 'maintenance_mode',
            value: 'false',
            updatedAt: currentTimestamp,
        },
        {
            key: 'registration_enabled',
            value: 'false',
            updatedAt: currentTimestamp,
        },
        {
            key: 'comments_enabled',
            value: 'true',
            updatedAt: currentTimestamp,
        },
        {
            key: 'newsletter_enabled',
            value: 'true',
            updatedAt: currentTimestamp,
        },
        {
            key: 'search_enabled',
            value: 'true',
            updatedAt: currentTimestamp,
        },
        {
            key: 'analytics_id',
            value: 'G-XXXXXXXXXX',
            updatedAt: currentTimestamp,
        },
        {
            key: 'cache_duration',
            value: '3600',
            updatedAt: currentTimestamp,
        }
    ];

    await db.insert(siteSettings).values(sampleSettings);
    
    console.log('✅ Site settings seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});