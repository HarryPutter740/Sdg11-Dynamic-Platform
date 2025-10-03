import { db } from '@/db';
import { charts } from '@/db/schema';

async function main() {
    const sampleCharts = [
        {
            title: 'Global Urban Population Growth 2000-2030',
            description: 'Projected urban population growth showing the increasing urbanization trend globally',
            chartType: 'bar',
            labels: ['2000', '2005', '2010', '2015', '2020', '2025', '2030'],
            datasets: [
                {
                    label: 'Urban Population (Billions)',
                    data: [2.8, 3.2, 3.6, 4.0, 4.4, 4.8, 5.2],
                    backgroundColor: '#22c55e',
                    borderColor: '#16a34a',
                    borderWidth: 1
                }
            ],
            published: true,
            createdAt: new Date('2024-01-15').toISOString(),
            updatedAt: new Date('2024-01-15').toISOString(),
        },
        {
            title: 'Urban Transport CO2 Emissions by Mode',
            description: 'Distribution of carbon emissions from different urban transportation methods',
            chartType: 'doughnut',
            labels: ['Private Cars', 'Buses', 'Metro/Rail', 'Walking/Cycling', 'Motorcycles'],
            datasets: [
                {
                    label: 'CO2 Emissions (%)',
                    data: [65, 15, 8, 2, 10],
                    backgroundColor: ['#ef4444', '#f97316', '#3b82f6', '#22c55e', '#8b5cf6'],
                    borderColor: ['#dc2626', '#ea580c', '#2563eb', '#16a34a', '#7c3aed'],
                    borderWidth: 2
                }
            ],
            published: true,
            createdAt: new Date('2024-01-20').toISOString(),
            updatedAt: new Date('2024-01-20').toISOString(),
        },
        {
            title: 'LEED Certified Buildings Growth 2010-2023',
            description: 'Growth in Leadership in Energy and Environmental Design (LEED) certified buildings globally',
            chartType: 'line',
            labels: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'],
            datasets: [
                {
                    label: 'New Certifications',
                    data: [1200, 1450, 1680, 1920, 2180, 2350, 2520, 2750, 2980, 3200, 2890, 3150, 3420, 3680],
                    borderColor: '#3b82f6',
                    backgroundColor: '#3b82f6',
                    fill: false,
                    tension: 0.1
                },
                {
                    label: 'Cumulative Total',
                    data: [8500, 9950, 11630, 13550, 15730, 18080, 20600, 23350, 26330, 29530, 32420, 35570, 38990, 42670],
                    borderColor: '#22c55e',
                    backgroundColor: '#22c55e',
                    fill: false,
                    tension: 0.1
                }
            ],
            published: true,
            createdAt: new Date('2024-01-25').toISOString(),
            updatedAt: new Date('2024-01-25').toISOString(),
        }
    ];

    await db.insert(charts).values(sampleCharts);
    
    console.log('✅ Charts seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});