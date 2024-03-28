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

    useEffect(() => {
        setEditedTask(task);
    }, [task]);

    const handleUpdate = () => {
        onUpdate(editedTask);
        setIsEditing(false);
    };

    const handleCategoryChange = (newCategory: string) => {
        setEditedTask({ ...editedTask, category: newCategory }); 
    };

    return (
        <div className="relative inline-block border-4 border-slate-500 rounded-md box-border dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ">
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
                    <AddCategory category={editedTask.category} onCategoryChange={handleCategoryChange} />
                    <button onClick={handleUpdate}>Update</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            ) : (
                <>
                    <button onClick={() => setIsEditing(true)} className='p-4'>
                        <h3>{task.title}</h3>
                        <p>{task.content}</p>
                        <p>{task.level}</p>
                        <p>{task.date ? new Date(task.date).toLocaleDateString('fr-FR') : ''}</p>
                        <p>{task.category}</p>
                    </button>  
                    <p></p>
                    <div className="absolute top-0 right-0 flex items-center justify-center flex-1 h-4 w-4 bg-red-800 text-white shadow rounded-full">
                        <button onClick={() => onRemove(task.id)}>
                            <div className="relative">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /> {/* Utilisez la forme de croix au lieu du signe plus */}
                                </svg>
                            </div>
                        </button>
                    </div>

                </>
            )}
        </div>
    );
};
