import { useEffect, useState } from 'react';
import { DateTimePickerStyled } from './styled';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { format } from 'date-fns';
import { getBooking } from '@/pages/api/bookingApi';
import { message } from 'antd';

interface DateTimePickerProps {
  businessStartTime: number;
  businessEndTime: number;
  price: number;
  spaceId: number;
  cleanTime: number;
  onTimeSelect: (
    totalTime: number,
    startTime: number,
    endTime: number,
    selectedDate: string
  ) => void;
  onDateSelect?: (date: Date | null) => void; // 선택한 날짜를 처리할 선택적 콜백
}
const DateTimePicker = ({
  businessEndTime,
  businessStartTime,
  price,
  spaceId,
  onTimeSelect,
  onDateSelect, // 부모로부터 받은 onDateSelect 콜백
}: DateTimePickerProps) => {
  //사용자가 선택한 날짜 저장하는 상태
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  //예약 시작시간의 인덱스
  const [startTime, setStartTime] = useState<number | null>(null);
  //예약 종료시간 인덱스
  const [endTime, setEndTime] = useState<number | null>(null);
  //예약된 시간 상태
  const [bookingTime, setBookingTime] = useState<
    { startTime: number; endTime: number }[]
  >([]);

  const [openDatePicker, setOpenDatePicker] = useState(false);

  // console.log(businessEndTime, businessStartTime, '비즈니스타임');
  const fetchBookingTime = async (spaceId: number, formattedDate: string) => {
    try {
      const response = await getBooking(spaceId, formattedDate);
      console.log(response.data, '리스펀스');
      console.log(selectedDate, '셀렉데이트');
      setBookingTime(response.data);
    } catch (error) {
      console.error('예약 시간 조회 실패', error);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      const formattedDate = format(selectedDate, 'yyyy-MM-dd');
      fetchBookingTime(spaceId, formattedDate);
    }
  }, [selectedDate, spaceId]);

  //업체의 오픈시간부터 마감시간까지의 시간대를 배열로 만듬
  const timeSlots = Array.from(
    { length: businessEndTime - businessStartTime },
    (_, i) => businessStartTime + i
  );

  useEffect(() => {
    if (startTime !== null && selectedDate !== null) {
      //endTime이 null이면 finalEndTime을 startTime으로 지정
      //한시간을 예약가능하게 하기위해
      const finalEndTime = endTime ?? startTime;
      const formattedDate = format(selectedDate, 'yyyy-MM-dd'); // 날짜 포맷

      onTimeSelect(
        finalEndTime - startTime + 1, //총 시간
        businessStartTime + startTime, //시작시간
        businessStartTime + finalEndTime, //종료시간
        formattedDate // 예약 날짜
      );
    }
  }, [startTime, endTime, selectedDate, onTimeSelect]);

  //시간 슬롯 클릭이벤트
  const handleTimeClick = (index: number) => {
    if (!selectedDate) {
      setOpenDatePicker(true); // DatePicker 열기
      message.warning('날짜를 먼저 선택해주세요.');
      return;
    }
    if (startTime === null) {
      setStartTime(index);
      setEndTime(null);
      //end값이 null일때
    } else if (startTime !== null && endTime === null) {
      //시작 시간 이후를 클릭하면 종료시간 설정
      if (index > startTime) {
        setEndTime(index);
        //index < startTime or index = startTime
      } else {
        setStartTime(index);
        setEndTime(null);
      }
      //종료시간이 설정된 상태에서 새로 선택할때 시작시간 초기화
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

  //예약된 시간과 현재 슬롯 비교하기
  const isBooking = (index: number) => {
    return bookingTime.some((booking) => {
      const startIndex = booking.startTime - businessEndTime;
      const endIndex = booking.endTime - businessStartTime;
      // console.log(startIndex, endIndex, '슬롯비교');
      return index >= startIndex && index <= endIndex;
    });
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setOpenDatePicker(false); // 날짜 선택 후 DatePicker 닫기

    // 시간 초기화
    setStartTime(null);
    setEndTime(null);

    // 부모로부터 받은 onDateSelect 콜백 호출
    if (onDateSelect) {
      onDateSelect(date);
    }
  };

  return (
    <DateTimePickerStyled>
      <DatePicker
        dateFormat="yyyy.MM.dd"
        selected={selectedDate}
        placeholderText="날짜를 선택해주세요"
        className="custom-datepicker"
        minDate={new Date()}
        onChange={handleDateChange}
        open={openDatePicker}
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
              , {endTime !== null ? endTime - startTime + 1 : 1} 시간
            </p>
          </div>
        )}
      </div>
      <div className="swiper-container">
        <Swiper
          spaceBetween={0}
          slidesPerView={2}
          pagination={{ clickable: true }}
        >
          {timeSlots.map((time, index) => (
            <SwiperSlide key={index}>
              <div key={index}>
                <div className="time-boundary">{`${time}:00`} </div>
                <div
                  className={`time-slot ${
                    isSelected(index) ? 'selected' : 'unselected'
                  } ${isBooking(index) ? 'booked' : ''}`}
                  onClick={() => handleTimeClick(index)}
                >
                  <div className="price">{price.toLocaleString()}원</div>
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
