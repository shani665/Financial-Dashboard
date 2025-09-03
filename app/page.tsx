'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Script from 'next/script';
import Chart from 'chart.js/auto';

// Type definitions for your data
interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }[];
}

interface FinancialMetric {
  title: string;
  value: string;
  trend: string;
}

interface Asset {
  name: string;
  aum: number;
}

interface SipData {
  month: string;
  amount: number;
}

// Data placeholders - you can replace this with your actual data
const initialChartData: ChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'AUM',
      data: [100, 150, 200, 180, 250, 300],
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    },
    {
      label: 'SIP',
      data: [50, 55, 60, 65, 70, 75],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    },
  ],
};

const initialMetrics: FinancialMetric[] = [
  { title: 'Total AUM', value: '$5.2M', trend: 'up' },
  { title: 'Total SIP', value: '$1.5M', trend: 'down' },
  { title: 'New Clients', value: '120', trend: 'up' },
];

const initialAssets: Asset[] = [
  { name: 'Mutual Funds', aum: 2.5 },
  { name: 'Stocks', aum: 1.8 },
  { name: 'Bonds', aum: 0.9 },
];

const initialSipData: SipData[] = [
  { month: 'Jan', amount: 50 },
  { month: 'Feb', amount: 55 },
  { month: 'Mar', amount: 60 },
];

export default function Home() {
  const [data, setData] = useState<ChartData>(initialChartData);
  const [metrics, setMetrics] = useState<FinancialMetric[]>(initialMetrics);
  const [assets, setAssets] = useState<Asset[]>(initialAssets);
  const [sipData, setSipData] = useState<SipData[]>(initialSipData);

  // Function to create or update the chart
  useEffect(() => {
    const ctx = document.getElementById('myChart');
    if (ctx instanceof HTMLCanvasElement) {
      new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [data]);

  return (
    <main className="flex flex-col items-center justify-between p-24">
      {/* Script component for external libraries */}
      {/* Ye purane `<script>` tag ki jagah hai */}
      <Script src="https://kit.fontawesome.com/a076d05399.js" strategy="lazyOnload" />
      <Script src="https://cdn.jsdelivr.net/npm/chart.js" strategy="lazyOnload" />

      {/* Hero Section */}
      <section className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Financial Dashboard</h1>
        <p className="text-lg text-gray-600">
          Your quick overview of key financial metrics.
        </p>
      </section>

      {/* Metrics Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-8">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="p-6 bg-white rounded-lg shadow-md"
          >
            <h2 className="text-xl font-semibold">{metric.title}</h2>
            <p className="text-3xl font-bold mt-2">{metric.value}</p>
            <p className="text-sm text-gray-500 mt-1">
              {metric.trend === 'up' ? '▲ Up' : '▼ Down'}
            </p>
          </div>
        ))}
      </section>

      {/* Chart Section */}
      <section className="w-full h-96 mb-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">AUM & SIP Performance</h2>
        <canvas id="myChart" className="w-full h-full"></canvas>
      </section>

      {/* Assets and SIPs Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {/* Asset Distribution */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Asset Distribution</h2>
          <ul>
            {assets.map((asset, index) => (
              <li key={index} className="flex justify-between items-center mb-2">
                <span>{asset.name}</span>
                <span>${asset.aum}M</span>
              </li>
            ))}
          </ul>
        </div>

        {/* SIP Tracker */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">SIP Tracker</h2>
          <ul>
            {sipData.map((sip, index) => (
              <li key={index} className="flex justify-between items-center mb-2">
                <span>{sip.month}</span>
                <span>${sip.amount}k</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      
      {/* Old <img> tag was here, replaced with Next.js Image component */}
      <Image 
        src="/path/to/your/image.svg" 
        alt="A descriptive alt text for your image" 
        width={500} // Replace with your image's width
        height={500} // Replace with your image's height
      />
    </main>
  );
}