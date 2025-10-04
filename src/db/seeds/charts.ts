import { db } from '@/db';
import { charts } from '@/db/schema';

async function main() {
    const sampleCharts = [
        {
            title: 'Global R&D Investment by Sector (2020-2023)',
            description: 'Research and Development spending across major industries showing growth trends and sector distribution. This data highlights the increasing investment in innovation across key sectors driving SDG-09 objectives.',
            chartType: 'bar',
            labels: ['Automotive', 'Technology', 'Pharmaceuticals', 'Energy', 'Aerospace'],
            datasets: [
                {
                    label: '2020 ($B)',
                    data: [145, 320, 185, 95, 75],
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                },
                {
                    label: '2021 ($B)',
                    data: [158, 345, 198, 110, 82],
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                },
                {
                    label: '2022 ($B)',
                    data: [172, 378, 215, 128, 91],
                    backgroundColor: 'rgba(255, 206, 86, 0.6)',
                    borderColor: 'rgba(255, 206, 86, 1)',
                    borderWidth: 1
                },
                {
                    label: '2023 ($B)',
                    data: [189, 412, 235, 145, 98],
                    backgroundColor: 'rgba(153, 102, 255, 0.6)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 1
                }
            ],
            published: true,
            createdAt: new Date('2024-01-15').toISOString(),
            updatedAt: new Date('2024-01-15').toISOString(),
        },
        {
            title: 'Digital Infrastructure Coverage Worldwide',
            description: 'Global distribution of digital connectivity showing the digital divide across different economic regions. This visualization supports SDG-09 targets for equitable access to information and communications technology.',
            chartType: 'doughnut',
            labels: ['Developed Countries', 'Emerging Economies', 'Least Developed Countries', 'Rural Areas'],
            datasets: [
                {
                    label: 'Coverage Percentage',
                    data: [92, 68, 35, 45],
                    backgroundColor: [
                        'rgba(46, 125, 50, 0.8)',
                        'rgba(255, 193, 7, 0.8)',
                        'rgba(244, 67, 54, 0.8)',
                        'rgba(156, 39, 176, 0.8)'
                    ],
                    borderColor: [
                        'rgba(46, 125, 50, 1)',
                        'rgba(255, 193, 7, 1)',
                        'rgba(244, 67, 54, 1)',
                        'rgba(156, 39, 176, 1)'
                    ],
                    borderWidth: 2
                }
            ],
            published: true,
            createdAt: new Date('2024-01-20').toISOString(),
            updatedAt: new Date('2024-01-20').toISOString(),
        },
        {
            title: 'Manufacturing Automation Adoption (2015-2024)',
            description: 'Timeline showing the growth of Industry 4.0 automation adoption across major global regions. This trend analysis demonstrates progress toward sustainable industrialization and technological advancement.',
            chartType: 'line',
            labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
            datasets: [
                {
                    label: 'North America (%)',
                    data: [23, 28, 34, 41, 48, 52, 58, 65, 71, 76],
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    tension: 0.4,
                    fill: false,
                    pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 5
                },
                {
                    label: 'Europe (%)',
                    data: [21, 26, 32, 39, 45, 49, 55, 62, 68, 73],
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    tension: 0.4,
                    fill: false,
                    pointBackgroundColor: 'rgba(54, 162, 235, 1)',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 5
                },
                {
                    label: 'Asia-Pacific (%)',
                    data: [18, 25, 33, 42, 51, 58, 66, 74, 81, 87],
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    tension: 0.4,
                    fill: false,
                    pointBackgroundColor: 'rgba(75, 192, 192, 1)',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 5
                },
                {
                    label: 'Latin America (%)',
                    data: [12, 15, 19, 24, 29, 33, 38, 44, 50, 55],
                    borderColor: 'rgba(255, 206, 86, 1)',
                    backgroundColor: 'rgba(255, 206, 86, 0.2)',
                    tension: 0.4,
                    fill: false,
                    pointBackgroundColor: 'rgba(255, 206, 86, 1)',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 5
                }
            ],
            published: true,
            createdAt: new Date('2024-02-01').toISOString(),
            updatedAt: new Date('2024-02-01').toISOString(),
        },
        {
            title: 'Innovation Hub Distribution by Technology Sector',
            description: 'Global concentration of innovation hubs across key technology sectors driving sustainable development and economic growth. This analysis supports SDG-09 objectives for building resilient infrastructure and fostering innovation.',
            chartType: 'bar',
            labels: ['AI/ML', 'Biotech', 'Clean Energy', 'Manufacturing', 'FinTech', 'Space Tech'],
            datasets: [
                {
                    label: 'Number of Innovation Hubs',
                    data: [485, 312, 278, 421, 365, 89],
                    backgroundColor: [
                        'rgba(63, 81, 181, 0.7)',
                        'rgba(76, 175, 80, 0.7)',
                        'rgba(255, 152, 0, 0.7)',
                        'rgba(158, 158, 158, 0.7)',
                        'rgba(233, 30, 99, 0.7)',
                        'rgba(96, 125, 139, 0.7)'
                    ],
                    borderColor: [
                        'rgba(63, 81, 181, 1)',
                        'rgba(76, 175, 80, 1)',
                        'rgba(255, 152, 0, 1)',
                        'rgba(158, 158, 158, 1)',
                        'rgba(233, 30, 99, 1)',
                        'rgba(96, 125, 139, 1)'
                    ],
                    borderWidth: 2,
                    borderRadius: 4,
                    borderSkipped: false
                }
            ],
            published: true,
            createdAt: new Date('2024-02-10').toISOString(),
            updatedAt: new Date('2024-02-10').toISOString(),
        }
    ];

    await db.insert(charts).values(sampleCharts);
    
    console.log('✅ SDG-09 charts seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});