import React from 'react';

const LIMIT = 10;

/**
 * @template T
 * @typedef {object} ReturnValues
 * @property {Array<T>} data
 * @property {Error | null} error
 * @property {boolean} isLoading
 * @property {() => Promise<void>} fetchMore
 */

/**
 * @template T
 * @param {string} apiPath
 * @param {(apiPath: string) => Promise<T[]>} fetcher
 * @param {{limit: number, offset: number}} opts
 * @returns {ReturnValues<T>}
 */
export function useInfiniteFetch(apiPath, fetcher, { limit = LIMIT, offset = 0 } = {}) {
  const internalRef = React.useRef({ isLoading: false, offset });

  const [result, setResult] = React.useState({
    data: [],
    error: null,
    isLoading: true,
  });

  const fetchMore = React.useCallback(async () => {
    const { isLoading, offset } = internalRef.current;
    if (isLoading) {
      return;
    }

    setResult((cur) => ({
      ...cur,
      isLoading: true,
    }));
    internalRef.current = {
      isLoading: true,
      offset,
    };

    try {
      const allData = await fetcher(`${apiPath}?limit=${limit}&offset=${offset}`);

      setResult((cur) => ({
        ...cur,
        data: [...cur.data, ...allData.slice(0, limit)],
        isLoading: false,
      }));
      internalRef.current = {
        isLoading: false,
        offset: offset + limit,
      };
    } catch (error) {
      setResult((cur) => ({
        ...cur,
        error,
        isLoading: false,
      }));
      internalRef.current = {
        isLoading: false,
        offset,
      };
    }
  }, [apiPath]);

  React.useEffect(() => {
    setResult(() => ({
      data: [],
      error: null,
      isLoading: true,
    }));
    internalRef.current = {
      isLoading: false,
      offset: 0,
    };

    fetchMore();
  }, [fetchMore]);

  return {
    ...result,
    fetchMore,
  };
}
