type ColorClasses = {
  bg: string;
  text: string;
  border: string;
};

export const getColorClasses = (color: string, earned = true) => {
  if (!earned) {
    return {
      bg: 'bg-gray-100',
      text: 'text-gray-400',
      border: 'border-gray-200',
    };
  }

  const colors: Record<string, ColorClasses> = {
    yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600', border: 'border-yellow-200' },
    red: { bg: 'bg-red-100', text: 'text-red-600', border: 'border-red-200' },
    blue: { bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-200' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-200' },
    green: { bg: 'bg-green-100', text: 'text-green-600', border: 'border-green-200' },
    indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600', border: 'border-indigo-200' },
    orange: { bg: 'bg-orange-100', text: 'text-orange-600', border: 'border-orange-200' },
    gray: { bg: 'bg-gray-100', text: 'text-gray-500', border: 'border-gray-200' },
  };

  return colors[color] || colors.gray;
};

export const getBadgeKindColor = (kind: string) => {
  const colors: Record<string, string> = {
    일반: 'bg-gray-100 text-gray-700',
    LOVE_EVANGELIST: 'bg-red-100 text-red-700',
    DILIGENT_COMMENTER: 'bg-purple-100 text-purple-700',
    MISSION_KILLER: 'bg-yellow-100 text-yellow-700',
    PERFECT_ATTENDANCE: 'bg-green-100 text-green-700',
  };

  return colors[kind] || colors.일반;
};
