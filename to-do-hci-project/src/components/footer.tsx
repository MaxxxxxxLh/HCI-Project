import React, {useEffect} from "react";
import { CalendarIcon, HomeIcon, IconNode } from "lucide-react";

export const Footer = ({ toggle }: { toggle: (componentName: string) => void }) => {
    return (
        <footer className="absolute flex justify-center items-end p-4 bg-neutral text-neutral-conten">
            <div className="select-none flex justify-center items-center pt-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
                <button className="p-4" onClick={() => toggle('Home')}><HomeIcon/></button>
                <button className="p-4" onClick={() => toggle('Calendar')}><CalendarIcon/></button>
            </div>            
        </footer>
    );
};

