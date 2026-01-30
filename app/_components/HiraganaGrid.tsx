export default function HiraganaGrid({ result }: { result: "" | string[][] }) {
    const gojuuonhyou = [
        ["あ", "い", "う", "え", "お"],
        ["か", "き", "く", "け", "こ"],
        ["さ", "し", "す", "せ", "そ"],
        ["た", "ち", "つ", "て", "と"],
        ["な", "に", "ぬ", "ね", "の"],
        ["は", "ひ", "ふ", "へ", "ほ"],
        ["ま", "み", "む", "め", "も"],
        ["や", "", "ゆ", "", "よ"],
        ["ら", "り", "る", "れ", "ろ"],
        ["わ", "", "", "", "を"],
        ["ん", "", "", "", ""],
    ];

    const getCharacterIndex = (char: string): number => {
        for (let i = 0; i < result.length; i++) {
            for (let j = 0; j < result[i].length; j++) {
                if (result[i][j] === char) return i;
            }
        }
        return -1;
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

    const getColorClass = (char: string): string => {
        if (char === "") return "bg-black";
        const index = getCharacterIndex(char);
        if (index === -1) return "text-gray-400";
        return colorClassNames[index % colorClassNames.length];
    };

    return (
        <div className="flex justify-center flex-row-reverse">
            {gojuuonhyou.map((row, rowIndex) => (
                <div key={rowIndex}>
                    {row.map((char, charIndex) => (
                        <div
                            key={charIndex}
                            className={`sm:w-13 sm:h-13 w-8 h-8 sm:text-5xl text-3xl flex items-center justify-center ${getColorClass(char)}`}
                            style={{ writingMode: "vertical-rl" }}
                        >
                            {char}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
