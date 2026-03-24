import { useState, useEffect, useCallback } from "react";
import { currency } from "../../utils/filter";
import { useNavigate, useSearchParams } from "react-router";
import { getAllProductsApi, getProductsApi } from "../../services/products";
import { getFavorites, toggleFavorite } from "../../utils/favorite";
import Pagination from "../../components/Pagination";
import "../../styles/Products.css";
import { set } from "react-hook-form";
import LoadingOverlay from "../../components/LoadingOverlay";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get("category") || "All";

  function handleChangeCategory(e, category) {
    e.preventDefault();
    category === "All" ? setSearchParams({}) : setSearchParams({ category });
  }

  function handleViewDetail(e, id) {
    e.preventDefault();
    navigate(`/product/${id}`);
  }
  function handleToggleFavorite(e, productId) {
    e.preventDefault();
    e.stopPropagation();

    const updatedFavorites = toggleFavorite(productId);
    setFavorites(updatedFavorites);
  }

  const getAllCategories = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getAllProductsApi();
      const result = [
        "All",
        ...new Set(res.data.products.map((item) => item.category)),
      ];
      setCategories(result);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getProducts = useCallback(async (page = 1, category = "All") => {
    setIsLoading(true);
    try {
      const apiCategory = category === "All" ? undefined : category;
      const res = await getProductsApi(page, apiCategory);
      setProducts(res.data.products);
      setPagination(res.data.pagination);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getAllCategories();
  }, [getAllCategories]);

  useEffect(() => {
    getProducts(1, currentCategory);
  }, [currentCategory, getProducts]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  return (
    <>
      <div
        className={`kging-page-loading-content ${isLoading ? "is-loading" : ""}`}
      >
        <div className="kging-page">
          <section className="products-hero">
            <div className="container text-center">
              <div className="kging-section-heading mb-0">
                <p className="kging-section-label">KGING STORE</p>
                <h1 className="kging-section-title">
                  Premium Fitness Products
                </h1>
                <p className="kging-section-desc mx-auto">
                  Discover supplements and training gear built for your daily
                  performance.
                </p>
              </div>
            </div>
          </section>

          <section className="products-category-bar">
            <div className="container">
              <div className="products-category-scroll">
                {categories.map((item) => (
                  <a
                    key={item}
                    href="#"
                    className={`kging-btn kging-btn-ghost ${
                      currentCategory === item ? "active" : ""
                    }`}
                    onClick={(e) => handleChangeCategory(e, item)}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </section>

          <section className="kging-section">
            <div className="container">
              <div className="products-toolbar">
                <div>
                  <p className="kging-section-label mb-2">PRODUCT LIST</p>
                  <h2 className="kging-section-title mb-0">
                    {currentCategory === "All"
                      ? "All Products"
                      : currentCategory}
                  </h2>
                </div>
                <div className="products-count">{products.length} 項商品</div>
              </div>
              <div className="row g-4">
                {products.map((item) => {
                  const isFavorite = favorites.includes(String(item.id));

                  return (
                    <div className="col-6 col-md-4 col-xl-3" key={item.id}>
                      <div
                        className="kging-card kging-product-card h-100"
                        role="button"
                        tabIndex={0}
                        onClick={(e) => handleViewDetail(e, item.id)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            handleViewDetail(e, item.id);
                          }
                        }}
                      >
                        <div className="kging-product-image-wrap products-image-wrap">
                          <img
                            src={item.imageUrl}
                            className="kging-product-image"
                            alt={item.title}
                          />

                          <button
                            type="button"
                            className="products-wishlist-btn"
                            onClick={(e) => handleToggleFavorite(e, item.id)}
                          >
                            <i
                              className={`fa-heart ${
                                isFavorite ? "fas text-danger" : "far"
                              }`}
                            ></i>
                          </button>

                          <span className="kging-badge products-badge">
                            {item.category || "KGING"}
                          </span>
                        </div>

                        <div className="kging-card-body d-flex flex-column">
                          <p className="kging-product-category">
                            {item.category}
                          </p>

                          <h3 className="kging-product-title products-title">
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleViewDetail(e, item.id);
                              }}
                              className="products-title-link"
                            >
                              {item.title}
                            </a>
                          </h3>

                          <p className="kging-product-text products-desc">
                            {item.description ||
                              "Premium sports nutrition and fitness essentials."}
                          </p>

                          <div className="products-footer">
                            <p className="kging-product-price mb-0">
                              NT$ {currency(item.price)}
                            </p>

                            <button
                              type="button"
                              className="kging-btn kging-btn-secondary products-detail-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleViewDetail(e, item.id);
                              }}
                            >
                              View More
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {products.length === 0 && (
                <div className="kging-card products-empty-state text-center">
                  <h3 className="mb-3">No products found</h3>
                  <p className="mb-0">此分類目前尚未有商品</p>
                </div>
              )}

              <div className="mt-5 d-flex justify-content-center">
                <Pagination
                  pagination={pagination}
                  onPageChange={(page) => getProducts(page, currentCategory)}
                />
              </div>
            </div>
          </section>
        </div>
      </div>
      <LoadingOverlay
        isOpen={isLoading}
        eyebrow="KGING PROCESSING"
        title="資料處理中"
        text="正在同步商品資訊，請稍候。"
      />
    </>
  );
};

export default Products;
