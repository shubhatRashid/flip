import { useRouter } from "next/navigation";
import Image from "next/image";
export default function HomeCard({currImage,name,property}:{currImage:{src:string},name:string,property:string|Function}) {
    const router = useRouter()
    return (
        <button 
            className="flex flex-col gap-3 justify-center items-center border p-2 rounded-xl font-bold font-serif capitalise"
            onClick={typeof property === 'string' ?() => router.push(property): () => property(true)}>
            <h2>{name}</h2>
            <Image src={currImage.src} alt="time" width={100} height={100} />
        </button>
    );
}