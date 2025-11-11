"use client";
import {useEffect} from "react";
import {useRouter} from "next/navigation";

export default function Home() {
    const router = useRouter();
    useEffect(() => {
        // Giả sử token được lưu trong localStorage
        const token = localStorage.getItem("token");

        if (token) {
            router.replace("/home");
        } else {
            router.replace("/login");
        }
    }, [router]);
    return (
        <></>
    );
}
