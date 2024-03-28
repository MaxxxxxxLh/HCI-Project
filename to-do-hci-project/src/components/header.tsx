import React, { useState } from "react";
import { FilteredButton } from "./filter";

export const Header = () => {

    const [darkMode, setDarkMode] = useState(false);


    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        if (darkMode) {
            document.body.classList.remove('dark');
        } else {
            document.body.classList.add('dark');
        }
    };

    return (
        <header >
            <div className="flex justify-center items-center pt-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ">
                <select className="border-transparent focus:border-transparent active:border-transparent rounded-md dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
                    <option value="" disabled>Select a language</option>
                    <option value="/en">English</option>
                    <option value="/fr">Français</option>
                    <option value="/kr">Korean</option>
                </select>
                <h1 className="text-2xl font-bold pl-44 pr-44">To-Do</h1>
                <button className={`dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white font-bold py-2 px-4 rounded ${darkMode ? 'dark-mode-btn' : ''}`} onClick={toggleDarkMode}>
                    {darkMode ? 'Dark Mode' : 'Light Mode'}
                </button>
            </div>
            <div className="flex justify-center items-center pt-4">
                <form>   
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none ">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm border-transparent focus:border-transparent active:border-transparent text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." required />
                        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                    </div>
                </form>
                <FilteredButton options={["All", "Active", "Completed"]}/>
            </div>
        </header>
    );
};
