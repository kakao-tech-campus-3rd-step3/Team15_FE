import { Card, CardContent } from '../shadcn/card';

interface StatCardProps {
  label: string;
  value: number;
  color: string;
}

export const StatCard = ({ label, value, color }: StatCardProps) => {
  return (
    <Card>
      <CardContent className='p-4 text-center'>
        <div className={`text-2xl font-bold ${color}`}>{value}</div>
        <div className='text-sm text-gray-600'>{label}</div>
      </CardContent>
    </Card>
  );
};
