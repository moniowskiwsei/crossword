'use client';
import { createUserWithEmailAndPassword, sendEmailVerification, signOut } from "firebase/auth";
import { useState } from "react";
import FormInput from "@/app/_components/FormInput";
import Error from "@/app/_components/Error";
import { auth } from "@/app/_lib/firebase";
import { useAuth } from "@/app/_lib/AuthContext";
import { redirect } from "next/navigation";
import Loader from "@/app/_components/Loader";

export default function RegisterForm() {
    const { user } = useAuth();

    const [registerError, setRegisterError] = useState(""); //stan błędów rejestracji

    const [loading, setLoading] = useState(false); //stan błędów rejestracji

    const onSubmit = (e) => {
        e.preventDefault();
        const email = e.target["email"].value;
        const password = e.target["password"].value;
        const passwordRepeat = e.target["password_repeat"].value;

        if (password != passwordRepeat)
            return setRegisterError('Passwords does not match')

        setLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                sendEmailVerification(auth.currentUser)
                    .then(() => {
                        redirect("/public/user/verify");
                    });

            })
            .catch((error) => {
                setRegisterError(error.message);
                console.dir(error);
                setLoading(false)
            });
    };

    if (user) {
        return <h1 className="text-center font-bold text-3xl">You are logged in</h1>
    }

    if (loading)
        return <Loader />

    return (
        <div className="flex justify-center">
            <form onSubmit={(e) => onSubmit(e)}
                className="w-[30rem] max-w-full bg-base-200 p-8">
                <h1 className="text-3xl mb-4">Register</h1>
                {registerError ? <Error message={registerError} /> : null}
                <FormInput type="email" name="email" required={true} label="Email" />
                <FormInput type="password" name="password" required={true} label="Password" />
                <FormInput type="password" name="password_repeat" required={true} label="Repeat password" />
                <button type="submit" className="btn bg-green-700 hover:bg-none hover:border-green-700">Register</button>
            </form>
        </div>
    );
}