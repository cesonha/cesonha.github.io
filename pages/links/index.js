import { useRouter, useEffect } from 'next/router';

export default function Links() {
  const router = useRouter();
  
  useEffect(() => {
    router.push('/links/music');
  }, [router]);
  
  return null;
}
