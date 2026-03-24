import { Link, useParams } from "react-router";
import "../../styles/checkoutSuccess.css";
import { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  createAsyncGetSingleOrder,
  createAsyncPayOrder,
} from "../../slice/cartSlice";
import { unwrapResult } from "@reduxjs/toolkit";

function CheckoutSuccess() {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const [orderInfo, setOrderInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);

  const fetchOrder = useCallback(async () => {
    try {
      const order = unwrapResult(
        await dispatch(createAsyncGetSingleOrder(orderId)),
      );
      console.log(order);
      setOrderInfo({
        orderId: order.id,
        name: order.user?.name || "",
        tel: order.user?.tel || "",
        address: order.user?.address || "",
        deliverWay: order.user?.deliverWay || "",
        payWay: order.user?.payWay || "",
        totalAmount: order.total || 0,
        email: order.user?.email || "",
        isPaid: order.is_paid || false,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [orderId, dispatch]);
  useEffect(() => {
    if (orderId) {
      fetchOrder();
    }
  }, [orderId, fetchOrder]);
  // const orderInfo = {
  //   orderId: "KG202603230001",
  //   name: "王小明",
  //   tel: "0912345678",
  //   address: "台北市信義區信義路五段 7 號",
  //   deliverWay: "home",
  //   payWay: "cash",
  //   totalAmount: 5000,
  //   email: "o2f5x@example.com",
  // };
  async function handlePayment() {
    try {
      setPaying(true);
      await dispatch(createAsyncPayOrder(orderId)).unwrap();
      await fetchOrder();
    } catch (error) {
      console.log(error);
    } finally {
      setPaying(false);
    }
  }
  return (
    <div className="checkout-success-page py-5">
      <div className="container">
        <section className="checkout-success-hero mb-4">
          <div className="checkout-success-hero__inner text-center">
            <div className="checkout-success-hero__icon mb-3">
              <i className="fas fa-check"></i>
            </div>
            <p className="checkout-success-hero__eyebrow mb-2">
              ORDER COMPLETED
            </p>
            <h1 className="checkout-success-hero__title mb-3">感謝你的訂購</h1>
            <p className="checkout-success-hero__text mb-0">
              你的訂單已成功建立，我們會盡快為你安排出貨。
            </p>
          </div>
        </section>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <section className="kging-success-panel">
              <div className="kging-success-panel__header">
                <p className="kging-success-panel__eyebrow mb-1">ORDER INFO</p>
                <h2 className="kging-success-panel__title mb-0">訂單資訊</h2>
              </div>

              {loading ? (
                <div className="text-center py-4">
                  <p>載入訂單資訊中...</p>
                </div>
              ) : orderInfo ? (
                <>
                  <div className="success-order-card">
                    <div className="success-order-row">
                      <span className="success-order-row__label">
                        消費者姓名
                      </span>
                      <span className="success-order-row__value">
                        {orderInfo.name}
                      </span>
                    </div>

                    <div className="success-order-row">
                      <span className="success-order-row__label">
                        消費者電話
                      </span>
                      <span className="success-order-row__value">
                        {orderInfo.tel}
                      </span>
                    </div>
                    <div className="success-order-row">
                      <span className="success-order-row__label">
                        消費者電子信箱
                      </span>
                      <span className="success-order-row__value">
                        {orderInfo.email}
                      </span>
                    </div>

                    <div className="success-order-row success-order-row--address">
                      <span className="success-order-row__label">
                        消費者地址
                      </span>
                      <span className="success-order-row__value">
                        {orderInfo.address}
                      </span>
                    </div>

                    <div className="success-order-row">
                      <span className="success-order-row__label">配送方式</span>
                      <span className="success-order-row__value">
                        {orderInfo.deliverWay === "home"
                          ? "宅配到府"
                          : "超商取貨"}
                      </span>
                    </div>

                    <div className="success-order-row">
                      <span className="success-order-row__label">付款方式</span>
                      <span className="success-order-row__value">
                        {orderInfo.payWay === "credit"
                          ? "信用卡付款"
                          : orderInfo.payWay === "atm"
                            ? "ATM轉帳付款"
                            : "貨到付款"}
                      </span>
                    </div>
                  </div>

                  <div className="success-order-notice mt-4">
                    <h3 className="success-order-notice__title">配送提醒</h3>
                    <p className="success-order-notice__text mb-0">
                      訂單成立後將依照付款與物流狀態安排出貨，約 2–5
                      個工作天內送達。
                    </p>
                  </div>
                </>
              ) : (
                <div className="text-center py-4">
                  <p>無法載入訂單資訊</p>
                </div>
              )}
              <div className="success-payment-box mt-4">
                <div className="success-payment-box__header">
                  <p className="success-payment-box__eyebrow mb-1">PAY NOW</p>
                  <h3 className="success-payment-box__title mb-2">立即付款</h3>
                  <p className="success-payment-box__text mb-0">
                    若你尚未完成付款，可點擊下方按鈕前往付款流程，我們將在確認付款後安排出貨。
                  </p>
                </div>

                <div className="success-payment-box__content">
                  <div className="success-payment-info">
                    <div className="success-payment-info__row">
                      <span className="success-payment-info__label">
                        訂單編號
                      </span>
                      <span className="success-payment-info__value">
                        {orderInfo.orderId}
                      </span>
                    </div>
                    <div className="success-payment-info__row">
                      <span className="success-payment-info__label">
                        總金額
                      </span>
                      <span className="success-payment-info__value">
                        {orderInfo.totalAmount}
                      </span>
                    </div>
                    <div className="success-payment-info__row">
                      <span className="success-payment-info__label">
                        付款狀態
                      </span>
                      <span
                        className={`success-payment-info__value ${
                          orderInfo.isPaid
                            ? "success-payment-info__value--paid"
                            : "success-payment-info__value--pending"
                        }`}
                      >
                        {orderInfo.isPaid ? "已付款" : "未付款"}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="btn kging-btn-primary w-100 success-payment-box__btn"
                    onClick={handlePayment}
                    disabled={
                      paying ||
                      orderInfo.isPaid ||
                      orderInfo.payWay === "cash" ||
                      orderInfo.payWay === "atm"
                    }
                  >
                    {orderInfo.isPaid
                      ? "已完成付款"
                      : orderInfo.payWay === "cash"
                        ? "貨到付款"
                        : orderInfo.payWay === "atm"
                          ? "請在期限內匯款完成結帳"
                          : paying
                            ? "付款處理中..."
                            : "立即付款"}
                  </button>
                </div>
                {orderInfo.pawWay === "atm" && (
                  <div className="success-payment-box__content">
                    <div className="success-payment-info">
                      <h3 className="success-payment-box__title mb-2">
                        匯款資訊
                      </h3>
                      <div className="success-payment-info__row">
                        <span className="success-payment-info__label">
                          中華郵政
                        </span>
                        <span className="success-payment-info__value">700</span>
                      </div>
                      <div className="success-payment-info__row">
                        <span className="success-payment-info__label">
                          虛擬帳號
                        </span>
                        <span className="success-payment-info__value">
                          00314967895566
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="checkout-success-actions mt-4">
                <Link to="/" className="btn kging-btn-outline-light">
                  返回首頁
                </Link>
                <Link to="/product" className="btn kging-btn-primary">
                  繼續購物
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutSuccess;
