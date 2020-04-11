// Dependencies
import { useState } from 'react';

const useFetch = (path, opts = {}) => {
  const [response, setResponse] = useState({
    data: {},
    loading: true,
    error: false,
    success: false,
  });

  const handleFetch = async () => {
    setResponse({
      data: {},
      loading: true,
      error: false,
      success: false,
    });

    try {
      let apiResponse = await fetch(path, opts).then((res) => res.json());
      setResponse({
        data: apiResponse,
        loading: false,
        error: false,
        success: true,
      });
    } catch (e) {
      setResponse({
        data: e,
        error: true,
        loading: false,
        success: false,
      });
    }
  };

  return [response, handleFetch];
};

export default useFetch;
