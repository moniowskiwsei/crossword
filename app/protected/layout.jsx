'use client';
import { useEffect, useLayoutEffect } from "react";
import { redirect } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useAuth } from "../_lib/AuthContext";

function Protected({children}) {
    const { user, loading } = useAuth();
    const returnUrl = usePathname();

    useEffect(() => {
        if (!user) {
            redirect(`/public/user/signin?returnUrl=${returnUrl}`);
        }
    }, [user, returnUrl]);
    
    return ( <>
    { children }
    </> );
}

export default Protected;