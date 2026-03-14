import { Link } from "react-router";
import "../styles/Home_Promo.css";
export default function Home_Promo() {
  return (
    <section className="kg-promo-banner py-5">
      <div className="container">
        <div className="kg-promo-banner-box">
          <div className="row align-items-center g-4">
            <div className="col-12 col-lg-6">
              <div className="kg-promo-content">
                <span className="kg-promo-subtitle">FREE SHIPPING</span>
                <h2 className="kg-promo-title">
                  全館消費滿額
                  <br />
                  即享 <span>免運優惠</span>
                </h2>
                <p className="kg-promo-text">
                  現在下單更划算，補給日常所需一次到位，
                  輕鬆帶走你需要的運動健康用品。
                </p>

                <div className="d-flex flex-wrap gap-3 mt-4">
                  <Link
                    to="/products"
                    className="btn kg-btn-gold rounded-pill px-4"
                  >
                    立即選購
                  </Link>

                  <Link
                    to="/products?category=乳清蛋白"
                    className="btn kg-btn-outline-gold rounded-pill px-4"
                  >
                    查看乳清系列
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-6">
              <div className="kg-promo-image-wrap">
                <img
                  src="/images/home/promo-whey.png"
                  alt="KGING 優惠商品"
                  className="img-fluid kg-promo-image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
