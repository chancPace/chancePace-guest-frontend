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
import { start } from 'repl';

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
  onDateSelect?: (date: Date | null) => void;
}
const DateTimePicker = ({
  businessEndTime,
  businessStartTime,
  price,
  spaceId,
  cleanTime,
  onTimeSelect,
  onDateSelect,
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
  const currentHour = new Date().getHours();

  //업체의 오픈시간부터 마감시간까지의 시간대를 배열로 만듬
  const timeSlots = Array.from(
    { length: businessEndTime - businessStartTime },
    (_, i) => businessStartTime + i
  );

  //시간 슬롯 클릭이벤트
  const handleTimeClick = (index: number) => {
    if (!selectedDate) {
      message.warning('날짜를 먼저 선택해주세요.');
      return;
    }
    if (startTime === null) {
      // 첫 번째 클릭 시: startTime만 설정하고, endTime은 null로 둠
      setStartTime(index);
      setEndTime(null);
    } else if (startTime !== null && endTime === null) {
      // 두 번째 클릭 시: endTime 설정
      if (index > startTime) {
        setEndTime(index); // index가 startTime보다 크면 endTime을 설정
      } else {
        // index가 startTime보다 작으면 startTime을 새로 설정하고 endTime은 null로 유지
        setStartTime(index);
        setEndTime(null);
      }
    } else {
      // 세 번째 클릭 시: 새로운 startTime을 설정하고 endTime은 null로 초기화
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

  //이용시간 (기본1시간으로 설정)
  const useTime =
    startTime !== null && endTime !== null
      ? endTime - startTime + 1
      : startTime !== null
      ? 1
      : 0;

  //시작시간
  //??연산자 왼쪽같이 null또는 undefinde일 경우에만 오른쪽 값 반환
  //startTime이 없을경우 useStartTime = businessStartTime
  const useStartTime = businessStartTime + (startTime ?? 0);

  //종료시간
  //기본값은 영업시작시간
  //endTime이 있을경우 인덱스 + 1값
  const useEndTime =
    endTime !== null
      ? businessStartTime + endTime + 1
      : startTime !== null
      ? businessStartTime + startTime + 1
      : businessStartTime + 1;

  useEffect(() => {
    if (startTime !== null && selectedDate !== null) {
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

  //해당 공간의 예약데이터 가져오는 함수
  const fetchBookingTime = async (spaceId: number, formattedDate: string) => {
    try {
      const response = await getBooking(spaceId, formattedDate);
      console.log(response, 'fltmvjstm');
      setBookingTime(response.data);
    } catch (error) {
      console.error('예약 시간 조회 실패', error);
    }
  };

  //날짜를 지정하면 일정 형식으로 변환시켜서 예약데이터 가져오는 함수에 값을 넘겨줌
  useEffect(() => {
    if (selectedDate) {
      const formattedDate = format(selectedDate, 'yyyy-MM-dd');
      fetchBookingTime(spaceId, formattedDate);
    }
  }, [selectedDate, spaceId]);

  //예약된 시간과 현재 슬롯 비교하기
  const isBooking = (index: number) => {
    return bookingTime.some((booking) => {
      const startIndex = booking.startTime - businessStartTime;
      const endIndex =
        startIndex + (booking.endTime - booking.startTime) - 1 + cleanTime;
      return index >= startIndex && index <= endIndex;
    });
  };

  //Am,Pm표시하기
  const getAmPm = (time: number) => {
    if (time >= 0 && time <= 11) return 'AM';
    if (time >= 12 && time <= 23) return 'PM';
    return '';
  };

  //지난시간 확인하는법
  const isPastTime = (time: number) => {
    if (!selectedDate) return false;
    const isToday =
      format(selectedDate, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd');
    return isToday && time <= currentHour;
  };

  //날짜 선택할때
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
              {`${useStartTime}:00`} ~ {`${useEndTime}:00`}, {useTime} 시간
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
                  <p className="time">
                    {index === 0 ||
                    getAmPm(time) !== getAmPm(timeSlots[index - 1])
                      ? `${getAmPm(time)} ${time}`
                      : time}
                  </p>
                </div>
                <div
                  className={`time-slot ${
                    isSelected(index) ? 'selected' : 'unselected'
                  } ${isBooking(index) || isPastTime(time) ? 'booked' : ''}`}
                  onClick={() => handleTimeClick(index)}
                >
                  <div className="price">{price.toLocaleString()}</div>
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
