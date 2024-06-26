import React, { useState } from 'react';
import { TaskInterface } from '@/interfaces/TaskInterface';
import { useEffect } from 'react';
import i18n from './i18n';
import { I18nextProvider, useTranslation } from 'react-i18next';

interface FilteredButtonProps {
  options: string[];
  setIsFiltered: React.Dispatch<React.SetStateAction<boolean>>
}

export const FilteredButton: React.FC<FilteredButtonProps> = ({ options, setIsFiltered}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleOptionClick = (option: string) => {
      setSelectedCategory(option);
      localStorage.setItem('selectedCategory', option);
      let tasks = localStorage.getItem('tasks');
      setIsOpen(false);
      if (option === ""){
        setIsFiltered(false);
      }else{
        setIsFiltered(true)
      }
      if (tasks) {
          const parsedTasks = JSON.parse(tasks);
          const filteredTasks: any = option !== "" ? parsedTasks.filter(task => {
            return task.category === option}) : parsedTasks;
          localStorage.setItem('filteredTask', JSON.stringify(filteredTasks));
      }
      
  };




  return (
    <>
      <div className="relative inline-block text-left pl-16 pr-16 select-none">
                  <div className="relative inline-block text-left pl-16 pr-16 select-none">
            <div>
                <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {selectedCategory? `${t('filter')} (${selectedCategory})` : t('filter')}
                    <svg
                        className="-mr-1 ml-2 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 12a1 1 0 01-.707-.293l-4-4a1 1 0 011.414-1.414L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4A1 1 0 0110 12z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </div>

            {isOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        {options.map((option: string, index: number) => (
                            <button
                                key={index}
                                onClick={() => handleOptionClick(option)}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 shadow-md hover:bg-gray-100 hover:text-gray-900 dark:text-white dark:shadow-slate-600"
                                role="menuitem"
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
      </div>  
    </>
      
  );
};
