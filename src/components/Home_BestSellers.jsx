import {  useEffect, useState } from "react";
import { Link } from "react-router";
import { getAllProductsApi } from "../services/products";
import { currency } from "../utils/filter";
import "../styles/Home_BestSellers.css";

export default function Home_BestSellers() {
  const [starProducts, setStarProducts] = useState([]);

  // const getStarProducts = useCallback(async () => {
  //   try {
  //     const res = await getAllProductsApi();
  //     const result = res.data.products.filter((item) => item.star === true);
  //     setStarProducts(result);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);

  // useEffect(() => {
  //   getStarProducts();
  // }, [getStarProducts]);
  useEffect(() => {
    async function getStarProducts() {
      try {
        const res = await getAllProductsApi();
        const result = res.data.products.filter((item) => item.star === true);
        setStarProducts(result);
      } catch (error) {
        console.log(error);
      }
    }
    getStarProducts();
  }, []);

  return (
    <section className="home-best-sellers kging-section">
      <div className="container">
        <div className="kging-section-heading text-center home-best-sellers-heading">
          <p className="kging-section-label">BEST SELLERS</p>
          <h2 className="kging-section-title">熱銷商品</h2>
          <p className="kging-section-desc mx-auto">
            最多人選購的人氣商品，快速找到你的日常補給
          </p>
        </div>

        <div className="row g-4">
          {starProducts.map((product) => (
            <div className="col-12 col-sm-6 col-lg-3" key={product.id}>
              <Link
                to={`/product/${product.id}`}
                className="home-best-link text-decoration-none"
              >
                <div className="kging-card h-100 home-best-card">
                  <div className="kging-product-image-wrap">
                    <img
                      src={product.imageUrl}
                      className="kging-product-image"
                      alt={product.title}
                    />
                    <span className="kging-badge home-best-badge">Hot</span>
                    <div className="home-best-overlay"></div>
                  </div>

                  <div className="kging-card-body d-flex flex-column">
                    <p className="kging-product-category mb-2">
                      {product.category || "KGING"}
                    </p>

                    <h3 className="kging-product-title home-best-title">
                      {product.title}
                    </h3>

                    <p className="kging-product-text home-best-desc">
                      {product.description ||
                        "Premium sports nutrition and fitness essentials."}
                    </p>

                    <div className="home-best-footer mt-auto">
                      <p className="kging-product-price mb-0">
                        NT$ {currency(product.price)}
                      </p>

                      <span className="kging-btn kging-btn-primary home-best-btn">
                        查看商品
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {starProducts.length === 0 && (
          <div className="kging-card home-best-empty text-center">
            <h3 className="mb-3">目前尚無熱銷商品</h3>
            <p className="mb-0">請稍後再回來看看最新人氣商品。</p>
          </div>
        )}
      </div>
    </section>
  );
}
