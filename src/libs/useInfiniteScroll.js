import { useState, useEffect } from 'react';

const useInfiniteScroll = (callback) => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) {
      return;
    }
    callback();
  }, [isFetching]);


  // const handleScroll = useCallback(debounce(() => {
  //   if (isFetching) return;
  //   setIsFetching(true);
  // }, 1000), []);

  const handleScroll = () => {
    if (isFetching) return;
    setIsFetching(true);
  }

  return [isFetching, setIsFetching];
};

export default useInfiniteScroll;