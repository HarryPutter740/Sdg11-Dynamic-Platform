import { db } from '@/db';
import { pages } from '@/db/schema';

async function main() {
    const samplePages = [
        {
            slug: 'privacy-policy',
            title: 'Privacy Policy',
            subtitle: 'How we collect, use, and protect your data',
            content: `At SDG 11 Sustainable Cities, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, store, and protect your data when you visit our website or use our services.

**Data Collection**
We collect information you provide directly to us, such as when you create an account, subscribe to our newsletter, or contact us. This may include your name, email address, and any messages you send us. We also automatically collect certain information about your device and usage patterns through cookies and similar technologies.

**Use of Information**
We use your information to provide and improve our services, communicate with you about sustainable city initiatives, send newsletters and updates, respond to your inquiries, and ensure the security of our platform. We may also use aggregated, non-personally identifiable information for research and analytics purposes.

**Data Protection and Security**
We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Your data is stored on secure servers and transmitted using encryption protocols.

**Cookies and Tracking**
Our website uses cookies to enhance your browsing experience, remember your preferences, and analyze website traffic. You can control cookie settings through your browser preferences, though some features may not function properly if cookies are disabled.

**Third-Party Services**
We may use third-party services for analytics, payment processing, or other functionalities. These services have their own privacy policies, and we encourage you to review them.

**Your Rights**
Under GDPR and other applicable laws, you have the right to access, correct, delete, or port your personal data. You may also object to certain processing activities or withdraw consent where applicable.

**Contact Us**
If you have questions about this Privacy Policy or our data practices, please contact us at privacy@sdg11cities.org.`,
            metaDescription: 'Learn about our privacy practices and how we protect your personal information on our sustainable cities platform.',
            metaKeywords: 'privacy policy, data protection, GDPR, personal information, cookies',
            published: true,
            createdAt: new Date('2024-01-15').toISOString(),
            updatedAt: new Date('2024-01-15').toISOString(),
        },
        {
            slug: 'about',
            title: 'About SDG 11: Sustainable Cities and Communities',
            subtitle: 'Building inclusive, safe, resilient and sustainable cities',
            content: `Sustainable Development Goal 11 aims to make cities and human settlements inclusive, safe, resilient, and sustainable. As the world becomes increasingly urbanized, with more than half of the global population now living in cities, the importance of sustainable urban development has never been greater.

**The Challenge**
Cities consume 78% of global energy and produce more than 70% of global CO2 emissions, yet they occupy less than 2% of the Earth's surface. Rapid urbanization has led to numerous challenges including inadequate housing, strained infrastructure, pollution, and social inequality. By 2050, it's estimated that 68% of the world's population will live in urban areas.

**Our Mission**
This platform serves as a hub for information, resources, and inspiration related to sustainable urban development. We showcase innovative solutions, best practices, and success stories from cities around the world that are working towards achieving SDG 11 targets.

**Key Targets**
SDG 11 encompasses several specific targets including ensuring access to adequate housing, developing sustainable transport systems, enhancing inclusive urbanization, protecting cultural and natural heritage, reducing environmental impact, and providing universal access to safe, inclusive, and accessible green spaces.

**Success Stories**
Cities worldwide are implementing innovative solutions: Copenhagen's carbon-neutral goals, Singapore's smart city initiatives, Medellín's urban transformation through public transportation and green spaces, and Barcelona's superblocks reducing traffic and pollution.

**How You Can Contribute**
Whether you're a city planner, policymaker, business leader, or concerned citizen, there are many ways to support sustainable urban development. Join our community to access resources, share experiences, and collaborate on solutions that make cities more livable for everyone.

**Global Impact**
Achieving SDG 11 is crucial for meeting other Sustainable Development Goals. Sustainable cities drive economic growth, reduce inequality, combat climate change, and improve quality of life for billions of people worldwide.`,
            metaDescription: 'Discover the United Nations Sustainable Development Goal 11 focused on making cities inclusive, safe, resilient and sustainable.',
            metaKeywords: 'SDG 11, sustainable cities, urban development, United Nations, sustainable development goals',
            published: true,
            createdAt: new Date('2024-01-10').toISOString(),
            updatedAt: new Date('2024-01-10').toISOString(),
        },
        {
            slug: 'terms-of-service',
            title: 'Terms of Service',
            subtitle: 'Terms and conditions for using our platform',
            content: `Welcome to the SDG 11 Sustainable Cities platform. By accessing or using our website and services, you agree to be bound by these Terms of Service. Please read them carefully before using our platform.

**Acceptance of Terms**
By accessing this website, you accept these terms and conditions in full. If you disagree with any part of these terms, you must not use our website or services.

**Use License**
Permission is granted to temporarily access and use our platform for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not modify or copy the materials, use the materials for commercial purposes, or remove any copyright or proprietary notations.

**User Responsibilities**
Users are responsible for maintaining the confidentiality of their account information, ensuring all information provided is accurate and up-to-date, using the platform in compliance with applicable laws and regulations, and not engaging in any activity that could harm the platform or other users.

**Content Guidelines**
Users may contribute content subject to our review and approval. All user-generated content must be original, appropriate, and relevant to sustainable urban development. We reserve the right to remove any content that violates these guidelines or our community standards.

**Intellectual Property Rights**
The content, organization, graphics, design, and other matters related to this website are protected under applicable copyrights and other proprietary laws. Copying, redistributing, or republishing any content without our express written permission is prohibited.

**Disclaimers**
The information on this website is provided on an 'as is' basis. We make no warranties, expressed or implied, regarding the accuracy, completeness, or reliability of the information. Use of any information is solely at your own risk.

**Limitation of Liability**
In no event shall SDG 11 Sustainable Cities or its suppliers be liable for any damages arising out of the use or inability to use the materials on our website, even if we have been notified orally or in writing of the possibility of such damage.

**Privacy**
Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your information.

**Modifications**
We may revise these terms at any time without notice. By using this website, you agree to be bound by the current version of these Terms of Service.

**Contact Information**
For questions about these Terms of Service, please contact us at legal@sdg11cities.org.`,
            metaDescription: 'Read our terms of service and understand the conditions for using our sustainable cities platform.',
            metaKeywords: 'terms of service, terms and conditions, legal, user agreement',
            published: true,
            createdAt: new Date('2024-01-20').toISOString(),
            updatedAt: new Date('2024-01-20').toISOString(),
        },
    ];

    await db.insert(pages).values(samplePages);
    
    console.log('✅ Pages seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});