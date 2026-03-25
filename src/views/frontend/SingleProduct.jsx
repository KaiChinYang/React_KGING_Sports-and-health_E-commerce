import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { createAsyncAddCart } from "../../slice/cartSlice";
import { getFavorites, toggleFavorite } from "../../utils/favorite";
import { currency } from "../../utils/filter";
import "../../styles/SingleProduct.css";
import ProductDescription from "../../components/ProductDescription";
import LoadingOverlay from "../../components/LoadingOverlay";
import { getSingleProductsApi } from "../../services/products";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [qty, setQty] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleAddCart(e, id, qty = 1) {
    setIsLoading(true);
    e.preventDefault();
    try {
      await dispatch(createAsyncAddCart({ id, qty }));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  async function handleBuyNow(e, id, qty) {
    e.preventDefault();
    setIsLoading(true);
    try {
      await handleAddCart(e, id, qty);
      navigate("/checkout");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleIncreaseQty() {
    setQty((prev) => prev + 1);
  }

  function handleDecreaseQty() {
    setQty((prev) => (prev <= 1 ? 1 : prev - 1));
  }

  function handleQtyChange(e) {
    const value = Number(e.target.value);
    if (!value || value < 1) {
      setQty(1);
      return;
    }
    setQty(value);
  }

  //切換最愛狀態
  function handleToggleFavorite(e, productId) {
    e.preventDefault();
    const updatedFavorites = toggleFavorite(productId);
    setFavorites(updatedFavorites);
  }

  useEffect(() => {
    async function getSingleProduct(productId) {
      setIsLoading(true);
      try {
        const res = await getSingleProductsApi(productId);
        setProduct(res.data.product);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    getSingleProduct(id);
  }, [id]);

  //讀取最愛
  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const isFavorite = favorites.includes(String(product.id));

  return (
    <>
      <div
        className={`kging-page-loading-content ${isLoading ? "is-loading" : ""}`}
      >
        <div className="kging-page">
          <section className="single-product-hero">
            <div className="container text-center">
              <div className="kging-section-heading mb-0">
                <p className="kging-section-label">KGING PRODUCT</p>
                <h1 className="kging-section-title">Product Detail</h1>
              </div>
            </div>
          </section>

          <section className="kging-section">
            <div className="container">
              <div className="row g-4 g-lg-5">
                <div className="col-lg-7">
                  <div className="kging-card single-gallery-card">
                    <div
                      className="single-main-image"
                      style={
                        product.imageUrl
                          ? {
                              backgroundImage: `url(${product.imageUrl})`,
                            }
                          : {}
                      }
                    ></div>
                  </div>

                  <div className="kging-card single-content-card mt-4">
                    <div className="kging-card-body">
                      <p className="kging-product-category mb-2">
                        {product.category || "KGING"}
                      </p>
                      <h2 className="single-product-title">{product.title}</h2>
                      <p className="kging-product-text mb-0 single-product-desc">
                        {product.description}
                      </p>
                    </div>
                  </div>

                  <div className="single-extra-images mt-4">
                    {product.imagesUrl?.map((imgItem) => (
                      <img
                        key={imgItem}
                        src={imgItem}
                        className="img-fluid mt-3 kging-card single-extra-image"
                      />
                    ))}
                  </div>

                  <div
                    className="accordion single-accordion mt-4"
                    id="accordionExample"
                  >
                    <div className="accordion-item kging-card single-accordion-item">
                      <h2 className="accordion-header" id="headingOne">
                        <button
                          className="accordion-button single-accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          Product Information
                        </button>
                      </h2>
                      <div
                        id="collapseOne"
                        className="accordion-collapse collapse show"
                        aria-labelledby="headingOne"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body single-accordion-body">
                          {/* {product.content ||
                        "Detailed product information will be displayed here."} */}
                          <ProductDescription description={product.content} />
                        </div>
                      </div>
                    </div>

                    <div className="accordion-item kging-card single-accordion-item">
                      <h2 className="accordion-header" id="headingTwo">
                        <button
                          className="accordion-button collapsed single-accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                        >
                          Shipping & Delivery
                        </button>
                      </h2>
                      <div
                        id="collapseTwo"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingTwo"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body single-accordion-body">
                          訂單將盡快處理，並精心包裝後發貨
                        </div>
                      </div>
                    </div>

                    <div className="accordion-item kging-card single-accordion-item">
                      <h2 className="accordion-header" id="headingThree">
                        <button
                          className="accordion-button collapsed single-accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseThree"
                          aria-expanded="false"
                          aria-controls="collapseThree"
                        >
                          Notes
                        </button>
                      </h2>
                      <div
                        id="collapseThree"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingThree"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body single-accordion-body">
                          請置於陰涼乾燥處保存，並依建議用量食用。
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-5">
                  <div className="kging-card single-buy-card">
                    <div className="kging-card-body">
                      <span className="kging-badge mb-3 d-inline-block">
                        {product.category || "Premium Product"}
                      </span>

                      <h3 className="single-buy-title">{product.title}</h3>

                      <p className="kging-product-text single-buy-desc">
                        {product.description ||
                          "Premium sports nutrition and fitness essentials."}
                      </p>

                      <div className="single-price-block">
                        <p className="single-price mb-1">
                          NT$ {currency(product.price || 0)}
                        </p>
                        {product.origin_price && (
                          <p className="single-origin-price mb-0">
                            NT$ {currency(product.origin_price)}
                          </p>
                        )}
                      </div>

                      <div className="single-qty-wrap">
                        <label className="single-qty-label">數量</label>
                        <div className="input-group kging-qty-group">
                          <button
                            className="btn kging-qty-btn"
                            type="button"
                            onClick={handleDecreaseQty}
                          >
                            <i className="fas fa-minus"></i>
                          </button>

                          <input
                            type="number"
                            min="1"
                            className="form-control kging-qty-input"
                            value={qty}
                            onChange={handleQtyChange}
                          />

                          <button
                            className="btn kging-qty-btn"
                            type="button"
                            onClick={handleIncreaseQty}
                          >
                            <i className="fas fa-plus"></i>
                          </button>
                        </div>
                      </div>

                      <div className="d-grid gap-3">
                        <button
                          type="button"
                          className={`btn ${isFavorite ? "btn-danger" : "btn-outline-dark"}`}
                          onClick={(e) => handleToggleFavorite(e, product.id)}
                        >
                          <i
                            className={`fa-heart me-2 ${
                              isFavorite ? "fas" : "far"
                            }`}
                          ></i>
                          {isFavorite ? "已加入最愛" : "加入最愛"}
                        </button>
                        <a
                          href="#"
                          className="kging-btn kging-btn-primary single-cart-btn"
                          onClick={(e) => handleAddCart(e, id, qty)}
                        >
                          加入購物車
                        </a>

                        <button
                          type="button"
                          className="kging-btn kging-btn-secondary"
                          onClick={(e) => handleBuyNow(e, id, qty)}
                        >
                          立即購買
                        </button>
                      </div>

                      <div className="single-meta">
                        <div className="single-meta-item">
                          <span className="single-meta-label">品牌</span>
                          <span className="single-meta-value">KGING</span>
                        </div>
                        <div className="single-meta-item">
                          <span className="single-meta-label">商品分類</span>
                          <span className="single-meta-value">
                            {product.category || "-"}
                          </span>
                        </div>
                        <div className="single-meta-item">
                          <span className="single-meta-label">商品庫存</span>
                          <span className="single-meta-value">尚有存貨</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
}

export default SingleProduct;
