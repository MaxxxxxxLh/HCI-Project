"use client"
import React, { useState } from 'react';
import { Box } from './boxTask';
import { TaskInterface } from '@/interfaces/TaskInterface';



export const BoxManager = () => {
    const [tasks, setTasks] = useState<TaskInterface[]>([]);
    const [counter, setCounter] = useState<number>(0); 

    const addTask = () => {
        const newTask: TaskInterface = {
            id: counter,
            title: "Test Task",
            content: "This is a test task",
            level: "urgent",
            date: "15/03/2024",
            categorie: "test",
        };
        setCounter(counter + 1);
        setTasks([...tasks, newTask]);
    };
    const removeTask = (task: TaskInterface) => {
        setTasks(tasks.filter((t)=> t!== task))
    }

    return (
        <>
            <button onClick={addTask}>New task</button>
            <div>
                {tasks.map(task => (
                    <>
                        <Box
                            key={task.id}
                            id={task.id}
                            title={task.title}
                            content={task.content}
                            level={task.level}
                            date={task.date}
                            categorie={task.categorie}
                        />
                        <button onClick={() => removeTask(task)}>Remove</button>
                    </>

                ))}
                
            </div>
        </>
    );
};
