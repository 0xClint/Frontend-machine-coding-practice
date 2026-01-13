import { useEffect, useState } from "react";
import "./InfiniteScroll.css";

const LIMIT = 10;

export const InfiniteScroll = () => {
  const [pageIdx, setPageIdx] = useState(0)

  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await fetch(
        `https://dummyjson.com/products?limit=${LIMIT}&skip=${LIMIT * pageIdx}`
      );

      if (!res.ok) return;

      const result = await res.json();
      console.log(result);
      setData((prev) => [...prev, ...result.products]);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageIdx]);

  useEffect(() => {
    const lastCardItem = document.querySelector(".card-item:last-child");
    const observer = new IntersectionObserver(
      (params) => {
        const { isIntersecting } = params[0];
        console.log(isIntersecting);
        if (isIntersecting) {
          setPageIdx((prev) => prev + 1);
          observer.unobserve(lastCardItem);
        }
      },
      { threshold: 0.5 }
    );
    if (lastCardItem) observer.observe(lastCardItem);

    return () => {
      if (lastCardItem) observer.unobserve(lastCardItem);
      observer.disconnect();
    };
  }, [setPageIdx, data]);
  console.log(data);

  return (
    <div>
      <h2>InfiniteScroll</h2>
      <div className="container">
        {data.map(({ title, thumbnail, id }) => (
          <div key={id} className="card-item">
            <img src={thumbnail} />
            <p>{title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
