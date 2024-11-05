import BookingDetail from '@/components/BookingDetail';
import { useRouter } from 'next/router';

const booking = () => {
  const router = useRouter();
  const { id } = router.query;
  if (!id) return <p>로딩 중...</p>;
  return <BookingDetail bookingId={Number(id)} />;
};
export default booking;
