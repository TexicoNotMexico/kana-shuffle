"use client";
import { useMemo, useState, useRef } from "react";
import HiraganaGrid from "./HiraganaGrid";
import { getShuffledHiragana } from "@/utils/crypto";

export default function Result({ updateSeed, seed }: { updateSeed: () => void; seed: number | null }) {
    const result = useMemo(() => (seed ? getShuffledHiragana(seed) : ""), [seed]);

    const [copied, setCopied] = useState(false);
    const [currentUrl, setCurrentUrl] = useState("");
    const dialogRef = useRef<HTMLDialogElement>(null);

    const handleShare = () => {
        setCurrentUrl(window.location.href);
        dialogRef.current?.showModal();
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(currentUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            alert("結果 URL をコピーできませんでした\n手動でコピーしてください");
        }
    };

    return (
        <div className="flex flex-col gap-4 items-center">
            <h2 className="text-xl">No. {seed}</h2>
            <HiraganaGrid result={result} />
            <div className="flex flex-col gap-4 w-fit">
                <div className="flex flex-col gap-1">
                    <section aria-labelledby="group-1" className="">
                        <h3 id="group-1" className="text-sm text-gray-400">
                            グループ１
                        </h3>
                        <p className="text-one" aria-live="polite">
                            {result[0]}
                        </p>
                    </section>
                    <section aria-labelledby="group-2" className="">
                        <h3 id="group-2" className="text-sm text-gray-400">
                            グループ２
                        </h3>
                        <p className="text-two" aria-live="polite">
                            {result[1]}
                        </p>
                    </section>
                    <section aria-labelledby="group-3" className="">
                        <h3 id="group-3" className="text-sm text-gray-400">
                            グループ３
                        </h3>
                        <p className="text-three" aria-live="polite">
                            {result[2]}
                        </p>
                    </section>
                </div>
                <div className="flex justify-between">
                    <button className="bg-black text-white px-6 py-1" onClick={updateSeed}>
                        再生成
                    </button>
                    <button className="bg-black text-white px-6 py-1" onClick={handleShare}>
                        共有
                    </button>
                </div>
            </div>

            <dialog
                ref={dialogRef}
                className="px-6 py-4 max-w-md w-full fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
                <h2 className="text-lg font-bold mb-4">結果 URL を共有</h2>
                <input
                    type="text"
                    value={currentUrl}
                    readOnly
                    onClick={(e) => e.currentTarget.select()}
                    className="w-full px-3 py-2 border border-gray-400 mb-4 text-xl"
                />
                <div className="flex justify-end gap-2">
                    <button className="bg-gray-400 text-black px-6 py-1" onClick={() => dialogRef.current?.close()}>
                        戻る
                    </button>
                    <button className="bg-black text-white px-6 py-1" onClick={handleCopy}>
                        {copied ? "コピー済" : "コピー"}
                    </button>
                </div>
            </dialog>
        </div>
    );
}
