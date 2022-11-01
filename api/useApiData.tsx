import { useState, useEffect } from "react";
import axios from "axios";

const useApiData = (url: string) => {
  const [data, setData] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(url)
        .then(response => {
          setIsLoaded(true);
          setData(response.data.records);
        })
        .catch(error => {
          console.log(error)
        });
    };
    fetchData();
  }, [url]);

  return { isLoaded, data };
};

export default useApiData;