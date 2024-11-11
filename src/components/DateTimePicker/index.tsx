import { useEffect, useState } from 'react';
import { DateTimePickerStyled } from './styled';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper/modules';
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
  cleanTime,
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

  const today = new Date();
  const currentHour = new Date().getHours(); // 현재 시간의 시간 부분

  //이용시간
  const useTime =
    startTime !== null && endTime !== null ? endTime - startTime + 1 : 1;

  //시작시간
  const useStartTime = businessStartTime + (startTime ?? 0);

  //종료시간
  const useEndTime = businessStartTime + (endTime ?? startTime ?? 0);

  const fetchBookingTime = async (spaceId: number, formattedDate: string) => {
    try {
      const response = await getBooking(spaceId, formattedDate);
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

      onTimeSelect(useTime, useStartTime, useEndTime, formattedDate);
    }
  }, [
    startTime,
    endTime,
    selectedDate,
    useTime,
    useStartTime,
    useEndTime,
    onTimeSelect,
  ]);

  //시간 슬롯 클릭이벤트
  const handleTimeClick = (index: number) => {
    if (!selectedDate) {
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
      const endIndex = booking.endTime - businessStartTime - 1 + cleanTime;
      return index >= startIndex && index <= endIndex;
    });
  };

  const isPastTime = (time: number) => {
    if (!selectedDate) return false;
    const isToday =
      format(selectedDate, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd');
    return isToday && time <= currentHour;
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);

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
      />

      <div className="time-select-title">
        <p>시간선택</p>
        {startTime !== null && (
          <div className="selected-time-info">
            <p>
              {`${useStartTime}:00`} ~ {`${useEndTime + 1}:00`}, {useTime} 시간
            </p>
          </div>
        )}
      </div>
      <div className="swiper-container">
        <Swiper
          spaceBetween={0}
          slidesPerView={5}
          pagination={{ clickable: true }}
          modules={[Scrollbar]}
          scrollbar={{ draggable: true }} 
        >
          {timeSlots.map((time, index) => (
            <SwiperSlide key={index}>
              <div key={index} className="time-select-section">
                <div className="time-boundary">
                  <p className="time">{`${time}`}</p>
                </div>
                <div
                  className={`time-slot ${
                    isSelected(index) ? 'selected' : 'unselected'
                  } ${isBooking(index) || isPastTime(time) ? 'booked' : ''}`}
                  onClick={() => !isPastTime(time) && handleTimeClick(index)}
                >
                  <div className="price">{price.toLocaleString()}원</div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* <div className="price-summary">
        {startTime !== null && (
          <>
            <p>시간당 금액: {price.toLocaleString()}원</p>
            <p>이용 시간: {useTime}</p>
          </>
        )}
      </div> */}
    </DateTimePickerStyled>
  );
};
export default DateTimePicker;
