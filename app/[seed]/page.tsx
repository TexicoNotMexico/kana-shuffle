import { Metadata } from "next";
import { getShuffledHiragana2 } from "@/utils/crypto";
import ResultContainer from "./_components/ResultContainer";

export async function generateMetadata({ params }: { params: Promise<{ seed: string }> }): Promise<Metadata> {
    const { seed } = await params;
    const seedNum = parseInt(seed, 10);

    const grid = getShuffledHiragana2(seedNum, []);
    const colorNames = ["赤", "青", "緑", "橙", "紫", "黄", "桃", "深緑", "空"];
    const descriptionText = `${grid.length} 分割（${grid.map((_val, idx) => colorNames[idx % colorNames.length]).join("，")}）`;

    const ogUrl = new URL(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/og`);
    ogUrl.searchParams.set("s", seed);

    return {
        title: `No. ${seed}`,
        description: descriptionText,
        openGraph: {
            description: descriptionText,
            images: [
                {
                    url: ogUrl.toString(),
                    width: 1200,
                    height: 630,
                },
            ],
        },
    };
}

export default async function Page({ params }: { params: Promise<{ seed: string }> }) {
    const { seed } = await params;
    const seedNum = parseInt(seed, 10);

    return (
        <div className="font-family-zen font-bold text-2xl flex justify-center w-screen py-8">
            <ResultContainer seed={seedNum} />
        </div>
    );
}
