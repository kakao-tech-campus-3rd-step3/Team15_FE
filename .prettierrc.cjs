// .prettierrc.cjs 파일 내용

/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */

module.exports = {
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindEntryPoint: './src/styles/tailwind.css',
  semi: true, // 세미콜론 사용
  singleQuote: true, // 작은따옴표 사용
  tabWidth: 2, // 들여쓰기 2칸
  useTabs: false, // 탭 대신 스페이스
  printWidth: 100, // 한 줄 최대 길이
  trailingComma: 'all', // 가능한 곳에 항상 쉼표 추가
  bracketSpacing: true, // 객체 중괄호 안에 공백 추가 { foo: bar }
  arrowParens: 'always', // 화살표 함수 매개변수 괄호 항상 추가
  endOfLine: 'lf', // 줄바꿈은 LF로 통일
  jsxSingleQuote: true,
};
