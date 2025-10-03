import { db } from '@/db';
import { translations } from '@/db/schema';

async function main() {
    const sampleTranslations = [
        // Navigation keys - EN
        { key: 'nav_home', language: 'EN', value: 'Home' },
        { key: 'nav_gallery', language: 'EN', value: 'Gallery' },
        { key: 'nav_stories', language: 'EN', value: 'Stories' },
        { key: 'nav_blog', language: 'EN', value: 'Blog' },
        { key: 'nav_about', language: 'EN', value: 'About' },
        { key: 'nav_contact', language: 'EN', value: 'Contact' },

        // Navigation keys - ES
        { key: 'nav_home', language: 'ES', value: 'Inicio' },
        { key: 'nav_gallery', language: 'ES', value: 'Galería' },
        { key: 'nav_stories', language: 'ES', value: 'Historias' },
        { key: 'nav_blog', language: 'ES', value: 'Blog' },
        { key: 'nav_about', language: 'ES', value: 'Acerca de' },
        { key: 'nav_contact', language: 'ES', value: 'Contacto' },

        // Hero section - EN
        { key: 'hero_title', language: 'EN', value: 'Building Sustainable Cities and Communities' },
        { key: 'hero_subtitle', language: 'EN', value: 'Creating inclusive, safe, resilient and sustainable urban spaces for everyone' },
        { key: 'hero_cta_button', language: 'EN', value: 'Explore Our Impact' },
        { key: 'hero_description', language: 'EN', value: 'Discover how we are working towards SDG 11 through innovative urban planning, sustainable transportation, and community-driven development projects.' },

        // Hero section - ES
        { key: 'hero_title', language: 'ES', value: 'Construyendo Ciudades y Comunidades Sostenibles' },
        { key: 'hero_subtitle', language: 'ES', value: 'Creando espacios urbanos inclusivos, seguros, resilientes y sostenibles para todos' },
        { key: 'hero_cta_button', language: 'ES', value: 'Explora Nuestro Impacto' },
        { key: 'hero_description', language: 'ES', value: 'Descubre cómo trabajamos hacia el ODS 11 a través de planificación urbana innovadora, transporte sostenible y proyectos de desarrollo impulsados por la comunidad.' },

        // Gallery section - EN
        { key: 'gallery_title', language: 'EN', value: 'Urban Sustainability Gallery' },
        { key: 'gallery_subtitle', language: 'EN', value: 'Visual stories of sustainable urban development' },
        { key: 'gallery_filter_all', language: 'EN', value: 'All Images' },
        { key: 'gallery_filter_nature', language: 'EN', value: 'Green Spaces' },
        { key: 'gallery_filter_transport', language: 'EN', value: 'Transportation' },
        { key: 'gallery_filter_architecture', language: 'EN', value: 'Architecture' },
        { key: 'gallery_filter_housing', language: 'EN', value: 'Housing' },

        // Gallery section - ES
        { key: 'gallery_title', language: 'ES', value: 'Galería de Sostenibilidad Urbana' },
        { key: 'gallery_subtitle', language: 'ES', value: 'Historias visuales del desarrollo urbano sostenible' },
        { key: 'gallery_filter_all', language: 'ES', value: 'Todas las Imágenes' },
        { key: 'gallery_filter_nature', language: 'ES', value: 'Espacios Verdes' },
        { key: 'gallery_filter_transport', language: 'ES', value: 'Transporte' },
        { key: 'gallery_filter_architecture', language: 'ES', value: 'Arquitectura' },
        { key: 'gallery_filter_housing', language: 'ES', value: 'Vivienda' },

        // Story section - EN
        { key: 'stories_title', language: 'EN', value: 'Community Impact Stories' },
        { key: 'stories_subtitle', language: 'EN', value: 'Real stories from sustainable communities around the world' },
        { key: 'stories_read_more', language: 'EN', value: 'Read Full Story' },

        // Story section - ES
        { key: 'stories_title', language: 'ES', value: 'Historias de Impacto Comunitario' },
        { key: 'stories_subtitle', language: 'ES', value: 'Historias reales de comunidades sostenibles alrededor del mundo' },
        { key: 'stories_read_more', language: 'ES', value: 'Leer Historia Completa' },

        // Blog section - EN
        { key: 'blog_title', language: 'EN', value: 'Latest Insights' },
        { key: 'blog_subtitle', language: 'EN', value: 'Stay updated with the latest in sustainable urban development' },
        { key: 'blog_read_more', language: 'EN', value: 'Read More' },
        { key: 'blog_published_on', language: 'EN', value: 'Published on' },
        { key: 'blog_by_author', language: 'EN', value: 'by' },

        // Blog section - ES
        { key: 'blog_title', language: 'ES', value: 'Últimas Perspectivas' },
        { key: 'blog_subtitle', language: 'ES', value: 'Mantente actualizado con lo último en desarrollo urbano sostenible' },
        { key: 'blog_read_more', language: 'ES', value: 'Leer Más' },
        { key: 'blog_published_on', language: 'ES', value: 'Publicado el' },
        { key: 'blog_by_author', language: 'ES', value: 'por' },

        // Footer - EN
        { key: 'footer_about', language: 'EN', value: 'About SDG 11' },
        { key: 'footer_links', language: 'EN', value: 'Quick Links' },
        { key: 'footer_contact', language: 'EN', value: 'Contact Information' },
        { key: 'footer_social', language: 'EN', value: 'Follow Us' },
        { key: 'footer_copyright', language: 'EN', value: '© 2024 SDG 11 Initiative. All rights reserved.' },

        // Footer - ES
        { key: 'footer_about', language: 'ES', value: 'Acerca del ODS 11' },
        { key: 'footer_links', language: 'ES', value: 'Enlaces Rápidos' },
        { key: 'footer_contact', language: 'ES', value: 'Información de Contacto' },
        { key: 'footer_social', language: 'ES', value: 'Síguenos' },
        { key: 'footer_copyright', language: 'ES', value: '© 2024 Iniciativa ODS 11. Todos los derechos reservados.' },

        // Contact form - EN
        { key: 'contact_title', language: 'EN', value: 'Get in Touch' },
        { key: 'contact_name', language: 'EN', value: 'Full Name' },
        { key: 'contact_email', language: 'EN', value: 'Email Address' },
        { key: 'contact_message', language: 'EN', value: 'Your Message' },
        { key: 'contact_submit', language: 'EN', value: 'Send Message' },
        { key: 'contact_success', language: 'EN', value: 'Thank you! Your message has been sent successfully.' },

        // Contact form - ES
        { key: 'contact_title', language: 'ES', value: 'Contáctanos' },
        { key: 'contact_name', language: 'ES', value: 'Nombre Completo' },
        { key: 'contact_email', language: 'ES', value: 'Dirección de Correo' },
        { key: 'contact_message', language: 'ES', value: 'Tu Mensaje' },
        { key: 'contact_submit', language: 'ES', value: 'Enviar Mensaje' },
        { key: 'contact_success', language: 'ES', value: '¡Gracias! Tu mensaje ha sido enviado exitosamente.' },

        // Search - EN
        { key: 'search_placeholder', language: 'EN', value: 'Search articles, stories, and resources...' },
        { key: 'search_no_results', language: 'EN', value: 'No results found for your search.' },
        { key: 'search_results_for', language: 'EN', value: 'Search results for' },

        // Search - ES
        { key: 'search_placeholder', language: 'ES', value: 'Buscar artículos, historias y recursos...' },
        { key: 'search_no_results', language: 'ES', value: 'No se encontraron resultados para tu búsqueda.' },
        { key: 'search_results_for', language: 'ES', value: 'Resultados de búsqueda para' },

        // General UI - EN
        { key: 'loading', language: 'EN', value: 'Loading...' },
        { key: 'error', language: 'EN', value: 'An error occurred. Please try again.' },
        { key: 'close', language: 'EN', value: 'Close' },
        { key: 'back', language: 'EN', value: 'Back' },
        { key: 'next', language: 'EN', value: 'Next' },
        { key: 'previous', language: 'EN', value: 'Previous' },
        { key: 'show_more', language: 'EN', value: 'Show More' },
        { key: 'category', language: 'EN', value: 'Category' },
        { key: 'published_on', language: 'EN', value: 'Published on' },

        // General UI - ES
        { key: 'loading', language: 'ES', value: 'Cargando...' },
        { key: 'error', language: 'ES', value: 'Ocurrió un error. Por favor, inténtalo de nuevo.' },
        { key: 'close', language: 'ES', value: 'Cerrar' },
        { key: 'back', language: 'ES', value: 'Atrás' },
        { key: 'next', language: 'ES', value: 'Siguiente' },
        { key: 'previous', language: 'ES', value: 'Anterior' },
        { key: 'show_more', language: 'ES', value: 'Mostrar Más' },
        { key: 'category', language: 'ES', value: 'Categoría' },
        { key: 'published_on', language: 'ES', value: 'Publicado el' }
    ];

    await db.insert(translations).values(sampleTranslations);
    
    console.log('✅ Translations seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});