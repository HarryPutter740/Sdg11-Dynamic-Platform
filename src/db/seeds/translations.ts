import { db } from '@/db';
import { translations } from '@/db/schema';

async function main() {
    // First, delete all existing translations
    await db.delete(translations);
    
    const sampleTranslations = [
        // Navigation Keys
        { key: 'nav_home', language: 'EN', value: 'Home' },
        { key: 'nav_home', language: 'ES', value: 'Inicio' },
        { key: 'nav_gallery', language: 'EN', value: 'Gallery' },
        { key: 'nav_gallery', language: 'ES', value: 'Galería' },
        { key: 'nav_stories', language: 'EN', value: 'Stories' },
        { key: 'nav_stories', language: 'ES', value: 'Historias' },
        { key: 'nav_blog', language: 'EN', value: 'Blog' },
        { key: 'nav_blog', language: 'ES', value: 'Blog' },
        { key: 'nav_about', language: 'EN', value: 'About' },
        { key: 'nav_about', language: 'ES', value: 'Acerca de' },
        { key: 'nav_contact', language: 'EN', value: 'Contact' },
        { key: 'nav_contact', language: 'ES', value: 'Contacto' },

        // Hero Section - SDG-09 Focused
        { key: 'hero_title', language: 'EN', value: 'Building Industrial Innovation and Infrastructure' },
        { key: 'hero_title', language: 'ES', value: 'Construyendo Innovación Industrial e Infraestructura' },
        { key: 'hero_subtitle', language: 'EN', value: 'Creating resilient infrastructure, sustainable industrialization, and fostering innovation' },
        { key: 'hero_subtitle', language: 'ES', value: 'Creando infraestructura resiliente, industrialización sostenible y fomentando la innovación' },
        { key: 'hero_cta_button', language: 'EN', value: 'Explore Innovation' },
        { key: 'hero_cta_button', language: 'ES', value: 'Explorar Innovación' },
        { key: 'hero_description', language: 'EN', value: 'Advancing SDG-09 through transformative industrial development, cutting-edge technology solutions, and robust infrastructure projects that drive economic growth and sustainable development worldwide.' },
        { key: 'hero_description', language: 'ES', value: 'Avanzando el ODS-09 a través del desarrollo industrial transformador, soluciones tecnológicas de vanguardia y proyectos de infraestructura robusta que impulsan el crecimiento económico y el desarrollo sostenible a nivel mundial.' },

        // Gallery Section - SDG-09 Themes
        { key: 'gallery_title', language: 'EN', value: 'Industrial Innovation Gallery' },
        { key: 'gallery_title', language: 'ES', value: 'Galería de Innovación Industrial' },
        { key: 'gallery_subtitle', language: 'EN', value: 'Visual stories of infrastructure development and industrial advancement' },
        { key: 'gallery_subtitle', language: 'ES', value: 'Historias visuales del desarrollo de infraestructura y avance industrial' },
        { key: 'gallery_filter_all', language: 'EN', value: 'All Projects' },
        { key: 'gallery_filter_all', language: 'ES', value: 'Todos los Proyectos' },
        { key: 'gallery_filter_infrastructure', language: 'EN', value: 'Infrastructure' },
        { key: 'gallery_filter_infrastructure', language: 'ES', value: 'Infraestructura' },
        { key: 'gallery_filter_technology', language: 'EN', value: 'Technology' },
        { key: 'gallery_filter_technology', language: 'ES', value: 'Tecnología' },
        { key: 'gallery_filter_innovation', language: 'EN', value: 'Innovation' },
        { key: 'gallery_filter_innovation', language: 'ES', value: 'Innovación' },
        { key: 'gallery_filter_manufacturing', language: 'EN', value: 'Manufacturing' },
        { key: 'gallery_filter_manufacturing', language: 'ES', value: 'Manufactura' },

        // Story Section
        { key: 'stories_title', language: 'EN', value: 'Innovation Impact Stories' },
        { key: 'stories_title', language: 'ES', value: 'Historias de Impacto de Innovación' },
        { key: 'stories_subtitle', language: 'EN', value: 'Real stories from industrial innovation projects worldwide' },
        { key: 'stories_subtitle', language: 'ES', value: 'Historias reales de proyectos de innovación industrial a nivel mundial' },
        { key: 'stories_read_more', language: 'EN', value: 'Read More' },
        { key: 'stories_read_more', language: 'ES', value: 'Leer Más' },

        // Blog Section
        { key: 'blog_title', language: 'EN', value: 'Latest Industry Insights' },
        { key: 'blog_title', language: 'ES', value: 'Últimas Perspectivas de la Industria' },
        { key: 'blog_subtitle', language: 'EN', value: 'Stay updated with industrial innovation and infrastructure development' },
        { key: 'blog_subtitle', language: 'ES', value: 'Mantente actualizado con la innovación industrial y el desarrollo de infraestructura' },
        { key: 'blog_read_more', language: 'EN', value: 'Read Article' },
        { key: 'blog_read_more', language: 'ES', value: 'Leer Artículo' },
        { key: 'blog_published_on', language: 'EN', value: 'Published on' },
        { key: 'blog_published_on', language: 'ES', value: 'Publicado el' },
        { key: 'blog_by_author', language: 'EN', value: 'by' },
        { key: 'blog_by_author', language: 'ES', value: 'por' },

        // Footer
        { key: 'footer_about', language: 'EN', value: 'About SDG 09' },
        { key: 'footer_about', language: 'ES', value: 'Acerca del ODS 09' },
        { key: 'footer_links', language: 'EN', value: 'Useful Links' },
        { key: 'footer_links', language: 'ES', value: 'Enlaces Útiles' },
        { key: 'footer_contact', language: 'EN', value: 'Contact Us' },
        { key: 'footer_contact', language: 'ES', value: 'Contáctanos' },
        { key: 'footer_social', language: 'EN', value: 'Follow Us' },
        { key: 'footer_social', language: 'ES', value: 'Síguenos' },
        { key: 'footer_copyright', language: 'EN', value: '© 2024 SDG 09 Initiative. All rights reserved.' },
        { key: 'footer_copyright', language: 'ES', value: '© 2024 Iniciativa ODS 09. Todos los derechos reservados.' },

        // Contact Form
        { key: 'contact_title', language: 'EN', value: 'Get in Touch' },
        { key: 'contact_title', language: 'ES', value: 'Ponte en Contacto' },
        { key: 'contact_name', language: 'EN', value: 'Full Name' },
        { key: 'contact_name', language: 'ES', value: 'Nombre Completo' },
        { key: 'contact_email', language: 'EN', value: 'Email Address' },
        { key: 'contact_email', language: 'ES', value: 'Dirección de Email' },
        { key: 'contact_message', language: 'EN', value: 'Your Message' },
        { key: 'contact_message', language: 'ES', value: 'Tu Mensaje' },
        { key: 'contact_submit', language: 'EN', value: 'Send Message' },
        { key: 'contact_submit', language: 'ES', value: 'Enviar Mensaje' },
        { key: 'contact_success', language: 'EN', value: 'Thank you! Your message has been sent successfully.' },
        { key: 'contact_success', language: 'ES', value: '¡Gracias! Tu mensaje ha sido enviado exitosamente.' },

        // Search
        { key: 'search_placeholder', language: 'EN', value: 'Search articles, case studies, and innovation resources...' },
        { key: 'search_placeholder', language: 'ES', value: 'Buscar artículos, casos de estudio y recursos de innovación...' },
        { key: 'search_no_results', language: 'EN', value: 'No results found' },
        { key: 'search_no_results', language: 'ES', value: 'No se encontraron resultados' },
        { key: 'search_results_for', language: 'EN', value: 'Search results for' },
        { key: 'search_results_for', language: 'ES', value: 'Resultados de búsqueda para' },

        // General UI
        { key: 'loading', language: 'EN', value: 'Loading...' },
        { key: 'loading', language: 'ES', value: 'Cargando...' },
        { key: 'error', language: 'EN', value: 'Error' },
        { key: 'error', language: 'ES', value: 'Error' },
        { key: 'close', language: 'EN', value: 'Close' },
        { key: 'close', language: 'ES', value: 'Cerrar' },
        { key: 'back', language: 'EN', value: 'Back' },
        { key: 'back', language: 'ES', value: 'Atrás' },
        { key: 'next', language: 'EN', value: 'Next' },
        { key: 'next', language: 'ES', value: 'Siguiente' },
        { key: 'previous', language: 'EN', value: 'Previous' },
        { key: 'previous', language: 'ES', value: 'Anterior' },
        { key: 'show_more', language: 'EN', value: 'Show More' },
        { key: 'show_more', language: 'ES', value: 'Mostrar Más' },
        { key: 'category', language: 'EN', value: 'Category' },
        { key: 'category', language: 'ES', value: 'Categoría' },
        { key: 'published_on', language: 'EN', value: 'Published on' },
        { key: 'published_on', language: 'ES', value: 'Publicado el' }
    ];

    await db.insert(translations).values(sampleTranslations);
    
    console.log('✅ SDG-09 translations seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});