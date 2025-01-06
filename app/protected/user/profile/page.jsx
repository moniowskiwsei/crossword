'use client'

import Error from "@/app/_components/Error";
import FormInput from "@/app/_components/FormInput";
import Loader from "@/app/_components/Loader";
import Modal from "@/app/_components/Modal";
import { useAuth } from "@/app/_lib/AuthContext";
import { db } from "@/app/_lib/firebase";
import { updateProfile } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function Profile() {
    const { user } = useAuth();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const downloadUserData = async () => {
            setLoading(true)
            try {
                const snapshot = await getDoc(doc(db,"users", user?.uid));
                const data = snapshot.data();
                setUserData(data)
            } catch (error) {
                setError(error.message);
            }
            setLoading(false)
        }
        if(user)
            downloadUserData()
        return
    }, [user])


    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            await updateProfile(user, {
                displayName: e.target['displayName'].value,
                photoURL: e.target['image'].value,
            })

            const docRef = doc(db, 'users', user?.uid)
            await setDoc(docRef, {
                address: {
                    city:  e.target['city'].value,
                    street:  e.target['street'].value,
                    zipCode:  e.target['zipcode'].value
                }
            });

        } catch (error) {
            setError(error.message);
        }
    };

    if (!user) {
        return <h1 className="text-center font-bold text-3xl">You are not logged in</h1>
    }

    if (loading)
        return <Loader />

    return (
        <div className="flex justify-center">
            <form onSubmit={(e) => onSubmit(e)}
                className="w-[40rem] max-w-full bg-base-200 p-8">
                <h1 className="text-3xl mb-4">Profile edit</h1>
                {error ? <Error message={error} /> : null}
                <FormInput type="text" name="displayName" label="Display name" defaultValue={user.displayName ?? ''} />
                <FormInput type="email" name="email" readonly={true} label="Email" defaultValue={user.email ?? ''} />
                <ProfileImage image={user.photoURL ?? ''} />
                <FormInput type="text" name="city" label="City" defaultValue={userData?.address?.city ?? ''} />
                <FormInput type="text" name="street" label="Street" defaultValue={userData?.address?.street ?? ''} />
                <FormInput type="text" name="zipcode" label="Zip-code" defaultValue={userData?.address?.zipCode ?? ''} />
                <button type="submit" className="btn bg-green-700 hover:bg-none hover:border-green-700">Edit</button>
            </form>
        </div>
    )
}

function ProfileImage({ image }) {
    const [modalOpened, setModalOpened] = useState(false)

    if (!image)
        return <FormInput type="text" name="image" label="Profile image" defaultValue={image} />

    return <div className="flex gap-3 items-end mb-6">
        <FormInput className="grow" type="text" name="image" label="Profile image" defaultValue={image} />
        <div className="tooltip" data-tip="Show full image">
            <img src={image} alt="Profile picture" className="aspect-square w-14 object-cover cursor-pointer" onClick={() => setModalOpened(true)} />
        </div>

        <Modal id='profilePictureModal' showModal={modalOpened} hideModal={() => setModalOpened(false)}>
            <img src={image} alt="Profile picture" />
        </Modal>
    </div>
}