import { Button } from '@/shared/ui/shadcn/button';
import type { MissionCategory } from '../types/mission';

interface Props {
  categories: MissionCategory[];
  selectedCategory: MissionCategory;
  onSelect: (category: MissionCategory) => void;
}

export const CategoryFilter = ({ categories, selectedCategory, onSelect }: Props) => (
  <div className='mb-6 flex gap-2 overflow-x-auto pb-2'>
    {categories.map((category) => (
      <Button
        key={category}
        variant={selectedCategory === category ? 'default' : 'outline'}
        size='sm'
        onClick={() => onSelect(category)}
        className={
          selectedCategory === category
            ? 'bg-green-500 text-white hover:bg-green-600'
            : 'bg-white hover:bg-gray-50'
        }
      >
        {category}
      </Button>
    ))}
  </div>
);
