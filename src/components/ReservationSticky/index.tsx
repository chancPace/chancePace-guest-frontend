import { useState } from 'react';
import { ReservationStickyStyled } from './styled';
import DateTimePicker from '../DateTimePicker';


interface PaymentStickyProps {
    price: number;
    businessEndTime:number;
    businessStartTime:number;
}
const PaymentSticky: React.FC<PaymentStickyProps> = ({ price, businessEndTime,businessStartTime }) => {

    return (
        <ReservationStickyStyled>
            <p>
                <span>{price.toLocaleString()}원</span> / 시간
            </p>
            <DateTimePicker businessStartTime={businessStartTime}
            businessEndTime={businessEndTime}
            price={price}
            />
        </ReservationStickyStyled>
    );
};
export default PaymentSticky;
