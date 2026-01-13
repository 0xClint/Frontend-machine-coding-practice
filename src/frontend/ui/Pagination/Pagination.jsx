import { useEffect, useState } from "react";
import "./Pagination.css";

const PRODUCT_LIMIT = 15;
export const Pagination = () => {
  const [products, setProducts] = useState([]);
  const [currentPageIdx, setCurrentPageIdx] = useState(0);
  const [totalProductCount, setTotalProductCount] = useState(0);

  const handlPageSelect = (event) => {
    const pageAction = event.target.getAttribute("page-action");
    console.log(pageAction);

    switch (pageAction) {
      case "left": {
        setCurrentPageIdx((prev) => Math.max(0, prev - 1));
        return;
      }
      case "right": {
        setCurrentPageIdx((prev) =>
          Math.min(Math.floor(totalProductCount / PRODUCT_LIMIT), prev + 1)
        );
        return;
      }
      default: {
        const num = parseInt(pageAction);
        if (!isNaN(num)) {
          setCurrentPageIdx(num);
        }
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://dummyjson.com/products?limit=${PRODUCT_LIMIT}&skip=${currentPageIdx*PRODUCT_LIMIT}`
        );
        if (!res.ok) return;

        const result = await res.json();
        console.log(result);
        setTotalProductCount(result.total);
        setProducts(result.products);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, [currentPageIdx]);
  return (
    <div>
      <h2>Pagination</h2>

      <div className="pagination">
        <div className="product-container">
          {products.map(({ title, id, thumbnail }) => (
            <div key={id}>
              <img src={thumbnail} />
              <p>{title}</p>
            </div>
          ))}
        </div>
        <div className="pagination-container" onClick={handlPageSelect}>
          <button page-action="left">Prev</button>
          <div className="page-number-btn-container">
            {[
              ...Array(Math.floor(totalProductCount / PRODUCT_LIMIT)).keys(),
            ].map((index) => (
              <button key={index} page-action={index}>{index}</button>
            ))}
          </div>
          <button page-action="right">Next</button>
        </div>
      </div>
    </div>
  );
};
