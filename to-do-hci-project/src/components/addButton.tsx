"use client"
import React, { useState, useEffect } from 'react';
import { Box } from './boxTask';
import { TaskInterface } from '@/interfaces/TaskInterface';
import { I18nContext,useTranslation} from 'react-i18next';
import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';
import { FilteredButton } from './filter';
import { Search } from './search';


export const BoxManager = () => {
    const { t } = useTranslation();
    const [counter, setCounter] = useState<number>(0);
    const [filteredTasks, setFilteredTasks] = useState<TaskInterface[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [categories, setCategories] = useState<string[]>([])
    const [isFiltered, setIsFiltered] = useState<boolean>(false)
    const storedTasks = localStorage.getItem('tasks');
    const [tasks, setTasks] = useState<TaskInterface[]>(storedTasks ? JSON.parse(storedTasks) : []);
    const [isSearching, setIsSearching] = useState<boolean>(false)
    const [searchTerm, setSearchTerm] = useState<string>("");
    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        }
    }, []);

    const updateTask = (updatedTask: TaskInterface) => {
        const updatedTasks = tasks.map(task => (task.id === updatedTask.id ? updatedTask : task));
        setTasks(updatedTasks);
        localStorage.setItem('filteredTask', JSON.stringify(tasks.filter(task => {
            return task.category === selectedCategory})));
    };

    const removeTask = (id: number) => {
        const updatedTasks = tasks.filter(task => task.id !== id);
        setTasks(updatedTasks);
        localStorage.setItem('filteredTask', JSON.stringify(tasks.filter(task => {
            return task.category === selectedCategory})));
    };


    useEffect(() => {
        setSelectedCategory(localStorage.getItem('selectedCategory'));
        if (selectedCategory!== ""){
            const storedFilteredTasks = localStorage.getItem('filteredTask');
            if (storedFilteredTasks){
                setFilteredTasks(JSON.parse(storedFilteredTasks));
            }
            const storedCategories = localStorage.getItem('categoryOptions');
            if (storedCategories){
                setCategories(JSON.parse(storedCategories));
            }
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

    },[updateTask,removeTask])
    
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));

    },[tasks])
    useEffect(() => {
        if (searchTerm !== "") {
            const filteredTasks = tasks.filter(task => task.title.toLowerCase().includes(searchTerm.toLowerCase()));
            setFilteredTasks(filteredTasks);
            setIsSearching(true);
        } else {
            setIsSearching(false);
            setSelectedCategory(localStorage.getItem('selectedCategory'));
        }
    }, [searchTerm, tasks]);
    

    const addTask = () => {
        const newTask: TaskInterface = {
            id: counter,
            title: "",
            content: "",
            level: "",
            date: new Date(),
            category: "",
            isFinished: false,
        };
        setCounter(counter + 1);
        setTasks([...tasks, newTask]);
    };




    return (
        <>
            <div className="flex justify-center items-center pt-4">
                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
                <FilteredButton options={categories} setIsFiltered={setIsFiltered} />
            </div>
            <div className="absolute bottom-8 right-8 flex items-center justify-center flex-1 h-12 w-12 p-2 text-gray shadow-md shadow-gray-600 rounded-full dark:border-gray-600 dark:text-white dark:bg-gray-700 dark:shadow-slate-400 dark:shadow-inner">
                <button onClick={addTask}>
                    <div className="relative">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </div>
            </button>
            
                </div>
            <div className="justify-items-center p-8 grid grid-cols-12">
                <h4 className="col-start-2 col-span-4">{t('title')}</h4>
                <h4>{t('category')}</h4>
                <h4>{t('priority')}</h4>
                <h4>{t('date')}</h4>
                <h4>{t('done')}</h4>
                <h4>{t('remove')}</h4>
            </div>
            <hr className="border-gray-300 dark:border-slate-400" />
            <div>
                {isFiltered || isSearching?
                filteredTasks.map (task => (
                    <div key={task.id}>
                    <Box
                        task={task}
                        onUpdate={updateTask}
                        onRemove={removeTask}
                    />
                    <hr className="border-gray-300 dark:border-slate-400" /> 
                    </div>
                    ))
                : tasks.map(task => (
                    <div key={task.id}>
                    <Box
                        task={task}
                        onUpdate={updateTask}
                        onRemove={removeTask}
                    />
                    <hr className="border-gray-300 dark:border-slate-400" /> 
                    </div>
                    ))
                }
            </div>
        </>
    );
};