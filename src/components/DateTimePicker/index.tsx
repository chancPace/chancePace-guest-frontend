import { useRef, useState } from 'react';
import { DateTimePickerStyled } from './styled';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import {
    IoMdArrowDropleftCircle,
    IoMdArrowDroprightCircle,
} from 'react-icons/io';
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
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [endTime, setEndTime] = useState<number | null>(null);

    const timeSlots = Array.from(
        { length: businessEndTime - businessStartTime + 1 },
        (_, i) => businessStartTime + i
    );

    const handleTimeClick = (index: number) => {
        if (startTime === null || (startTime !== null && endTime !== null)) {
            setStartTime(index);
            setEndTime(null);
        } else {
            setEndTime(index);
        }
    };

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
            <div className="swiper-container">
                <Swiper
                    modules={[A11y, Navigation]}
                    spaceBetween={0}
                    slidesPerView={5}
                    navigation={{
                        prevEl: '.custom-prev', // 이전 버튼 커스텀
                        nextEl: '.custom-next', // 다음 버튼 커스텀
                    }}
                    pagination={{ clickable: true }}
                    scrollbar={{ draggable: true }}
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
                            </div>
                            <div className="price">
                                {price.toLocaleString()}원
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <button className="custom-prev">
                    <IoMdArrowDropleftCircle />
                </button>
                <button className="custom-next">
                    <IoMdArrowDroprightCircle />
                </button>
            </div>
        </DateTimePickerStyled>
    );
};
export default DateTimePicker;
