import { Search } from 'lucide-react';
import { Input } from '@/shared/ui/shadcn/input';
import { Card, CardContent } from '@/shared/ui/shadcn/card';

interface ActivitySearchProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function ActivitySearch({ searchQuery, onSearchChange }: ActivitySearchProps) {
  return (
    <Card>
      <CardContent className='pt-6'>
        <div className='flex items-center space-x-4'>
          <div className='relative flex-1'>
            <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400' />
            <Input
              placeholder='활동 내역 검색...'
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className='pl-10'
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
