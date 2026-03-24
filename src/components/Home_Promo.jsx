import { Link } from "react-router";
import "../styles/Home_Promo.css";

export default function Home_Promo() {
  return (
    <section className="home-promo-section kging-section">
      <div className="container">
        <div className="home-promo-box kging-card">
          <div className="row align-items-center g-4">
            <div className="col-12 col-lg-6">
              <div className="home-promo-content">
                <p className="kging-section-label mb-3">FREE SHIPPING</p>

                <h2 className="home-promo-title">
                  全館消費滿額
                  <br />
                  即享 <span>免運優惠</span>
                </h2>

                <p className="home-promo-text">
                  現在下單更划算，補給日常所需一次到位，輕鬆帶走你需要的運動健康用品。
                </p>

                <div className="home-promo-actions">
                  <Link to="/product" className="kging-btn kging-btn-primary">
                    立即選購
                  </Link>

                  <Link
                    to="/product?category=乳清蛋白"
                    className="kging-btn kging-btn-secondary"
                  >
                    查看乳清系列
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-6">
              <div className="home-promo-image-wrap">
                <img
                  src="https://storage.googleapis.com/vue-course-api.appspot.com/papaya_kg_4health/1773813392224.png"
                  alt="KGING 優惠商品"
                  className="img-fluid home-promo-image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
