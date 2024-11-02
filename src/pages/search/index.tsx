import SpaceList from '@/components/SpaceList';
import { useRouter } from 'next/router';

const Search = () => {
  const router = useRouter();
  const { query } = router.query;

  return <>{query && <SpaceList query={query as string} />}</>;
};
export default Search;
