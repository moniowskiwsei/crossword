'use client';

import Link from "next/link";

function NotFound() {
    return ( 
        <div className="flex justify-center flex-col items-center">
            <h1 className="text-5xl mb-3">Route not found</h1>
            <Link href="/" className="btn border-2">Go to home page</Link>
        </div>
    );
}

export default NotFound;