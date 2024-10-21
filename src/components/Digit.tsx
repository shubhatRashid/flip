export default function Digit({value,width }:{value:number | string,width:number}) {
    return (
        <div 
        className={`flex w-[${width===1?'50%':'10%'}] h-[60%] 
                    justify-center items-center ${width===1?'text-[15rem]':'text-[8rem]'} 
                    font-mono ${width===1?"bg-neutral-800":'black'} rounded-xl text-slate-50`}
        >
            {value}
        </div>
    );
}