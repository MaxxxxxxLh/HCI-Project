import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css'; 
import { TaskInterface } from '@/interfaces/TaskInterface';
import { AddCategory } from './categorie';
import { I18nextProvider,useTranslation } from 'react-i18next';
import i18n from './i18n';

interface BoxProps {
    task: TaskInterface;
    onUpdate: (updatedTask: TaskInterface) => void;
    onRemove: (id: number) => void;
}

export const Box: React.FC<BoxProps> = ({ task, onUpdate, onRemove }) => {
    const { t } = useTranslation();
    const [editedTask, setEditedTask] = useState<TaskInterface>(task);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isChecked, setIsChecked] = useState<boolean>(true);
    const [finishedTasks, setFinishedTasks] = useState<TaskInterface[]>([]);
    

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

    const handleLevelChange = (newLevel: string) => {
        setEditedTask({...editedTask, level: newLevel});
    }

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
        <>
            <div className="select-none relative rounded-md dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white ">
                {isEditing ? (
                        <div className="flex justify-center place-items-center ">
                        <div className="grid grid-rows-6 dark:bg-gray-700 dark:text-white rounded-md space-y-3">
                        <input
                            type="text"
                            value={editedTask.title}
                            placeholder={t('title')}
                            onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                            className="bg-transparent text-gray-600 border-b border-gray-300 text-center rounded-md dark:text-white focus:outline-none h-1/2 mt-10"
                        />
                        <textarea
                            value={editedTask.content}
                            onChange={(e) => setEditedTask({ ...editedTask, content: e.target.value })}
                            placeholder={t('content')}
                            className="bg-transparent border-b border-gray-300 text-gray-600 text-center rounded-md dark:text-white focus:outline-none"
                        />
                        <select
                            value={editedTask.level}
                            aria-placeholder={t('importance')}
                            onChange={(e) => handleLevelChange(e.target.value)}
                            className="bg-transparent border-b border-gray-300 text-gray-600 text-center rounded-md dark:text-white focus:outline-none h-1/2"
                        >
                            <option value="" disabled selected hidden>
                                {t('choosePriority')}
                            </option>
                            <option value="High">{t('high')}</option>
                            <option value="Medium">{t('medium')}</option>
                            <option value="Low">{t('low')}</option>
                        </select>
                        <DatePicker
                            selected={editedTask.date ? new Date(editedTask.date) : null}
                            placeholder={t('date')}
                            onChange={(date: Date) => setEditedTask({ ...editedTask, date: date ? date.toISOString() : '' })}
                            dateFormat="dd-MM-yyyy"
                            className="flex dark:bg-transparent border-b border-gray-300 rounded-md text-center place-self-center items-center justify-center dark:text-white focus:outline-none h-1/2"
                        />
                        <AddCategory
                            placeholder={t('category')}
                            onCategoryChange={(category: string) => handleCategoryChange(category)}
                        />
                        <button
                            onClick={handleUpdate}
                            className="bg-blue-500 hover:bg-blue-600 flex justify-center items-center text-center text-white px-2 py-1 rounded-md text-sm h-1/3"
                        >
                            {t('update')}
                        </button>
                        <button
                            onClick={() => setIsEditing(false)}
                            className="bg-gray-500 hover:bg-gray-600 text-center text-white px-2 py-1 rounded-md text-sm h-2/3"
                        >
                            {t('cancel')}
                        </button>
                    </div>
                    </div>
                    
                ) : (
                    <>
                        <div onClick={() => setIsEditing(true)}>
                            <div className='justify-items-center p-8 grid grid-cols-12'>
                                <h4 className='col-start-2 col-span-4'>{task.title}</h4>
                                <h4>{task.category}</h4>
                                <h4 >{task.level}</h4>
                                <h4>{task.date ? new Date(task.date).toLocaleDateString('fr-FR') : ''}</h4>
                                
                                <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} onClick={(e) => e.stopPropagation()} className="checkbox checkbox-success cursor-pointer"/>
                                <div className="flex items-center justify-center flex-1 h-4 w-4 bg-red-800 text-white shadow rounded-full">
                                    <div>
                                        <div className="relative" onClick={() => onRemove(task.id)}>
                                            <svg 
                                                xmlns="http://www.w3.org/2000/svg" 
                                                className="h-3 w-3 text-red-500 cursor-pointer" 
                                                fill="none" 
                                                viewBox="0 0 24 24" 
                                                stroke="currentColor"
                                            >
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
        </>
    );
};

