// import withTM from 'next-transpile-modules';

// // ESM 문법을 사용하여 Next.js 구성 설정
// const nextConfig = {
//     reactStrictMode: true,
//     compiler: {
//         styledComponents: true,
//     },
//     eslint: {
//         ignoreDuringBuilds: true, // ESLint 오류를 무시하는 설정
//         // 특정 규칙 비활성화
//         // rules: {
//         //     'react/no-unescaped-entities': 'off', // 이 규칙을 비활성화합니다.
//         // },
//     },
// };

// // withTM을 사용하여 rc-util과 antd를 트랜스파일합니다.
// export default withTM([
//     'rc-util',
//     'antd',
//     '@ant-design/icons',
//     'rc-pagination',
//     'rc-picker',
// ])(nextConfig);

// next.config.js
// next.config.js
const withTM = require('next-transpile-modules')([
  'rc-util',
  'rc-tree', // 이 부분을 추가하여 rc-tree 트랜스파일
  'rc-table', // 문제를 일으키는 rc-table 모듈 추가
  '@babel/runtime', // 문제를 일으킬 수 있는 babel/runtime 추가
  'antd',
  '@ant-design/icons',
  'rc-pagination',
  'rc-picker',
]);

module.exports = withTM({
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  compiler: {
    styledComponents: true,
  },
  env: {
    GENERATE_SOURCEMAP: process.env.GENERATE_SOURCEMAP || 'false',
  },
});

// CommonJS 방식으로 설정 내보내기
// module.exports = withTM(nextConfig);
