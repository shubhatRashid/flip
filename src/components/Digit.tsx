export default function Digit({value,width }:{value:number | string,width:number}) {
    return (
        <div 
            className={
                `flex justify-center items-center rounded-xl text-black border bg-gray-100
                ${width === 1?" h-full w-full max-w-[200px]":"w-[5%] bg-black  pb-7"}`
            }
            style={{fontFamily:"fantasy"}}
            
        >
            <p className="flex text-4xl sm:text-8xl">{value}</p>
        </div>
    );
}