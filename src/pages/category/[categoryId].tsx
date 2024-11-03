import SpaceList from '@/components/SpaceList';
import { useRouter } from 'next/router';

const CategoryPage = () => {
  const router = useRouter();
  const { categoryId } = router.query;
  if (!categoryId) return null; // categoryId가 없을 때 로딩 처리

  return <SpaceList categoryId={parseInt(categoryId as string, 10)} />;
};
export default CategoryPage;
