import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';

export default function External() {
  const router = useRouter();
  const { ref } = router.query;

  const fetchMyAPI = useCallback(async () => {
    if (ref) {
      await fetch(`/api/referrer?ref=${ref}`);
    }
  }, [ref]);

  useEffect(() => {
    fetchMyAPI();
  }, [fetchMyAPI]);

  return null;
}
