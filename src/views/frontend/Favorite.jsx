import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getAllProductsApi } from "../../services/products";
import { getFavorites, toggleFavorite } from "../../utils/favorite";
import { currency } from "../../utils/filter";
import LoadingOverlay from "../../components/LoadingOverlay";

function Favorite() {
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const getFavoriteProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const favorites = getFavorites();
      setFavoriteIds(favorites);

      if (favorites.length === 0) {
        setFavoriteProducts([]);
        return;
      }

      const res = await getAllProductsApi();
      const allProducts = res.data.products;

      const result = allProducts.filter((product) =>
        favorites.includes(String(product.id)),
      );

      setFavoriteProducts(result);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getFavoriteProducts();
  }, [getFavoriteProducts]);

  function handleViewDetail(e, id) {
    e.preventDefault();
    navigate(`/product/${id}`);
  }

  function handleRemoveFavorite(e, productId) {
    e.preventDefault();
    e.stopPropagation();

    const updatedFavorites = toggleFavorite(productId);
    setFavoriteIds(updatedFavorites);

    setFavoriteProducts((prev) =>
      prev.filter((item) => String(item.id) !== String(productId)),
    );
  }

  return (
    <>
      <div
        className={`kging-page-loading-content ${isLoading ? "is-loading" : ""}`}
      >
        <div className="kging-page">
          <section className="products-hero">
            <div className="container text-center">
              <div className="kging-section-heading mb-0">
                <p className="kging-section-label">MY FAVORITES</p>
                <h1 className="kging-section-title">Favorite Products</h1>
                <p className="kging-section-desc mx-auto">
                  Keep track of the products you love and revisit them anytime.
                </p>
              </div>
            </div>
          </section>

          <section className="kging-section">
            <div className="container">
              <div className="products-toolbar">
                <div>
                  <p className="kging-section-label mb-2">WISHLIST</p>
                  <h2 className="kging-section-title mb-0">我的最愛</h2>
                </div>
                <div className="products-count">
                  {favoriteProducts.length} 項商品
                </div>
              </div>

              {favoriteProducts.length === 0 ? (
                <div className="kging-card products-empty-state text-center">
                  <h3 className="mb-3">目前還沒有收藏商品</h3>
                  <p className="mb-4">
                    先去商品頁逛逛，把喜歡的商品加入我的最愛吧。
                  </p>
                  <button
                    type="button"
                    className="kging-btn kging-btn-primary"
                    onClick={() => navigate("/product")}
                  >
                    前往商品頁
                  </button>
                </div>
              ) : (
                <div className="row g-4">
                  {favoriteProducts.map((item) => {
                    const isFavorite = favoriteIds.includes(String(item.id));

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
                              onClick={(e) => handleRemoveFavorite(e, item.id)}
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
                                className="products-title-link"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handleViewDetail(e, item.id);
                                }}
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
              )}
            </div>
          </section>
        </div>
      </div>
      <LoadingOverlay
        isOpen={isLoading}
        eyebrow="KGING PROCESSING"
        title="資料處理中"
        text="正在同步你的追蹤商品資訊，請稍候。"
      />
    </>
  );
}

export default Favorite;
