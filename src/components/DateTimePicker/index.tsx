import { useState } from 'react';
import { DateTimePickerStyled } from './styled';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSwipeable } from 'react-swipeable';


const DateTimePicker = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [startTime, setStartTime] = useState<number | null>(null);
    const [endTime, setEndTime] = useState<number | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const timeSlots = Array.from({ length: 24 }, (_, i) => i);

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
                minDate={new Date()}
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                inline
            />
            <div className="time-select">
                {timeSlots.map((time, index) => (
                    <div
                        key={index}
                        className={`time-slot ${
                            isSelected(index) ? 'selected' : 'unselected'
                        }`}
                        onClick={() => handleTimeClick(index)}
                    >
                        {`${time}시`}
                    </div>
                ))}
            </div>
        </DateTimePickerStyled>
    );
};
export default DateTimePicker;
