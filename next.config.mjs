import withTM from 'next-transpile-modules';

// ESM 문법을 사용하여 Next.js 구성 설정
const nextConfig = {
    reactStrictMode: true,
    compiler: {
        styledComponents: true,
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
