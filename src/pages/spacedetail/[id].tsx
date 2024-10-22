import ItemDetail from '@/components/ItemDetail/Item';
import { GetServerSideProps } from 'next';
import { space as spaceData } from '@/utill/datas'; // space를 spaceData로 변경
import { Space } from '@/types';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params as { id: string };

    const spaceItem = spaceData.find((item) => item.id.toString() === id);
    console.log(spaceItem,'스ㅔ이스아이템')
    if (!spaceItem) {
        return { notFound: true }; // 해당 id에 대한 데이터가 없으면 404 페이지로
    }

    return {
        props: {
            space: spaceItem, // 해당 데이터를 props로 전달
        },
    };
};
interface SpaceDetailProps {
    space: Space; // 타입 정의
}
const spacedetail: React.FC<SpaceDetailProps> = ({ space }) => {
    return (
            <ItemDetail space={space}/>
    );
};
export default spacedetail;
