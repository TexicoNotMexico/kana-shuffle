export default function Generate({ updateSeed }: { updateSeed: () => void }) {
    return (
        <div>
            <button className="bg-black text-white px-6 py-1" onClick={updateSeed}>
                生成
            </button>
        </div>
    );
}
