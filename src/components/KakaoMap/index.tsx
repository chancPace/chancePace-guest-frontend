import { MapStyled } from './styled';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useEffect, useState } from 'react';
interface KakaoMapProps {
    latitude: number;
    longitude: number;
}

const KakaoMap: React.FC<KakaoMapProps> = ({ latitude, longitude }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        const existingScript = document.getElementById('kakao-map-script');

        if (!existingScript) {
            const kakaoMapsScript = document.createElement('script');
            kakaoMapsScript.id = 'kakao-map-script';
            kakaoMapsScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&libraries=services,clusterer&autoload=false`;
            kakaoMapsScript.async = true;
            kakaoMapsScript.defer = true;

            kakaoMapsScript.onload = () => {
                window.kakao.maps.load(() => {
                    setIsLoaded(true);
                });
            };

            document.head.appendChild(kakaoMapsScript);
        } else {
            setIsLoaded(true); // 이미 스크립트가 로드되었으면 바로 로딩 완료
        }

        return () => {
            if (existingScript) {
                document.head.removeChild(existingScript);
            }
        };
    }, []);

    if (!isLoaded) {
        return <div>Loading map...</div>;
    }

    return (
        <Map
            center={{
                lat: latitude,
                lng: longitude,
            }}
            level={3}
            style={{ width: '60%', height: '100%', borderRadius:'8px' }}
        >
            <MapMarker
                position={{
                    lat: latitude,
                    lng: longitude,
                }}
            ></MapMarker>
        </Map>
    );
};
export default KakaoMap;
