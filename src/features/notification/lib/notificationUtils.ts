export const getTypeColor = (type: string) => {
  switch (type) {
    case 'MISSION':
      return 'bg-green-100 text-green-700';
    case 'COMMENT':
      return 'bg-blue-100 text-blue-700';
    case 'LIKE':
      return 'bg-red-100 text-red-700';
    case 'SYSTEM':
      return 'bg-purple-100 text-purple-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

export const getTypeLabel = (type: string) => {
  switch (type) {
    case 'MISSION':
      return '미션';
    case 'COMMENT':
      return '댓글';
    case 'LIKE':
      return '좋아요';
    case 'SYSTEM':
      return '공지';
    default:
      return '알림';
  }
};
