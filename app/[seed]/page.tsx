"use client";
import { useParams, useRouter } from "next/navigation";
import { generateRandomSeed } from "@/utils/crypto";
import Result from "../_components/Result";

export default function ResultPage() {
    const params = useParams();
    const router = useRouter();
    const seed = parseInt(params.seed as string, 10);

    const handleUpdate = () => {
        const newSeed = generateRandomSeed();
        router.push(`/${newSeed}`);
    };

    return (
        <div className="font-family-zen font-bold text-2xl flex justify-center w-screen py-8">
            <Result updateSeed={handleUpdate} seed={seed} />
        </div>
    );
}
