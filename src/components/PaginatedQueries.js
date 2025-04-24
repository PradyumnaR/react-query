import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

const fetchFruits = (page) => {
  return axios.get(`http://localhost:4000/fruits?_limit=4&_page=${page}`);
};

function PaginatedQueries() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["fruits", page],
    queryFn: () => fetchFruits(page),
    placeholderData: keepPreviousData,
  });

  if (isLoading) {
    return <div>Page is loading...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div className='post-details-container'>
      {data?.data.map((fruit) => (
        <div className='fruit-label' key={fruit.id}>
          {fruit.name}
        </div>
      ))}
      <button
        onClick={() => setPage((prev) => prev - 1)}
        disabled={page == 0 ? true : false}
      >
        Prev Page
      </button>
      <button
        onClick={() => setPage((prev) => prev + 1)}
        disabled={page == 4 ? true : false}
      >
        Next Page
      </button>
    </div>
  );
}
export default PaginatedQueries;
