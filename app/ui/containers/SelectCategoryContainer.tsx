'use client';
import React from 'react';
import { MultiSelector, ICategory } from '../common/Atoms/MultiSelector';

const SelectCategoryContainer = ({ categoryList }: any) => {
  const handleSelectionChange = (selectedItems: ICategory[]) => {
    // console.log('Selected Items:', selectedItems);
    // You can now use selectedItems as needed
  };

  return (
    <>
      <MultiSelector
        onSelectionChange={handleSelectionChange}
        list={categoryList}
      />
    </>
  );
};

export default SelectCategoryContainer;
