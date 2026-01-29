"use client";
import { useRouter } from "next/navigation";
import { generateRandomSeed } from "@/utils/crypto";
import Result from "@/app/_components/Result";

export default function ResultContainer({ seed }: { seed: number }) {
    const router = useRouter();

    const handleUpdate = () => {
        const newSeed = generateRandomSeed();
        router.push(`/${newSeed}`);
    };

    return <Result updateSeed={handleUpdate} seed={seed} />;
}
