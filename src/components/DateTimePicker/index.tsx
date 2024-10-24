import { useState } from 'react';
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
}
const DateTimePicker: React.FC<DateTimePickerProps> = ({
    businessEndTime,
    businessStartTime,
    price,
}) => {
    //사용자가 선택한 날짜 저장하는 상태 
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    //시작시간 저장하는 상태
    const [startTime, setStartTime] = useState<number | null>(null);
    //종료시간 저장하는 상태
    const [endTime, setEndTime] = useState<number | null>(null);

    //업체의 오픈시간부터 마감시간까지의 시간슬롯을 배열로 만듬
    const timeSlots = Array.from(
        { length: businessEndTime - businessStartTime + 1 },
        (_, i) => businessStartTime + i
    );

    //시간 슬롯 클릭이벤트
    const handleTimeClick = (index: number) => {
        //시작시간이 선택되지 않았거나, 종료시간이 선택된경우 시작시간 설정하고 종료시간 초기화
        if (startTime === null || (startTime !== null && endTime !== null)) {
            setStartTime(index);
            setEndTime(null);
            //이미 시작시간이 선택된 경우 종료시간 설정
        } else {
            setEndTime(index);
        }
    };

    //특정 시간 슬롯이 선택된 상태인지 확인하는 함수
    const isSelected = (index: number) => {
        if (startTime !== null && endTime !== null) {
            return index >= startTime && index <= endTime;
        }
        if (startTime !== null) {
            return index === startTime;
        }
        return false;
    };

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
            <p className="time-select-title">시간선택</p>
            <div className="swiper-container">
                <Swiper
                    spaceBetween={0}
                    slidesPerView={5}
                    pagination={{ clickable: true }}
                >
                    {timeSlots.map((time, index) => (
                        <SwiperSlide key={index}>
                            <div
                                className={`time-slot ${
                                    isSelected(index)
                                        ? 'selected'
                                        : 'unselected'
                                }`}
                                onClick={() => handleTimeClick(index)}
                            >
                                {`${time}:00`}
                                <div className="price">
                                    {price.toLocaleString()}원
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
