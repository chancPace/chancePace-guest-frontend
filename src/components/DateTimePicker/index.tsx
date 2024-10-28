import { useEffect, useState } from 'react';
import { DateTimePickerStyled } from './styled';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
interface DateTimePickerProps {
    businessStartTime: number;
    businessEndTime: number;
    price: number;
    onTimeSelect: (totalTime: number) => void;
}
const DateTimePicker: React.FC<DateTimePickerProps> = ({
    businessEndTime,
    businessStartTime,
    price,
    onTimeSelect,
}) => {
    //사용자가 선택한 날짜 저장하는 상태
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    //시작시간 저장하는 상태
    const [startTime, setStartTime] = useState<number | null>(null);
    //종료시간 저장하는 상태
    const [endTime, setEndTime] = useState<number | null>(null);
    // const [totalTime, setTotalTime] = useState<number>(1);
    // const [totalPrice, setTotalPrice] = useState<number>(price);

    //업체의 오픈시간부터 마감시간까지의 시간슬롯을 배열로 만듬
    const timeSlots = Array.from(
        { length: businessEndTime - businessStartTime + 1 },
        (_, i) => businessStartTime + i
    );

    useEffect(() => {
        const calculatedTime =
            startTime !== null && endTime !== null
                ? endTime - startTime + 1
                : 1;


        // setTotalTime(calculatedTime);
        // setTotalPrice(calculatedPrice);
        onTimeSelect(calculatedTime);
    }, [startTime, endTime, onTimeSelect]);

    //시간 슬롯 클릭이벤트
    const handleTimeClick = (index: number) => {
        if (startTime === null) {
            setStartTime(index);
            // setEndTime(index);
            //시작시간이 설정된 경우
            setEndTime(null); // 초기 클릭 시 endTime을 초기화
        } else if (startTime !== null && endTime === null) {
            //시작 시간 이후를 클릭하면 종료시간 설정
            if (index > startTime) {
                setEndTime(index);
            } else {
                setStartTime(index);
                setEndTime(null);
            }
        } else {
            setStartTime(index);
            setEndTime(null);
        }
    };

    //특정 시간 슬롯이 선택된 상태인지 확인하는 함수
    const isSelected = (index: number) => {
        if (startTime !== null) {
            if (endTime !== null) {
                return index >= startTime && index <= endTime;
            }
            return index === startTime;
        }
        return false;
    };

    // const getTotalTime = () => {
    //     if (startTime !== null && endTime !== null) {
    //         return endTime - startTime + 1;
    //     }
    //     return 1;
    // };

    return (
        <DateTimePickerStyled>
            <DatePicker
                dateFormat="yyyy.MM.dd"
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                placeholderText="날짜를 선택해주세요"
                className="custom-datepicker"
                minDate={new Date()} // 오늘 이전 날짜는 선택 불가
            />

            <div className="time-select-title">
                <p>시간선택</p>
                {startTime !== null && (
                    <div className="selected-time-info">
                        <p>
                            {`${businessStartTime + startTime}:00`} ~{' '}
                            {endTime !== null
                                ? `${businessStartTime + endTime + 1}:00`
                                : `${businessStartTime + startTime + 1}:00`}
                            , {endTime !== null ? endTime - startTime + 1 : 1}
                            시간
                        </p>
                    </div>
                )}
            </div>
            <div className="swiper-container">
                <Swiper
                    spaceBetween={0}
                    slidesPerView={5}
                    pagination={{ clickable: true }}
                >
                    {timeSlots.map((time, index) => (
                        <SwiperSlide key={index}>
                            <div key={index}>
                                {/* 시간 표시 부분 */}
                                <div className="time-boundary">{`${time}`}</div>
                                {/* 시간 슬롯과 금액 표시 */}
                                <div
                                    className={`time-slot ${
                                        isSelected(index)
                                            ? 'selected'
                                            : 'unselected'
                                    }`}
                                    onClick={() => handleTimeClick(index)}
                                >
                                    <div className="price">
                                        {price.toLocaleString()}원
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </DateTimePickerStyled>
    );
};
export default DateTimePicker;
