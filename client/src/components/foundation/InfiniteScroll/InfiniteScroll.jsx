import React from 'react';

/**
 * @typedef {object} Props
 * @property {React.ReactNode} children
 * @property {() => void} fetchMore
 */

/** @type {React.VFC<Props>} */
const InfiniteScroll = ({ children, fetchMore }) => {
  const prevReachedRef = React.useRef(true);

  React.useEffect(() => {
    const handler = () => {
      const hasReached = window.innerHeight + Math.ceil(window.scrollY) >= document.body.offsetHeight;
      // 画面最下部にスクロールしたタイミングで、登録したハンドラを呼び出す
      if (hasReached && !prevReachedRef.current) {
        fetchMore();
      }

      prevReachedRef.current = hasReached;
    };

    document.addEventListener('scroll', handler, { passive: true });
    return () => {
      document.removeEventListener('scroll', handler);
    };
  }, [fetchMore]);

  return <>{children}</>;
};

export { InfiniteScroll };
