interface SmallBadgeProps {
  name: string;
  iconUrl: string;
}

const SmallBadge = ({ name, iconUrl }: SmallBadgeProps) => {
  return (
    <div key={name} className='flex flex-col items-center text-center'>
      <div className='mb-1 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-gray-100'>
        <img src={iconUrl} alt={name} className='h-full w-full object-contain' />
      </div>
      <span className='text-xs text-gray-600'>{name}</span>
    </div>
  );
};

export default SmallBadge;
