import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
import Model from '../component/model';
import { Chart, ChartConfiguration } from 'chart.js/auto';
import {sendCSVFile} from '../router/handler'
const Dashboard: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [model, setModel] = useState<boolean>(false);
    const chartRef = useRef<HTMLCanvasElement>(null);
    const [chartData, setChartData] = useState<ChartConfiguration<'bar'>['data'] | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);


    // useEffect(() => {
    //     if (!chartRef.current || !chartData) return;
    //     const ctx = chartRef.current.getContext('2d');
    //     if (!ctx) return;

    //     const chart = new Chart(ctx, {
    //         type: 'bar',
    //         data: chartData,
    //         options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true } } },
    //     });

    //     return () => chart.destroy();
    // }, [chartData]);

    const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type === "text/csv") {
            const result = await sendCSVFile(file);
            console.log(result)
            console.log("CSV file ready:", file.name);
        } else {
            console.log("Please upload a valid CSV file.");
        }
    };
    
    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         setChartData({
    //             labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    //             datasets: [
    //                 { label: 'Investment', data: [50, 120, 80, 90, 110, 200, 150], backgroundColor: 'rgba(66,153,225,0.6)' },
    //                 { label: 'Loss', data: [20, 40, 30, 20, 50, 80, 60], backgroundColor: 'rgba(237,100,166,0.6)' },
    //                 { label: 'Profit', data: [30, 60, 40, 50, 70, 120, 90], backgroundColor: 'rgba(156,163,175,0.6)' },
    //                 { label: 'Maintenance', data: [10, 20, 10, 15, 25, 40, 30], backgroundColor: 'rgba(72,187,120,0.6)' },
    //             ],
    //         });
    //     }, 2000);
    //     return () => clearTimeout(timer);
    // }, []);

    return (
        <div className="relative flex min-h-screen">

            {sidebarOpen && <div className="fixed inset-0 bg-black opacity-50 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />}
            <aside
                className={`fixed inset-y-0 left-0 w-64 bg-white border-r transform z-30
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            transition-transform duration-200 ease-in-out
            lg:translate-x-0 lg:static lg:inset-auto`}
            >
                <div className="p-4 flex items-center space-x-2">
                    <span className="text-xl font-bold">Menu</span>
                </div>
                <nav className="px-4">
                    <ul className="space-y-2 text-sm">
                        <label htmlFor="upload-csv">
                            <button
                                className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
                                onClick={() => setModel(true)}
                            >
                                Get Start
                            </button>
                        </label>

                    </ul>
                </nav>
            </aside>

            <div className="flex-1 flex flex-col bg-gray-100">
                <header className="flex items-center p-4 bg-white shadow lg:hidden">
                    <button className="p-2 focus:outline-none" onClick={() => setSidebarOpen(!sidebarOpen)}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <h1 className="ml-4 text-lg font-semibold">Dashboard</h1>
                </header>

                <main className="flex-1 p-6 space-y-6 overflow-y-auto">
                    <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <div className="bg-purple-600 text-white rounded p-6">
                            <p className="text-sm">Earning</p>
                            <p className="text-2xl font-bold">$500.00</p>
                        </div>
                        <div className="bg-blue-500 text-white rounded p-6">
                            <p className="text-sm">Total Orders</p>
                            <p className="text-2xl font-bold">200</p>
                        </div>
                        <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded p-6">
                            <p className="text-sm">Total Income</p>
                            <p className="text-2xl font-bold">$203k</p>

                        </div>
                    </section>

                    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 bg-white shadow rounded p-6 h-96">
                            <h2 className="text-xl font-semibold mb-4">Total Growth</h2>
                            <div className="relative w-full h-full">
                                <canvas ref={chartRef} className=" top-0 left-0 " />
                            </div>
                        </div>

                        <div className="bg-white shadow rounded p-6">
                            <h3 className="text-lg font-semibold mb-4">Popular Stocks</h3>
                            <div className="space-y-4">
                                <div className="bg-red-100 rounded p-4 flex justify-between items-center">
                                    <div>
                                        <p>Bajaj Finserv</p>
                                        <p className="text-sm text-green-600">10% Profit</p>
                                    </div>
                                    <p className="font-bold">$1839.00</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="bg-white shadow rounded p-6">
                        <h3 className="text-lg font-semibold mb-4">Notifications</h3>
                        <ul className="space-y-3">
                            <li className="flex justify-between">
                                <div>
                                    <p className="font-medium">New order received</p>
                                    <p className="text-sm text-gray-500">You have 5 new orders.</p>
                                </div>
                                <span className="text-gray-400">Just now</span>
                            </li>
                        </ul>
                    </section>
                </main>
            </div>
            <Model show={model} onClose={() => setModel(false)}>
                <h2 className="text-xl font-semibold mb-4 text-center">Get Start Your Project</h2>

                <div className="space-y-4">
                    <button
                        className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        Upload File
                    </button>

                    <input
                        ref={fileInputRef}
                        id="upload-csv"
                        type="file"
                        accept=".csv"
                        className="hidden"
                        onChange={handleFileUpload}
                    />

                    <button
                        className="w-full py-2 px-4 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700"
                        onClick={() => {}}
                    >
                        Process
                    </button>
                </div>
            </Model>

        </div>
    );
};

export default Dashboard;