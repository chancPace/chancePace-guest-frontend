import { Space } from '@/types';
import { space } from '@/utill/datas';
import { ItemDetailStyled } from './styled';
import ImgSection from '../ImgSection';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import KakaoMap from '../KakaoMap';
import ReservationSticky from '../ReservationSticky';

interface ItemDetailProps {
    space: Space;
}
const ItemDetail: React.FC<ItemDetailProps> = ({ space }) => {
    const onChange = (key: string) => {
        console.log(key);
    };

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: '공간 정보',
            children: (
                <div className="tab">
                    <p className="detail-title">[공간 정보]</p>
                    <p>{space.description}</p>
                    <p>{space.spacePrice.toLocaleString()}원</p>
                    <p>
                        <span>최소 인원:</span> {space.Minimum}명
                    </p>
                    <p>
                        <span>최대 인원:</span> {space.Maximum}명
                    </p>
                    <div>
                        <p className='detail-title'>[편의 시설]</p>
                        {space.amenities.map((amenity, index) => (
                            <p key={index} style={{ marginBottom: '16px' }}>
                                - {amenity}
                            </p>
                        ))}
                    </div>
                    <div className="map">
                        <KakaoMap address={space.spaceLocation} />
                    </div>
                </div>
            ),
        },
        {
            key: '2',
            label: '주의사항',
            children: 'Content of Tab Pane 2',
        },
        {
            key: '3',
            label: '후기',
            children: 'Content of Tab Pane 3',
        },
        {
            key: '4',
            label: 'Q&A',
            children: 'Content of Tab Pane 3',
        },
    ];

    return (
        <ItemDetailStyled>
            <ImgSection
                mainImg={space.spaceImg[0].src}
                smallImgs={space.spaceImg.slice(1)}
            />
            <div className="spaceTitle">
                <p>{space.spaceName}</p>
                <p>{space.spaceLocation}</p>
            </div>
            <div className="detailBottom">
                <div className="tabWrap">
                    <Tabs
                        defaultActiveKey="1"
                        items={items}
                        onChange={onChange}
                    />
                </div>
                <div className="paymentSection">
                    <ReservationSticky
                        price={space.spacePrice}
                        businessStartTime={space.businessStartTime}
                        businessEndTime={space.businessEndTime}
                    />
                </div>
            </div>
        </ItemDetailStyled>
    );
};
export default ItemDetail;
