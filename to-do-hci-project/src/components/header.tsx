import React, { useState } from "react";
import { FilteredButton } from "./filter";
import { TaskInterface } from "@/interfaces/TaskInterface";
import { useEffect } from "react";
import { LanguageSwitch } from "./switchLanguage";
import i18n from "./i18n";
import { useTranslation } from "react-i18next";

export const Header = () => {

    const [darkMode, setDarkMode] = useState(false);
    const [tasks, setTasks] = useState<TaskInterface[]>([]);
    const [categories, setCategories] = useState<string[]>([""]);
    const { t } = useTranslation();

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        if (darkMode) {
            document.body.classList.remove('dark');
        } else {
            document.body.classList.add('dark');
        }
    };

    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        }
    }, []);

    useEffect(() => {
        const storedCategories = localStorage.getItem('categoryOptions');
        if (storedCategories){
            setCategories(JSON.parse(storedCategories));
        }
    }, []);



    return (
        <header >
            <div className="select-none flex justify-center items-center pt-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ">
                <LanguageSwitch/>
                <h1 className="text-2xl font-bold pl-44 pr-44">To-Do</h1>
                <button className={`shadow-md dark:shadow-slate-600 dark:bg-gray-700 dark:hover:bg-gray-700 dark:text-white font-bold py-2 px-4 rounded ${darkMode ? 'dark-mode-btn' : ''}`} onClick={toggleDarkMode}>
                    {darkMode ?  `${t('darkMode')}` : `${t('lightMode')}`}
                </button>
            </div>
        </header>
    );
};
