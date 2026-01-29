import type { Metadata } from "next";
import { Zen_Kaku_Gothic_New } from "next/font/google";
import "./globals.css";

const zenKakuGothicNew = Zen_Kaku_Gothic_New({
    weight: ["400", "500", "700"],
    variable: "--font-family-zen",
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "kana-shuffle",
    description: "三等分しりとり用",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ja">
            <body className={`${zenKakuGothicNew.className} antialiased`}>{children}</body>
        </html>
    );
}
