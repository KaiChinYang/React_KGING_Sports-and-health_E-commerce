import { useState  } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createAsyncDeleteCart,
  createAsyncUpdateCartQty,
  createAsyncSendOrder,
  createAsyncClearCart,
} from "../../slice/cartSlice";
import { currency } from "../../utils/filter";
import { useForm } from "react-hook-form";
import { Vortex } from "react-loader-spinner";
import { emailValidation } from "../../utils/validation";
import "../../styles/Checkout.css";
import { useNavigate } from "react-router";
import { unwrapResult } from "@reduxjs/toolkit";
import LoadingOverlay from "../../components/LoadingOverlay";

function Checkout() {
  const navigate = useNavigate();
  const carts = useSelector((state) => state.cart.carts);
  const final_total = useSelector((state) => state.cart.final_total);
  // const subtotal = final_total || 0;
  // const shippingFee = subtotal > 1500 ? 0 : 60;
  // const orderTotal = carts?.length ? subtotal + shippingFee : 0;

  const dispatch = useDispatch();

  // const [loadingProductId, setLoadingProductId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
 

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  async function handleUpdateQty(cartId, productId, qty) {
    if (qty < 1 || Number.isNaN(qty)) return;
    // setLoadingProductId(cartId);
    setIsLoading(true);
    try {
      await dispatch(createAsyncUpdateCartQty({ cartId, productId, qty }));
    } catch (error) {
      console.log(error);
    } finally {
      // setLoadingProductId(null);
      setIsLoading(false);
    }
  }

  async function deleteCart(cartId) {
    // setLoadingProductId(cartId);
    setIsLoading(true);
    try {
      await dispatch(createAsyncDeleteCart(cartId));
    } catch (error) {
      console.log(error);
    } finally {
      // setLoadingProductId(null);
      setIsLoading(false);
    }
  }

  async function clearCart() {
    if (!carts?.length) return;

    setIsLoading(true);

    try {
      await dispatch(createAsyncClearCart());
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function onSubmit(formData) {
    const data = {
      user: formData,
      message: formData.message,
    };
    setIsLoading(true);
    try {
      const orderId = unwrapResult(await dispatch(createAsyncSendOrder(data)));
      reset();
      navigate(`/checkout-success/${orderId}`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="checkout-page py-5">
      <div
        className={`kging-page-loading-content ${isLoading ? "is-loading" : ""}`}
      >
        <div className="container">
          {/* 頁首 */}
          <section className="checkout-hero mb-5">
            <div className="checkout-hero__inner">
              <p className="checkout-hero__eyebrow mb-2">KGING CHECKOUT</p>
              <h1 className="checkout-hero__title mb-3">
                完成你的運動補給選購
              </h1>
              <p className="checkout-hero__text mb-0">
                高蛋白、低負擔，延續你的訓練節奏。
              </p>
            </div>
          </section>

          <div className="row g-4">
            {/* 左側：購物車 */}
            <div className="col-lg-7">
              <section className="kging-panel">
                <div className="kging-panel__header kging-panel__header--between">
                  <div>
                    <p className="kging-panel__eyebrow mb-1">CART</p>
                    <h2 className="kging-panel__title mb-0">購物車清單</h2>
                  </div>

                  <button
                    type="button"
                    className="btn kging-btn-outline-danger"
                    onClick={clearCart}
                    disabled={!carts?.length || isLoading}
                  >
                    {isLoading ? (
                      <Vortex
                        height={18}
                        width={18}
                        visible={true}
                        ariaLabel="vortex-loading"
                        colors={["#d4af37", "#ffffff", "#8c6b15"]}
                      />
                    ) : (
                      "清空購物車"
                    )}
                  </button>
                </div>

                {carts?.length > 0 ? (
                  <div className="checkout-cart-list">
                    {carts.map((cartItem) => (
                      <div className="checkout-cart-item" key={cartItem.id}>
                        <div className="checkout-cart-item__main">
                          <img
                            src={cartItem.product.imageUrl}
                            alt={cartItem.product.title}
                            className="checkout-cart-item__image"
                            style={{ maxWidth: "5rem" }}
                          />

                          <div className="checkout-cart-item__content">
                            <h3 className="checkout-cart-item__title">
                              {cartItem.product.title}
                            </h3>
                            <p className="checkout-cart-item__unit mb-1">
                              單位：{cartItem.product.unit}
                            </p>
                            <p className="checkout-cart-item__price mb-0">
                              NT$ {currency(cartItem.product.price)}
                            </p>
                          </div>
                        </div>

                        <div className="checkout-cart-item__footer">
                          <div className="input-group kging-qty-group cart-qty-group">
                            <button
                              className="btn kging-qty-btn"
                              type="button"
                              onClick={() =>
                                handleUpdateQty(
                                  cartItem.id,
                                  cartItem.product.id,
                                  cartItem.qty - 1,
                                )
                              }
                              disabled={cartItem.qty <= 1 || isLoading}
                            >
                              <i className="fas fa-minus"></i>
                            </button>

                            <input
                              type="number"
                              min="1"
                              className="form-control kging-qty-input"
                              value={cartItem.qty}
                              onChange={(e) =>
                                handleUpdateQty(
                                  cartItem.id,
                                  cartItem.product.id,
                                  Number(e.target.value),
                                )
                              }
                              disabled={isLoading}
                            />

                            <button
                              className="btn kging-qty-btn"
                              type="button"
                              onClick={() =>
                                handleUpdateQty(
                                  cartItem.id,
                                  cartItem.product.id,
                                  cartItem.qty + 1,
                                )
                              }
                              disabled={isLoading}
                            >
                              <i className="fas fa-plus"></i>
                            </button>
                          </div>

                          <div className="checkout-cart-item__amount text-end">
                            <p className="checkout-cart-item__subtotal mb-0">
                              小計 NT$ {currency(cartItem.final_total)}
                            </p>
                          </div>
                        </div>

                        <div className="checkout-cart-item__remove">
                          <button
                            type="button"
                            className="btn kging-btn-outline-danger btn-sm"
                            onClick={() => deleteCart(cartItem.id)}
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <Vortex
                                height={16}
                                width={16}
                                visible={true}
                                ariaLabel="vortex-loading"
                                colors={["#d4af37", "#ffffff", "#8c6b15"]}
                              />
                            ) : (
                              "刪除"
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="checkout-empty">
                    <p className="mb-0">
                      目前購物車內沒有商品，先去挑選你的補給吧。
                    </p>
                  </div>
                )}

                <div className="checkout-cart-total">
                  <span>總計</span>
                  <strong>NT$ {currency(final_total || 0)}</strong>
                </div>
              </section>
            </div>

            {/* 右側：訂購資訊 */}
            <div className="col-lg-5">
              <section className="kging-panel checkout-form-panel sticky-lg-top">
                <div className="kging-panel__header">
                  <div>
                    <p className="kging-panel__eyebrow mb-1">ORDER INFO</p>
                    <h2 className="kging-panel__title mb-0">填寫訂購資料</h2>
                  </div>
                </div>
                <div className="checkout-info-cards mb-4">
                  <div className="checkout-info-card">
                    <div className="checkout-info-card__icon">
                      <i className="fas fa-truck"></i>
                    </div>
                    <div className="checkout-info-card__content">
                      <h3 className="checkout-info-card__title">配送方式</h3>
                      <p className="checkout-info-card__text mb-1">
                        宅配到府 / 超商取貨
                      </p>
                      <p className="checkout-info-card__sub mb-0">
                        訂單成立後將於 2–5
                        個工作天內安排出貨，實際配送時間依物流狀況為準。
                      </p>
                    </div>
                  </div>

                  <div className="checkout-info-card">
                    <div className="checkout-info-card__icon">
                      <i className="fas fa-credit-card"></i>
                    </div>
                    <div className="checkout-info-card__content">
                      <h3 className="checkout-info-card__title">付款方式</h3>
                      <p className="checkout-info-card__text mb-1">
                        信用卡 / ATM 轉帳
                      </p>
                      <p className="checkout-info-card__sub mb-0">
                        支援安全付款流程，付款完成後將立即為你保留商品並安排後續出貨。
                      </p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label kging-label">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="form-control kging-input"
                      placeholder="請輸入 Email"
                      {...register("email", emailValidation)}
                    />
                    {errors.email && (
                      <p className="kging-error mt-2">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="name" className="form-label kging-label">
                      收件人姓名
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="form-control kging-input"
                      placeholder="請輸入姓名"
                      {...register("name", {
                        required: "姓名為必填",
                        minLength: {
                          value: 2,
                          message: "姓名至少需2個字",
                        },
                      })}
                    />
                    {errors.name && (
                      <p className="kging-error mt-2">{errors.name.message}</p>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="tel" className="form-label kging-label">
                      收件人電話
                    </label>
                    <input
                      id="tel"
                      type="tel"
                      className="form-control kging-input"
                      placeholder="請輸入電話"
                      {...register("tel", {
                        required: "電話為必填",
                        pattern: {
                          value: /^\d+$/,
                          message: "電話僅能輸入數字",
                        },
                        minLength: {
                          value: 8,
                          message: "電話最少 8 碼",
                        },
                      })}
                    />
                    {errors.tel && (
                      <p className="kging-error mt-2">{errors.tel.message}</p>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="address" className="form-label kging-label">
                      收件地址
                    </label>
                    <input
                      id="address"
                      type="text"
                      className="form-control kging-input"
                      placeholder="請輸入地址"
                      {...register("address", {
                        required: "地址為必填",
                      })}
                    />
                    {errors.address && (
                      <p className="kging-error mt-2">
                        {errors.address.message}
                      </p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="message" className="form-label kging-label">
                      留言備註
                    </label>
                    <textarea
                      id="message"
                      className="form-control kging-input"
                      rows="5"
                      placeholder="可填寫配送需求或其他備註"
                      {...register("message")}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="deliverWay"
                      className="form-label kging-label"
                    >
                      配送方式
                    </label>
                    <div className="kging-select-wrap">
                      <select
                        id="deliverWay"
                        className="form-select kging-input kging-select"
                        defaultValue=""
                        {...register("deliverWay", {
                          required: "配送方式為必填",
                        })}
                      >
                        <option value="" disabled>
                          請選擇配送方式
                        </option>
                        <option value="home">宅配到府</option>
                        <option value="store">超商取貨</option>
                      </select>
                    </div>
                    {errors.deliverWay && (
                      <p className="kging-error mt-2">
                        {errors.deliverWay.message}
                      </p>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="payWay" className="form-label kging-label">
                      付款方式
                    </label>
                    <div className="kging-select-wrap">
                      <select
                        id="payWay"
                        className="form-select kging-input kging-select"
                        defaultValue=""
                        {...register("payWay", {
                          required: "付款方式為必填",
                        })}
                      >
                        <option value="" disabled>
                          請選擇付款方式
                        </option>
                        <option value="credit">信用卡</option>
                        <option value="atm">ATM 轉帳</option>
                        <option value="cash">貨到付款</option>
                      </select>
                    </div>
                    {errors.payWay && (
                      <p className="kging-error mt-2">
                        {errors.payWay.message}
                      </p>
                    )}
                  </div>

                  <div className="checkout-submit-box">
                    <div className="checkout-submit-box__summary mb-3">
                      <span>應付總金額</span>
                      <strong>NT$ {currency(final_total || 0)}</strong>
                    </div>

                    <button
                      type="submit"
                      className="btn kging-btn-primary w-100"
                      disabled={!carts?.length}
                    >
                      送出訂單
                    </button>
                  </div>
                </form>
              </section>
            </div>
          </div>
        </div>
      </div>
      <LoadingOverlay
        isOpen={isLoading}
        eyebrow="KGING PROCESSING"
        title="資料處理中"
        text="正在同步你的購物車與訂單資訊，請稍候。"
      />
    </div>
  );
}

export default Checkout;
