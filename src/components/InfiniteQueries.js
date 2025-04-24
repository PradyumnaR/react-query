import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const fetchFruits = ({ pageParam }) => {
  return axios.get(`http://localhost:4000/fruits?_limit=10&_page=${pageParam}`);
};

function InfiniteQueries() {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["fruits"],
    queryFn: ({ pageParam }) => fetchFruits({ pageParam }),
    initialPageParam: 1,
    getNextPageParam: (_lastPage, allPages) => {
      //20 items
      //5 pages
      if (allPages.length < 5) {
        return allPages.length + 1;
      } else {
        return undefined;
      }
    },
  });

  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (isLoading) {
    return <div>Page is loading...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div className='container'>
      {data?.pages.map((page) => {
        return page?.data.map((fruit) => {
          return (
            <div className='fruit-item' key={fruit.id}>
              {fruit.name}
            </div>
          );
        });
      })}
      {/* <button onClick={fetchNextPage} disabled={!hasNextPage}>
        load more
      </button> */}
      <div ref={ref}>{isFetchingNextPage && "Loading..."}</div>
    </div>
  );
}

export default InfiniteQueries;
