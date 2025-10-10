interface StatCardProps {
  label: string;
  value: number;
  color: string;
}

export const StatCard = ({ label, value, color }: StatCardProps) => {
  return (
    <div className='rounded-lg bg-white p-4 text-center shadow-sm'>
      <div className={`text-2xl font-bold ${color}`}>{value}</div>
      <div className='text-sm text-gray-600'>{label}</div>
    </div>
  );
};
