"use client";

import React, { useState, useEffect, JSX } from 'react';

// Define the types for your data structures
interface MockData {
  aum: {
    value: string;
    change: string;
    isPositive: boolean;
  };
  sip: {
    value: string;
    change: string;
    isPositive: boolean;
  };
  stats: StatItem[];
  clients: {
    online: number;
    new: number;
    active: number;
    inactive: number;
  };
}

interface NavItem {
  label: string;
  href: string;
}

interface StatItem {
  label: string;
  value: string;
  icon: string;
}


// Define the types for the window object to recognize external libraries
declare global {
  interface Window {
    jspdf?: any;
    html2canvas?: any;
  
  }
}

// Example function declarations (move outside declare global)
const handleData = (data: Record<string, unknown>) => {
  // tera code
}

const processInput = (input: string) => {
  // tera code
}

// This is a mock data object. In a real application, you would fetch this from an API endpoint.
const mockData: MockData = {
  aum: {
    value: '12.19 Cr',
    change: '+0.77% MoM',
    isPositive: true,
  },
  sip: {
    value: '1.39 Lakh',
    change: '+0% MoM',
    isPositive: true,
  },
  stats: [
    { label: 'Purchases', value: '0.00 INR', icon: 'file-text' },
    { label: 'Redemptions', value: '0.00 INR', icon: 'trending-down' },
    { label: 'Rejected Transactions', value: '0.00 INR', icon: 'x-circle' },
    { label: 'SIP Rejections', value: '0.00 INR', icon: 'receipt' },
    { label: 'New SIP', value: '0.00 INR', icon: 'plus-circle' },
  ],
  clients: {
    online: 3824,
    new: 60,
    active: 541,
    inactive: 2,
  },
};

const navItems: NavItem[] = [
  { label: 'CRM', href: '#' },
  { label: 'Utilities', href: '#' },
  { label: 'Insurance', href: '#' },
  { label: 'Assets', href: '#' },
  { label: 'Mutual', href: '#' },
  { label: 'Research', href: '#' },
  { label: 'Transact Online', href: '#' },
  { label: 'Goal GPS', href: '#' },
  { label: 'Financial Planning', href: '#' },
  { label: 'Wealth Report', href: '#' },
  { label: 'Other', href: '#' },
];

// Helper component for Icons from lucide-react (simulated)
const Icon = ({ name, className }: { name: string; className: string }) => {
  const icons: { [key: string]: JSX.Element } = {
    'file-text': (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg>
    ),
    'trending-down': (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="22 17 13.5 8.5 8.5 13.5 2 7" /><polyline points="16 17 22 17 22 11" /></svg>
    ),
    'x-circle': (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10" /><path d="M15 9l-6 6M9 9l6 6" /></svg>
    ),
    'receipt': (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2h-18" /><path d="M8 7h6M8 11h8M8 15h4" /></svg>
    ),
    'plus-circle': (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10" /><path d="M12 8v8M8 12h8" /></svg>
    ),
    'download': (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
    ),
  };
  return icons[name] || null;
};

// Custom hook to dynamically load scripts
const useDynamicScriptLoader = (urls: string[]) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const scripts = urls.map(url => {
      const script = document.createElement('script');
      script.src = url;
      script.async = true;
      document.body.appendChild(script);
      return script;
    });

    const checkScripts = () => {
     

      if (typeof window.jspdf !== "undefined" && typeof window.html2canvas !== "undefined") {
        setLoaded(true);
      } else {
        setTimeout(checkScripts, 50);
      }
    };

    checkScripts();

    return () => {
      scripts.forEach(script => document.body.removeChild(script));
    };
  }, [urls]);

  return loaded;
};

export default function Home() {
  const [activeTimeFilter, setActiveTimeFilter] = useState<string>('3 Days');
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [statData, setStatData] = useState<StatItem[]>(mockData.stats);
  const scriptsLoaded = useDynamicScriptLoader([
    'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js',
  ]);

  useEffect(() => {
    // Simulate data fetching
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // 1.5 second loading delay
    return () => clearTimeout(timer);
  }, []);

  const handleTimeFilterClick = (filter: string) => {
    setLoading(true);
    setActiveTimeFilter(filter);
    // Simulate fetching new data
    setTimeout(() => {
      setLoading(false);
      // In a real app, you would fetch different data based on the filter.
      // We'll just shuffle the existing mock data for demonstration.
      const shuffledStats = [...mockData.stats].sort(() => 0.5 - Math.random());
      setStatData(shuffledStats);
    }, 500);
  };

  const handleDownloadPDF = async () => {
    if (!scriptsLoaded) {
      console.error('PDF libraries not loaded yet. Please wait.');
      return;
    }

    const input = document.getElementById('dashboard-content-to-pdf');
    if (!input) {
      console.error('PDF content container not found.');
      return;
    }
    
    

    const pdf = new window.jspdf.jsPDF('p', 'mm', 'a4');
    const scale = 2; // Increased scale for better resolution

    

    const canvas = await window.html2canvas(input, {
      scale: scale,
      useCORS: true,
      logging: false,
    });
    const imgData = canvas.toDataURL('image/png');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('financial_dashboard.pdf');
  };

  const ClientBubbleChart = () => (
    <div className="relative h-64 w-full flex items-center justify-center p-4">
      <div
        className="absolute rounded-full bg-red-500 text-white flex items-center justify-center font-bold"
        style={{ width: '150px', height: '150px', left: '10%', top: '20%', fontSize: '2rem' }}
      >
        {mockData.clients.online}
      </div>
      <div
        className="absolute rounded-full bg-orange-500 text-white flex items-center justify-center font-bold"
        style={{ width: '100px', height: '100px', left: '40%', top: '30%', fontSize: '1.5rem' }}
      >
        {mockData.clients.new}
      </div>
      <div
        className="absolute rounded-full bg-green-500 text-white flex items-center justify-center font-bold"
        style={{ width: '120px', height: '120px', right: '15%', top: '15%', fontSize: '1.75rem' }}
      >
        {mockData.clients.active}
      </div>
      <div
        className="absolute rounded-full bg-gray-500 text-white flex items-center justify-center font-bold"
        style={{ width: '50px', height: '50px', right: '5%', bottom: '20%', fontSize: '1rem' }}
      >
        {mockData.clients.inactive}
      </div>
    </div>
  );

  const SIPBusinessChart = () => (
    <div className="flex h-64 p-4 items-end gap-2 relative">
      <div className="absolute top-2 left-2 text-xs text-gray-500">2.4</div>
      <div className="absolute bottom-2 left-2 text-xs text-gray-500">0</div>
      <div className="absolute top-2 right-2 text-xs text-gray-500">120</div>
      <div className="absolute bottom-2 right-2 text-xs text-gray-500">90</div>
      <div className="flex-1 flex flex-col justify-end items-center gap-1 h-full">
        <div className="w-full bg-blue-500 h-[60%] rounded-t-lg"></div>
        <div className="w-full bg-red-500 h-[40%] rounded-t-lg"></div>
        <span className="text-xs text-gray-500 mt-1">Mar</span>
      </div>
      <div className="flex-1 flex flex-col justify-end items-center gap-1 h-full">
        <div className="w-full bg-blue-500 h-[70%] rounded-t-lg"></div>
        <div className="w-full bg-red-500 h-[20%] rounded-t-lg"></div>
        <span className="text-xs text-gray-500 mt-1">Apr</span>
      </div>
      <div className="flex-1 flex flex-col justify-end items-center gap-1 h-full">
        <div className="w-full bg-blue-500 h-[80%] rounded-t-lg"></div>
        <div className="w-full bg-red-500 h-[10%] rounded-t-lg"></div>
        <span className="text-xs text-gray-500 mt-1">May</span>
      </div>
      <div className="flex-1 flex flex-col justify-end items-center gap-1 h-full">
        <div className="w-full bg-blue-500 h-[75%] rounded-t-lg"></div>
        <div className="w-full bg-red-500 h-[30%] rounded-t-lg"></div>
        <span className="text-xs text-gray-500 mt-1">Jun</span>
      </div>
    </div>
  );

  const MonthlyMISChart = () => (
    <div className="flex h-64 p-4 items-end relative">
      <div className="absolute top-2 left-2 text-xs text-gray-500">0.60 Cr</div>
      <div className="absolute top-1/4 left-2 text-xs text-gray-500">0.40 Cr</div>
      <div className="absolute top-1/2 left-2 text-xs text-gray-500">0.20 Cr</div>
      <div className="absolute bottom-1/4 left-2 text-xs text-gray-500">0.00 Cr</div>
      <div className="absolute bottom-2 left-2 text-xs text-gray-500">-0.20 Cr</div>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <path d="M 0 80 Q 25 20, 50 60 T 100 80" fill="none" stroke="rgb(107, 114, 128)" strokeWidth="2" className="opacity-75"/>
        <path d="M 0 70 Q 25 30, 50 50 T 100 60" fill="none" stroke="rgb(59, 130, 246)" strokeWidth="2" className="opacity-75"/>
        <path d="M 0 50 Q 25 40, 50 20 T 100 40" fill="none" stroke="rgb(239, 68, 68)" strokeWidth="2" className="opacity-75"/>
      </svg>
    </div>
  );

  return (
    <div className={`min-h-screen font-sans ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      {/* Main container for PDF generation */}
      <div id="dashboard-content-to-pdf" className="p-4 md:p-8">
        {/* Top Navigation Bar */}
        <nav className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <div className="flex items-center gap-2">
            <img src="https://placehold.co/40x40/000000/FFFFFF?text=W" alt="Wealth Elite Logo" className="rounded" />
            <h1 className="text-xl font-bold">Wealth Elite SIP</h1>
            <div className="relative hidden md:block">
              <input type="text" placeholder="My-portfolio" className="bg-gray-200 dark:bg-gray-700 rounded-full px-4 py-2 w-48 text-sm" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="cursor-pointer" onClick={() => setDarkMode(!darkMode)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 0 1 10 10c0 5.5-4.5 10-10 10A10 10 0 0 1 2 12c0-5.5 4.5-10 10-10z" /><circle cx="12" cy="12" r="3" /></svg>
            </div>
            <button onClick={handleDownloadPDF} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full flex items-center gap-2 transition duration-300">
              <Icon name="download" className="w-5 h-5" />
              <span>Download PDF</span>
            </button>
            <span className="hidden md:block">LOGOUT</span>
          </div>
        </nav>

        {/* Menu Navigation Bar */}
        <nav className="mt-4 overflow-x-auto whitespace-nowrap scrollbar-hide">
          <ul className="flex justify-between items-center bg-white dark:bg-gray-800 rounded-lg p-2 shadow-md">
            {navItems.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="flex items-center gap-2 p-2 rounded-lg text-sm md:text-base hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <main className="mt-6 space-y-6">
          {/* AUM and SIP Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-500">AUM</h3>
                <p className="text-3xl font-bold mt-2">{mockData.aum.value}</p>
                <p className={`mt-1 text-sm ${mockData.aum.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                  {mockData.aum.change}
                </p>
                <a href="#" className="text-sm font-semibold text-blue-600 mt-2 block">View Trend</a>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300">
                View Report
              </button>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-500">SIP</h3>
                <p className="text-3xl font-bold mt-2">{mockData.sip.value}</p>
                <p className={`mt-1 text-sm ${mockData.sip.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                  {mockData.sip.change}
                </p>
                <a href="#" className="text-sm font-semibold text-blue-600 mt-2 block">View Trend</a>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300">
                View Report
              </button>
            </div>
          </div>

          {/* Time Range Filter Bar */}
          <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-2 rounded-lg shadow-md">
            {['3 Days', '7 Days', '10 Days', '30 Days'].map((filter) => (
              <button
                key={filter}
                onClick={() => handleTimeFilterClick(filter)}
                className={`py-2 px-4 rounded-full text-sm font-medium transition duration-300 ${activeTimeFilter === filter ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {statData.map((stat) => (
              <div key={stat.label} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex flex-col items-center text-center">
                <Icon name={stat.icon} className="h-10 w-10 text-gray-500 mb-2" />
                <p className="text-sm font-semibold text-gray-500">{stat.label}</p>
                <p className="text-lg font-bold">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Charts/Sections */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md col-span-1 md:col-span-1">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">CLIENTS</h3>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300">
                  <Icon name="download" className="w-5 h-5" /> Download Report
                </button>
              </div>
              {loading ? (
                <div className="h-64 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
                </div>
              ) : (
                <ClientBubbleChart />
              )}
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md col-span-1 md:col-span-1">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">SIP BUSINESS CHART</h3>
                <a href="#" className="text-sm font-semibold text-blue-600">View Report</a>
              </div>
              {loading ? (
                <div className="h-64 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
                </div>
              ) : (
                <SIPBusinessChart />
              )}
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md col-span-1 md:col-span-1">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">MONTHLY MIS</h3>
                <a href="#" className="text-sm font-semibold text-blue-600">View Report</a>
              </div>
              {loading ? (
                <div className="h-64 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
                </div>
              ) : (
                <MonthlyMISChart />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
