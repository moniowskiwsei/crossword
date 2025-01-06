'use client';
import Error from "@/app/_components/Error";
import FormInput from "@/app/_components/FormInput";
import { useAuth } from "@/app/_lib/AuthContext";
import { auth } from "@/app/_lib/firebase";
import { signInWithEmailAndPassword, setPersistence, browserSessionPersistence, getAuth } from "firebase/auth";
import { useSearchParams, useRouter, redirect } from "next/navigation";
import {  useState } from "react";

export default function SignInForm() {

    const params = useSearchParams();
    const router = useRouter();
    const {user} = useAuth();
    const [error, setError] = useState(null)
    if(params.get("returnUrl") == '/protected/user/signout')
        return redirect('/')

    const returnUrl = params.get("returnUrl")

    const onSubmit = (e) => {
        e.preventDefault();
        const email = e.target["email"].value;
        const password = e.target["password"].value;
        setPersistence(auth, browserSessionPersistence)
            .then(() => {
                signInWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        if(!userCredential.user.emailVerified)
                            return router.push('/public/user/verify');
                        router.push(returnUrl ?? '/');
                    })
                    .catch((error) => {
                        const errorMessage = error.message;
                        setError(errorMessage);
                    });
            })
            .catch(error => {
                console.log(error);
                setError(error.message);
            });
    };

    if(user) 
        return <h1 className="text-center font-bold text-3xl">You are logged in</h1>

    return (
        <div className="flex justify-center">
            <form onSubmit={(e) => onSubmit(e)}
                className="w-[30rem] max-w-full bg-base-200 p-8">
                <h1 className="text-3xl mb-4">Sign in</h1>
                {error ? <Error message={error}/> : null}
                <FormInput type="email" name="email" required={true} label="Email" />
                <FormInput type="password" name="password" required={true} label="Password" />
                <button type="submit" className="btn bg-green-700 hover:bg-none hover:border-green-700">Login</button>
            </form>
        </div>
    );
}