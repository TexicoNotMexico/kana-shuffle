"use client";
import { useRouter } from "next/navigation";
import { generateRandomSeed } from "@/utils/crypto";
import Generate from "./_components/Generate";

export default function App() {
    const router = useRouter();

    const handleGenerate = () => {
        const newSeed = generateRandomSeed();
        router.push(`/${newSeed}`);
    };

    return (
        <div className="font-family-zen font-bold text-2xl flex justify-center items-center w-screen h-screen">
            <Generate updateSeed={handleGenerate} />
        </div>
    );
}
