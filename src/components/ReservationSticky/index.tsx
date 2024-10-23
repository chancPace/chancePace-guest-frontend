import { useState } from 'react';
import { ReservationStickyStyled } from './styled';
import DateTimePicker from '../DateTimePicker';


interface PaymentStickyProps {
    price: number;
}
const PaymentSticky: React.FC<PaymentStickyProps> = ({ price }) => {




 

    return (
        <ReservationStickyStyled>
            <p>
                <span>{price}원</span>/시간
            </p>
            <DateTimePicker />
        </ReservationStickyStyled>
    );
};
export default PaymentSticky;
