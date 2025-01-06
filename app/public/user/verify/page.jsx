'use client'

import { useAuth } from "@/app/_lib/AuthContext";
import { auth } from "@/app/_lib/firebase";
import { signOut } from "firebase/auth";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function Verify() {
    const {user} = useAuth()
    const [userVerify, setUserVerify] = useState(user)
    if(userVerify?.emailVerified)
        return redirect('/')

    signOut(auth);

    return ( 
    <>
        <h1 className="font-bold text-center text-xl">Email not verified. Verify clicking on link in email send to your address {userVerify?.email}</h1>
    </> );
} 