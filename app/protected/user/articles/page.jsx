'use client'

import Error from "@/app/_components/Error";
import FormInput from "@/app/_components/FormInput";
import Loader from "@/app/_components/Loader";
import Modal from "@/app/_components/Modal";
import { useAuth } from "@/app/_lib/AuthContext";
import { db } from "@/app/_lib/firebase";
import { updateProfile } from "firebase/auth";
import { collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function Profile() {
    const { user } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        if (user) {
            const downloadUserData = async () => {
                setLoading(true)
                const userDoc = doc(db, 'users', user?.uid)

                const q = query(
                    collection(db, 'articles'),
                    where('user', '==', userDoc)
                );

                const articlesSnapshot = await getDocs(q);
                const art = []
                articlesSnapshot.forEach((doc) => {
                    art.push(doc.data());
                });
                setArticles(art)
            }

            try {
                downloadUserData()
            } catch (error) {
                setError(error.message);
            }

            setLoading(false)
        }
        return
    }, [user])

    if (!user) {
        return <h1 className="text-center font-bold text-3xl">You are not logged in</h1>
    }


    if (loading)
        return <Loader />

    if (articles.length == 0)
        return <h1>No articles</h1>

    return (
        <div className="flex justify-center">
            {error ? <Error message={error} /> : null}
            <div className="flex flex-wrap gap-3 max-w-full w-[1400px]">
                {articles.map((article, i) => <div key={i} className="w-full lg:w-1/3 border p-3">
                    <h3 className="font-bold text-xl">Title: {article.title}</h3>
                    <p>Content: {article.content}</p>
                    <p>Date: {new Date(article.date.seconds * 1000).toDateString()}</p>
                </div>)}
            </div>
        </div>
    )
}