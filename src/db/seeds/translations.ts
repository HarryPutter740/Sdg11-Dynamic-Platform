import { db } from '@/db';
import { translations } from '@/db/schema';

async function main() {
    const translationUpdates = [
        {
            key: 'nav_targets',
            language: 'en',
            value: 'Targets',
        },
        {
            key: 'nav_targets',
            language: 'es',
            value: 'Targets',
        },
        {
            key: 'targets_hero_title',
            language: 'en',
            value: 'Building Tomorrow\'s Infrastructure',
        },
        {
            key: 'targets_hero_title',
            language: 'es',
            value: 'Construyendo la Infraestructura del Mañana',
        },
        {
            key: 'data_hub_title',
            language: 'en',
            value: 'Innovation by Numbers',
        },
        {
            key: 'data_hub_title',
            language: 'es',
            value: 'Innovación en Cifras',
        }
    ];

    for (const translation of translationUpdates) {
        await db.insert(translations)
            .values(translation)
            .onConflictDoUpdate({
                target: [translations.key, translations.language],
                set: {
                    value: translation.value
                }
            });
    }
    
    console.log('✅ Translations seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});