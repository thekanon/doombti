import React from 'react';
import { getCategoryList } from '@/app/lib/data';
import SelectCategoryContainer from '@/app/ui/containers/SelectCategoryContainer';

const SelectCategory = async () => {
  const categoryListResultRow = await getCategoryList();
  const categoryList = categoryListResultRow.map((e, i) => {
    return {
      id: i,
      name: e.category,
    };
  });

  return (
    <div>
      <SelectCategoryContainer categoryList={categoryList} />
    </div>
  );
};

export default SelectCategory;
