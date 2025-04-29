'use client';

import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <h1 className="text-6xl font-bold">404</h1>
            <p className="text-lg mt-4">This page doesn&apos;t exist.</p>
            <Link href="/" className="mt-6 text-blue-600 underline">
                Go back to homepage
            </Link>
        </div>
    );
}
