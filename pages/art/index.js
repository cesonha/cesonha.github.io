import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Art() {
  const router = useRouter();
  
  useEffect(() => {
    router.push('/art/music');
  }, [router]);
  
  return null;
}
