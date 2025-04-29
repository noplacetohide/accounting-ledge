"use client"
import { useState, useEffect } from 'react';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

import { ChevronRight, ChevronLeft, BarChart2, LogOut } from 'lucide-react';
import Profile from '@/pages/Profile';
import Ledger from '@/pages/Ledger';

const Loader = () => (
    <div className="flex items-center justify-center h-full w-full">
        <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
            <p className="text-gray-600">Loading content...</p>
        </div>
    </div>
);


export default function SidebarNavigation() {
    const [collapsed, setCollapsed] = useState(true);
    const [activeComponent, setActiveComponent] = useState('ledger');
    const [user, setUser] = useState({ name: '', email: '', role: '' });
    const [loading, setLoading] = useState(false);
    const [targetComponent, setTargetComponent] = useState('ledger');
    const router = useRouter();

    const navItems = [
        { id: 'ledger', label: 'Ledger', icon: <BarChart2 size={20} /> },
    ];

    const handleNavigation = (componentId: string) => {
        if (componentId === activeComponent) return;

        setLoading(true);
        setTargetComponent(componentId);

        setTimeout(() => {
            setActiveComponent(componentId);
            setLoading(false);
        }, 800);
    };

    const handleLogout = () => {
        deleteCookie('access_token');
        router.push('/get-started');
    };

    useEffect(() => {
        const data = localStorage.getItem("user") || '{}';
        setUser(JSON.parse(data))
    }, [])
    const renderComponent = () => {
        if (loading) {
            return <Loader />;
        }

        switch (activeComponent) {
            case 'ledger':
                return <Ledger data={user} />;
            case 'profile':
                return <Profile data={user} />;
            default:
                return <Ledger data={user} />;
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <div
                className={`${collapsed ? 'w-16' : 'w-64'
                    } bg-black text-white transition-all duration-300 ease-in-out flex flex-col`}
            >
                <div className="flex items-center justify-between p-4 border-b border-gray-700">
                    {!collapsed && <span className="font-bold text-xl">Allocations</span>}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="p-1 rounded-full hover:bg-gray-700 ml-auto"
                    >
                        {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                    </button>
                </div>

                <div
                    onClick={() => handleNavigation('profile')}
                    className={`flex items-center ${collapsed ? 'justify-center' : 'justify-start'} p-4 border-b border-gray-700 cursor-pointer hover:bg-gray-700 ${activeComponent === 'profile' ? 'bg-gray-700' : ''
                        }`}
                >
                    <div className="h-8 w-8 rounded bg-indigo-600 flex items-center justify-center font-bold text-white">
                        {user?.name?.charAt(0) || '😄'}
                    </div>
                    {!collapsed && (
                        <div className="ml-3">
                            <div className="font-medium">{user.name}</div>
                            <div className="text-xs text-gray-300">View Profile</div>
                        </div>
                    )}
                </div>

                <nav className="flex-grow mt-2">
                    <ul>
                        {navItems.map((item) => (
                            <li key={item.id}>
                                <button
                                    onClick={() => handleNavigation(item.id)}
                                    className={`flex items-center w-full p-4 hover:bg-gray-700 transition-colors ${activeComponent === item.id ? 'bg-gray-800' : ''
                                        } ${loading && targetComponent === item.id ? 'bg-gray-600' : ''}`}
                                >
                                    <span className={collapsed ? 'mx-auto' : 'mr-4'}>
                                        {loading && targetComponent === item.id ? (
                                            <div className="animate-spin h-5 w-5 border-2 border-t-transparent border-white rounded-full"></div>
                                        ) : (
                                            item.icon
                                        )}
                                    </span>
                                    {!collapsed && <span>{item.label}</span>}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="mt-auto border-t border-gray-700">
                    <button
                        onClick={handleLogout}
                        className={`flex items-center w-full p-4 hover:bg-gray-700 transition-colors ${collapsed ? 'justify-center' : 'justify-start'
                            }`}
                    >
                        <LogOut size={20} className={collapsed ? 'mx-auto' : 'mr-4'} />
                        {!collapsed && <span>Logout</span>}
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                {renderComponent()}
            </div>
        </div>
    );
}