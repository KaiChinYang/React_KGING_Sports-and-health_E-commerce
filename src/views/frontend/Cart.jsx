import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { currency } from "../../utils/filter";
import {
  createAsyncDeleteCart,
  createAsyncUpdateCartQty,
} from "../../slice/cartSlice";
import "../../styles/cart.css";
import LoadingOverlay from "../../components/LoadingOverlay";
import { useState } from "react";

function Cart() {
  const carts = useSelector((state) => state.cart.carts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  async function handleRemoveCart(e, id) {
    e.preventDefault();
    setIsLoading(true);
    try {
      await dispatch(createAsyncDeleteCart(id));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  function handleToCheckout() {
    navigate("/checkout");
  }

  async function handleUpdateQty(cartId, productId, qty) {
    if (qty < 1) return;
    setIsLoading(true);
    try {
      await dispatch(createAsyncUpdateCartQty({ cartId, productId, qty }));
    } catch (error) {
      console.log(error);
    } finally{
      setIsLoading(false);
    }
  }

  const subtotal = carts.reduce((sum, item) => {
    return sum + item.product.price * item.qty;
  }, 0);

  //  運費 xx
  const shippingFee = subtotal >= 1500 ? 0 : 0; // 先保留假資料邏輯
  const total = subtotal + shippingFee;

  return (
    <>
      <div
        className={`kging-page-loading-content ${isLoading ? "is-loading" : ""}`}
      >
        <div className="kging-page">
          <section className="cart-hero">
            <div className="container text-center">
              <div className="kging-section-heading mb-0">
                <p className="kging-section-label">KGING CART</p>
                <h1 className="kging-section-title">購物車資訊</h1>
                <p className="kging-section-desc mx-auto">
                  請查看你所選擇的商品並且結帳完成購買
                </p>
              </div>
            </div>
          </section>

          <section className="kging-section cart-section">
            <div className="container">
              <div className="row g-4 justify-content-center">
                <div className="col-xl-8">
                  <div className="kging-card cart-main-card">
                    <div className="kging-card-body">
                      <div className="cart-header">
                        <h2 className="cart-title mb-0">Shopping Cart</h2>
                        <span className="cart-count">
                          {carts?.length || 0} 件商品
                        </span>
                      </div>

                      {carts?.length > 0 ? (
                        <div className="cart-list">
                          {carts.map((item) => (
                            <div key={item.id} className="cart-item">
                              <div className="cart-item-image-wrap">
                                <img
                                  src={item.product.imageUrl}
                                  alt={item.product.title}
                                  className="cart-item-image"
                                />
                              </div>

                              <div className="cart-item-content">
                                <button
                                  type="button"
                                  className="cart-remove-btn"
                                  onClick={(e) => handleRemoveCart(e, item.id)}
                                  aria-label="Remove item"
                                >
                                  <i className="fas fa-times"></i>
                                </button>

                                <p className="kging-product-category mb-2">
                                  {item.product.category || "KGING"}
                                </p>

                                <h3 className="cart-item-title">
                                  {item.product.title}
                                </h3>

                                <p className="cart-item-desc">
                                  {item.product.description}
                                </p>

                                <div className="cart-item-footer">
                                  <div className="input-group kging-qty-group cart-qty-group">
                                    <button
                                      className="btn kging-qty-btn"
                                      type="button"
                                      onClick={() => {
                                        handleUpdateQty(
                                          item.id,
                                          item.product_id,
                                          item.qty - 1,
                                        );
                                      }}
                                      disabled={item.qty <= 1}
                                    >
                                      <i className="fas fa-minus"></i>
                                    </button>

                                    <input
                                      type="text"
                                      className="form-control kging-qty-input"
                                      value={item.qty}
                                      onChange={(e) => {
                                        handleUpdateQty(
                                          item.id,
                                          item.product_id,
                                          Number(e.target.value),
                                        );
                                      }}
                                    />

                                    <button
                                      className="btn kging-qty-btn"
                                      type="button"
                                      onClick={() => {
                                        handleUpdateQty(
                                          item.id,
                                          item.product_id,
                                          item.qty + 1,
                                        );
                                      }}
                                    >
                                      <i className="fas fa-plus"></i>
                                    </button>
                                  </div>

                                  <div className="text-end">
                                    <p className="cart-item-price mb-1">
                                      NT$ {currency(item.product.price)}
                                    </p>
                                    <p className="cart-item-subtotal mb-0">
                                      小計 NT${" "}
                                      {currency(item.product.price * item.qty)}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="cart-empty-state text-center">
                          <h3 className="mb-3">您的購物車是空的</h3>
                          <p className="mb-4">
                            探索KGING，讓自己成為身體的KING
                          </p>
                          <Link
                            to="/product"
                            className="kging-btn kging-btn-primary"
                          >
                            購物去
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="col-xl-4">
                  <div className="kging-card cart-summary-card">
                    <div className="kging-card-body">
                      <h3 className="cart-summary-title">Order Summary</h3>

                      <table className="table cart-summary-table mb-0">
                        <tbody>
                          <tr>
                            <th scope="row">商品小計</th>
                            <td className="text-end">
                              NT$ {currency(subtotal)}
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <div className="cart-summary-total">
                        <p className="mb-0">總計</p>
                        <p className="mb-0">NT$ {currency(total)}</p>
                      </div>

                      <div className="d-grid gap-3 mt-4">
                        <button
                          className="kging-btn kging-btn-primary cart-checkout-btn"
                          disabled={carts?.length === 0 ? true : false}
                          onClick={() => handleToCheckout()}
                        >
                          前往結帳
                        </button>

                        <Link
                          to="/product"
                          className="kging-btn kging-btn-secondary"
                        >
                          繼續逛逛其他商品
                        </Link>
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
        text="正在同步你的購物車與訂單資訊，請稍候。"
      />
    </>
  );
}

export default Cart;
