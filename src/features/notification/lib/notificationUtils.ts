export const getTypeColor = (type: string) => {
  switch (type) {
    case 'mission':
      return 'bg-green-100 text-green-700';
    case 'comment':
      return 'bg-blue-100 text-blue-700';
    case 'like':
      return 'bg-red-100 text-red-700';
    case 'system':
      return 'bg-purple-100 text-purple-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

export const getTypeLabel = (type: string) => {
  switch (type) {
    case 'mission':
      return '미션';
    case 'comment':
      return '댓글';
    case 'like':
      return '좋아요';
    case 'system':
      return '공지';
    default:
      return '알림';
  }
};
