const createRng = (seed: number) => {
    let x = seed;
    return () => {
        x ^= x << 13;
        x ^= x >> 17;
        x ^= x << 5;
        return (x >>> 0) / 4294967296;
    };
};

const HIRAGANA_SOURCE =
    "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわん".split(""); // "を" を抜いた 45 字

/**
 * ひらがなから "を" を抜いた 45 字をシャッフルして 15 字ずつの配列にする
 * @param seed シード値
 * @returns 15 字ずつ分割してソートしたひらがなの 2 次元配列
 */
export const getShuffledHiragana = (seed: number): string[][] => {
    return getShuffledHiragana2(seed, [15, 15, 15]);
};

/**
 * ひらがなから "を" を抜いた 45 字をシャッフルして分割サイズの配列で指定した字数ずつの配列にする
 * @param seed シード値
 * @param groupSizes 分割サイズの配列
 * @returns groupSizes で分割してソートしたひらがなの 2 次元配列
 */
export const getShuffledHiragana2 = (seed: number, groupSizes: number[]): string[][] => {
    if (groupSizes.length === 0) groupSizes = [15, 15, 15];

    const totalRequested = groupSizes.reduce((sum, size) => sum + size, 0);
    if (totalRequested !== HIRAGANA_SOURCE.length) {
        throw new Error(
            `Total group sizes (${totalRequested}) must match HIRAGANA_SOURCE length (${HIRAGANA_SOURCE.length})`,
        );
    }

    const arr = [...HIRAGANA_SOURCE];
    const rng = createRng(seed);

    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    const result: string[][] = [];
    let currentIndex = 0;
    for (const size of groupSizes) {
        const group = arr.slice(currentIndex, currentIndex + size);
        group.sort((a, b) => a.localeCompare(b));
        result.push(group);

        currentIndex += size;
    }

    return result;
};

export const generateRandomSeed = (): number => Math.floor(Math.random() * 1000000);
