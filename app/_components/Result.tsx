"use client";
import { useMemo, useState, useRef } from "react";
import HiraganaGrid from "./HiraganaGrid";
import { getShuffledHiragana2 } from "@/utils/crypto";

export default function Result({ updateSeed, seed }: { updateSeed: () => void; seed: number | null }) {
    const result = useMemo(() => (seed ? getShuffledHiragana2(seed, []) : ""), [seed]);

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

    const colorClassNames = [
        "text-one",
        "text-two",
        "text-three",
        "text-four",
        "text-five",
        "text-six",
        "text-seven",
        "text-eight",
        "text-nine",
    ];

    return (
        <div className="flex flex-col gap-4 items-center">
            <h2 className="text-xl">No. {seed}</h2>
            <HiraganaGrid result={result} />
            <div className="flex flex-col gap-4 w-fit px-8">
                <div className="flex flex-col gap-1">
                    {result !== "" ? (
                        result.map((group, idx) => (
                            <section key={idx} aria-labelledby={`group-${idx}`}>
                                <h3 id={`group-${idx}`} className="text-sm text-gray-400">
                                    グループ {idx + 1}
                                </h3>
                                <p className={colorClassNames[idx % colorClassNames.length]} aria-live="polite">
                                    {group.join(" ")}
                                </p>
                            </section>
                        ))
                    ) : (
                        <section className="text-6xl text-center">
                            <p>丫</p>
                        </section>
                    )}
                </div>
                <div className="flex justify-between">
                    <button
                        className="bg-black text-white hover:bg-gray-400 active:bg-white hover:text-black hover:outline-2 outline-black hover:outline-solid px-6 py-1"
                        onClick={updateSeed}
                    >
                        再生成
                    </button>
                    <button
                        className="bg-black text-white hover:bg-gray-400 active:bg-white hover:text-black hover:outline-2 outline-black hover:outline-solid px-6 py-1"
                        onClick={handleShare}
                    >
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
                    <button className="bg-white text-black px-6 py-1" onClick={() => dialogRef.current?.close()}>
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
