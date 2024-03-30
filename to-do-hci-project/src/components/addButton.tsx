"use client"
import React, { useState, useEffect } from 'react';
import { Box } from './boxTask';
import { TaskInterface } from '@/interfaces/TaskInterface';

export const BoxManager = () => {
    const [tasks, setTasks] = useState<TaskInterface[]>([]);
    const [counter, setCounter] = useState<number>(0);

    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

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

    const updateTask = (updatedTask: TaskInterface) => {
        const updatedTasks = tasks.map(task => (task.id === updatedTask.id ? updatedTask : task));
        setTasks(updatedTasks);
    };

    const removeTask = (id: number) => {
        const updatedTasks = tasks.filter(task => task.id !== id);
        setTasks(updatedTasks);
    };

    return (
        <>
            <div className="absolute bottom-1 right-1 flex items-center justify-center flex-1 h-12 w-12 p-2 text-gray shadow-md shadow-gray-600 rounded-full dark:border-gray-600 dark:text-white dark:bg-gray-700 dark:shadow-slate-400 dark:shadow-inner">
                <button onClick={addTask}>
                    <div className="relative">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </div>
                </button>
            </div>
            <div className="justify-items-center p-8 grid grid-cols-12">
                <h4 className="col-start-2 col-span-4">Title</h4>
                <h4>Category</h4>
                <h4>Priority</h4>
                <h4>Date</h4>
                <h4>Done</h4>
                <h4>Suppress</h4>
            </div>
            <div>
                {tasks.map(task => (
                    <Box
                        key={task.id}
                        task={task}
                        onUpdate={updateTask}
                        onRemove={removeTask}
                    />
                ))}
            </div>
        </>
    );
};
