'use client'

import { useAuth } from "@/app/_lib/AuthContext";
import { auth } from "@/app/_lib/firebase";
import { signOut } from "firebase/auth";
import { redirect } from 'next/navigation';

export default function SignOut() {
    signOut(auth);
    redirect('/')
} 