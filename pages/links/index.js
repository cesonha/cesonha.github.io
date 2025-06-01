import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Links() {
  const router = useRouter();
  
  useEffect(() => {
    router.push('/links/music');
  }, [router]);
  
  return null;
}
