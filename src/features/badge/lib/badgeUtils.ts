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

export const getRarityColor = (rarity: string) => {
  const colors: Record<string, string> = {
    일반: 'bg-gray-100 text-gray-700',
    희귀: 'bg-blue-100 text-blue-700',
    전설: 'bg-purple-100 text-purple-700',
    특별: 'bg-yellow-100 text-yellow-700',
  };

  return colors[rarity] || colors.일반;
};
