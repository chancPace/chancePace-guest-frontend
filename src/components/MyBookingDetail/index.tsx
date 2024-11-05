import { useRouter } from 'next/router';
import { MyBookingDetailStyled } from './styled';
import { useState } from 'react';
import { MyBookingData } from '@/types';

const MyBookingDetail = () => {
  const router = useRouter();
  const { id } = router.query; 
  const [reservationDetails, setReservationDetails] = useState<MyBookingData | null>(null);

  return <MyBookingDetailStyled></MyBookingDetailStyled>;
};
export default MyBookingDetail;
