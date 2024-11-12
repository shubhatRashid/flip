import { useRouter } from "next/navigation";
import Image from "next/image";
export default function HomeCard({currImage,name,property}:{currImage:{src:string},name:string,property:string|Function}) {
    const router = useRouter()
    return (
        <button 
            className="flex flex-col gap-3 min-w-[120px] min-h-[150px] justify-center items-center border p-2 rounded-xl 
                        font-bold font-mono capitalise shadow-md hover:shadow-xl hover:bg-gray-50"
            onClick={typeof property === 'string' ?() => router.push(property): () => property(true)}>
            <h2>{name}</h2>
            <Image src={currImage.src} alt="time" width={60} height={60} />
        </button>
    );
}