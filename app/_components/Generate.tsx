export default function Generate({ updateSeed }: { updateSeed: () => void }) {
    return (
        <div>
            <button
                className="bg-black text-white hover:bg-gray-400 active:bg-white hover:text-black hover:outline-2 outline-black hover:outline-solid px-6 py-1"
                onClick={updateSeed}
            >
                生成
            </button>
        </div>
    );
}
