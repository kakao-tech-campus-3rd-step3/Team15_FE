export const getCategoryColor = (category: string) => {
  const colors: { [key: string]: string } = {
    경험담: 'bg-blue-100 text-blue-700', // 개인적인 이야기 → 편안한 블루
    질문: 'bg-orange-100 text-orange-700', // 조언 요청 → 따뜻한 오렌지
    도전: 'bg-green-100 text-green-700', // 작은 목표/도전 → 희망의 그린
    정보공유: 'bg-purple-100 text-purple-700', // 음악·호흡법 같은 정보 → 차분한 퍼플
    격려: 'bg-pink-100 text-pink-700', // 서로 칭찬/위로 → 따뜻한 핑크
    위로: 'bg-indigo-100 text-indigo-700', // "혼자가 아니에요" → 안정감의 인디고
    도움글: 'bg-yellow-100 text-yellow-700', // 루틴, 습관 조언 → 밝은 옐로우
  };
  return colors[category] || 'bg-gray-100 text-gray-700';
};
