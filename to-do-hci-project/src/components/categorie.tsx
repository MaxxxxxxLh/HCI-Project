import React, { useState, useEffect} from 'react';
import { I18nextProvider,useTranslation } from 'react-i18next';
import i18n from './i18n';

export const AddCategory = ({ onCategoryChange, placeholder }: { placeholder: string; onCategoryChange: (category: string) => void }) => {
  const { t } = useTranslation();
  const [options, setOptions] = useState<string[]>(() => {
    const storedOptions = localStorage.getItem('categoryOptions');
    return storedOptions ? JSON.parse(storedOptions) : [''];
  });
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [editedOption, setEditedOption] = useState<string>('');

  useEffect(() => {
    localStorage.setItem('categoryOptions', JSON.stringify(options));
  }, [options]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
    setEditedOption('');
    onCategoryChange(e.target.value);
  };

  const handleEdit = () => {
    setEditedOption(selectedOption);
  };

  const handleSave = () => {
    console.log('Edited Option:', editedOption);
  };

  const handleAddOption = () => {
    if (editedOption.trim() !== '' && !options.includes(editedOption.trim())) {
      setOptions([...options, editedOption.trim()]);
      setSelectedOption(editedOption.trim());
      setEditedOption('');
    }
  };  

  return (
    <div className="dark:bg-gray-700 items-center">
      <select className="flex place-self-center dark:bg-gray-700 border-b border-gray-300 rounded-md pb-2 space-y-48" value={selectedOption} onChange={handleSelectChange}>
        <option value="" disabled hidden>{placeholder}</option>
        {options.map((option, index) => (
          <option className="dark:bg-gray-700 border-b border-gray-300 rounded-md" key={index} value={option}>{option}</option>
        ))}
      </select>
      <div className="dark:bg-gray-700 rounded-md ">
        <input
          className='dark:bg-gray-700 border-b border-gray-300 rounded-md'
          
          type="text"
          value={editedOption}
          onChange={(e) => setEditedOption(e.target.value)}
        />
        <button className='pl-4' onClick={handleAddOption}>{t('addCategory')}</button>
      </div>
    </div>
  );
};
