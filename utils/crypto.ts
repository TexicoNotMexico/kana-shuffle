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
    "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわん".split("");

export const getShuffledHiragana = (seed: number): string[][] => {
    const arr = [...HIRAGANA_SOURCE];
    const rng = createRng(seed);

    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    const result: string[][] = [];
    for (let i = 0; i < arr.length; i += 15) {
        const group = arr.slice(i, i + 15);
        group.sort((a, b) => a.localeCompare(b));
        result.push(group);
    }
    return result;
};

export const generateRandomSeed = (): number => Math.floor(Math.random() * 1000000);
