import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css'; 
import { TaskInterface } from '@/interfaces/TaskInterface';
import { AddCategory } from './categorie';

interface BoxProps {
    task: TaskInterface;
    onUpdate: (updatedTask: TaskInterface) => void;
    onRemove: (id: number) => void;
}

export const Box: React.FC<BoxProps> = ({ task, onUpdate, onRemove }) => {
    const [editedTask, setEditedTask] = useState<TaskInterface>(task);
    const [isEditing, setIsEditing] = useState(true);
    const [isChecked, setIsChecked] = useState<boolean>(true);
    const [finishedTasks, setFinishedTasks] = useState<TaskInterface[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    useEffect(() => {
        setEditedTask(task);
    }, [task]);

    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            setFinishedTasks(JSON.parse(storedTasks));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(finishedTasks));
    }, [finishedTasks]);

    const handleUpdate = () => {
        onUpdate(editedTask);
        setIsEditing(false);

        const updatedTasks = finishedTasks.map(t => t.id === editedTask.id ? editedTask : t);
        setFinishedTasks(updatedTasks);
    };

    const handleCategoryChange = (newCategory: string) => {
        setEditedTask({ ...editedTask, category: newCategory }); 
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(e.target.checked);
        if(!e.target.checked){
            setFinishedTasks([...finishedTasks, editedTask]);
            onRemove(task.id);

            const updatedTasks = finishedTasks.filter(t => t.id !== editedTask.id);
            setFinishedTasks(updatedTasks);
        }
    };

    return (
        <div className="select-none relative rounded-md dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white ">
            {isEditing ? (
                <div className='p-4'>
                    <label>Title</label>
                    <input
                        type="text"
                        value={editedTask.title}
                        onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                    />
                    <label>Content</label>
                    <textarea
                        value={editedTask.content}
                        onChange={(e) => setEditedTask({ ...editedTask, content: e.target.value })}
                    />
                    <label>Importance</label>
                    <select
                        value={editedTask.level}
                        onChange={(e) => setEditedTask({ ...editedTask, level: e.target.value })}
                    >
                        <option value="urgent">Urgent</option>
                        <option value="medium">Medium</option>
                        <option value="not urgent">Not Urgent</option>
                    </select>
                    <label>Date</label>
                    <DatePicker
                        selected={editedTask.date ? new Date(editedTask.date) : null}
                        onChange={(date: Date) => setEditedTask({ ...editedTask, date: date ? date.toISOString() : '' })}
                        dateFormat="dd-MM-yyyy"
                    />

                    <label>Category</label>
                    <AddCategory category={editedTask.category} onCategoryChange={(category: string) => setSelectedCategory(category)} />
                    <button onClick={handleUpdate}>Update</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            ) : (
                <>
                    <div onClick={() => setIsEditing(true)}>
                        <div className='justify-items-center p-8 grid grid-cols-12'>
                            <h4 className='col-start-2 col-span-4'>{task.title}</h4>
                            <h4>{task.category}</h4>
                            <h4 >{task.level}</h4>
                            <h4>{task.date ? new Date(task.date).toLocaleDateString('fr-FR') : ''}</h4>
                            
                            <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} onClick={(e) => e.stopPropagation()} className="checkbox checkbox-success"/>
                            <div className="flex items-center justify-center flex-1 h-4 w-4 bg-red-800 text-white shadow rounded-full">
                                <div onClick={() => onRemove(task.id)}>
                                    <div className="relative">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </div>
                                </div>
                            </div> 
                        </div>                    
                    </div>  
                    <p></p>
                </>
            )}
        </div>
    );
};

