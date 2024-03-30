import React, { useState, useEffect } from 'react';

export const AddCategory = ({ onCategoryChange }: { onCategoryChange: (category: string) => void }) => {
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
    <div>
      <select value={selectedOption} onChange={handleSelectChange}>
        {options.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
      {selectedOption && (
        <div>
          <input
            type="text"
            value={editedOption || selectedOption}
            onChange={(e) => setEditedOption(e.target.value)}
          />
        </div>
      )}
      <div>
        <input
          type="text"
          value={editedOption}
          onChange={(e) => setEditedOption(e.target.value)}
        />
        <button onClick={handleAddOption}>Add Category</button>
      </div>
    </div>
  );
};
