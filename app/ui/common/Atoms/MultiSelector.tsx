import React, { useState } from 'react';

export interface ICategory {
  id: number;
  name: string;
}

interface MultiSelectorProps {
  list: ICategory[];
  onSelectionChange: (selectedItems: ICategory[]) => void;
}

export const MultiSelector: React.FC<MultiSelectorProps> = ({
  list,
  onSelectionChange,
}) => {
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  const toggleCategory = (
    event: React.ChangeEvent<HTMLInputElement>,
    categoryId: number,
  ): void => {
    event.stopPropagation();
    setSelectedCategories((prevSelected) => {
      const newSelected = prevSelected.includes(categoryId)
        ? prevSelected.filter((id) => id !== categoryId)
        : [...prevSelected, categoryId];

      const selectedData = list.filter((category) =>
        newSelected.includes(category.id),
      );
      onSelectionChange(selectedData);

      return newSelected;
    });
  };

  return (
    <div className="flex w-full flex-col items-center justify-center">
      {list.map((category) => (
        <label
          key={category.id}
          className="m-1 flex w-full cursor-pointer items-center space-x-3 rounded border p-2 shadow transition-all duration-300 hover:bg-gray-100 hover:shadow-lg"
        >
          <input
            type="checkbox"
            checked={selectedCategories.includes(category.id)}
            onChange={(event) => toggleCategory(event, category.id)}
            className="checkbox-custom form-checkbox h-5 w-5"
          />
          <span
            className={`${
              selectedCategories.includes(category.id) ? 'font-bold' : ''
            } w-full`}
          >
            {category.name}
          </span>
        </label>
      ))}
    </div>
  );
};

export default MultiSelector;
