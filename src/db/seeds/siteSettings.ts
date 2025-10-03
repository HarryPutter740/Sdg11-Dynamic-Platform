import { db } from '@/db';
import { siteSettings } from '@/db/schema';

async function main() {
    const currentTimestamp = new Date().toISOString();
    
    const sampleSiteSettings = [
        {
            key: 'site_title',
            value: 'SDG 11: Sustainable Cities and Communities',
            updatedAt: currentTimestamp,
        },
        {
            key: 'site_description',
            value: 'A comprehensive platform dedicated to promoting sustainable urban development and building inclusive, safe, resilient communities worldwide.',
            updatedAt: currentTimestamp,
        },
        {
            key: 'admin_email',
            value: 'admin@sdg11cities.org',
            updatedAt: currentTimestamp,
        },
        {
            key: 'contact_email',
            value: 'contact@sdg11cities.org',
            updatedAt: currentTimestamp,
        },
        {
            key: 'site_url',
            value: 'https://sdg11cities.org',
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
            value: '@SDG11Cities',
            updatedAt: currentTimestamp,
        },
        {
            key: 'social_linkedin',
            value: 'company/sdg11cities',
            updatedAt: currentTimestamp,
        },
        {
            key: 'social_youtube',
            value: 'channel/sdg11cities',
            updatedAt: currentTimestamp,
        },
        {
            key: 'analytics_id',
            value: 'G-XXXXXXXXXX',
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
            key: 'cache_duration',
            value: '3600',
            updatedAt: currentTimestamp,
        }
    ];

    await db.insert(siteSettings).values(sampleSiteSettings);
    
    console.log('✅ Site settings seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});