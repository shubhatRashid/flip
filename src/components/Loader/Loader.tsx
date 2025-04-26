import { LoaderPinwheel } from "lucide-react";
import "./styles.css"

export default function Loader() {
    return (
        <div className="animate-spin">
            <LoaderPinwheel size={35}/>
        </div>
    );
}