import ItemDetail from '@/components/ItemDetail';
import { GetServerSideProps } from 'next';
import { Space } from '@/types';
import { getSpace } from '../api/spaceApi';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };

  const response = await getSpace();
  const spaceItem = response?.data?.find(
    (item: Space) => item.id.toString() === id
  );
  if (!spaceItem) {
    return { notFound: true };
  }
  return {
    props: {
      space: spaceItem,
    },
  };
};
interface SpaceDetailProps {
  space: Space;
}

const spacedetail = ({ space }: SpaceDetailProps) => {
  return <ItemDetail space={space} />;
};
export default spacedetail;
