import { useCallback, useState, useEffect } from 'react';
import { debounce } from 'lodash';

const useInfiniteScroll = (callback) => {
  const [isFetching, setIsFetching] = useState(false);
  const [ticking, setTicking] = useState(false);
  const [scrollDir, setScrollDir] = useState("SCROLL_DOWN");
  const threshold = 0;
  let lastScrollY = window.pageYOffset;

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollDir]);

  const updateScrollDir = () => {
    const scrollY = window.pageYOffset;

    if (Math.abs(scrollY - lastScrollY) < threshold) {
      setTicking(false);
      return;
    }
    setScrollDir(scrollY > lastScrollY ? "SCROLL_DOWN" : "SCROLL_UP");
    lastScrollY = scrollY > 0 ? scrollY : 0;
    setTicking(false);
  };

  useEffect(() => {
    if (!isFetching) {
      return;
    }
    callback();
  }, [isFetching]);


  const handleScroll = useCallback(debounce(() => {
    if (!ticking) {
      window.requestAnimationFrame(updateScrollDir);
      setTicking(true);
    }

    if (isFetching || scrollDir === "SCROLL_UP") return;
    setIsFetching(true);
  }, 1000), []);

  // const handleScroll = () => {
  //   if (isFetching) return;
  //   setIsFetching(true);
  // }
  return [isFetching, setIsFetching];
};

export default useInfiniteScroll;