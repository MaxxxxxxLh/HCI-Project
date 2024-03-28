import React, { useState } from 'react';

export const AddCategory = (category: any) => {
  const [options, setOptions] = useState<string[]>([""]);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [editedOption, setEditedOption] = useState<string>('');

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
    setEditedOption(''); 
    category = e.target.value
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

