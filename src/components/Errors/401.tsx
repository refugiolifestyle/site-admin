"use client"

import { auth } from "@/configs/firebase";
import { GoogleAuthProvider, inMemoryPersistence, setPersistence, signInWithPopup } from "firebase/auth";
import Image from "next/image";

export default function Error401Button() {
    return <button onClick={() => window.location.assign('/')} className="flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray p-4 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50">
        <span>
            <Image
                src={"/images/icon/icon-home-dark.svg"}
                alt="Home"
                width={24}
                height={24}
                className="hidden dark:block"

            />
            <Image
                src={"/images/icon/icon-home.svg"}
                alt="Home"
                width={24}
                height={24}
                className="dark:hidden"

            />
        </span>
        Voltar a Dashboard
    </button>
}