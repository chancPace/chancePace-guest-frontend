import withTM from 'next-transpile-modules';

// ESM 문법을 사용하여 Next.js 구성 설정
const nextConfig = {
    reactStrictMode: true,
    compiler: {
        styledComponents: true,
    },
    eslint: {
        ignoreDuringBuilds: true, // ESLint 오류를 무시하는 설정
        // 특정 규칙 비활성화
        // rules: {
        //     'react/no-unescaped-entities': 'off', // 이 규칙을 비활성화합니다.
        // },
    },
};

// withTM을 사용하여 rc-util과 antd를 트랜스파일합니다.
export default withTM([
    'rc-util',
    'antd',
    '@ant-design/icons',
    'rc-pagination',
    'rc-picker',
])(nextConfig);
