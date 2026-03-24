import { Link } from "react-router";
import "../styles/footer.css";
import { homeContent } from "../data/homeContent";

export default function Footer() {
  const { logoSVG_white } = homeContent.navbar;

  return (
    <footer className="kging-footer">
      <div className="container">
        <div className="kging-footer-main">
          <div className="row g-4">
            <div className="col-12 col-lg-4">
              <div className="kging-footer-brand">
                <Link to="/" className="kging-footer-logo">
                  <img
                    src={logoSVG_white.imageUrl}
                    alt="KGING Logo"
                    className="kging-footer-logo-img"
                  />
                </Link>

                <p className="kging-footer-text">
                  專注運動補給與健康日常，從高蛋白到健身配件，為每一天的訓練節奏提供更穩定的支持。
                </p>

                <div className="kging-footer-social">
                  <a
                    href="#"
                    className="kging-footer-social-link"
                    aria-label="Facebook"
                  >
                    <i className="bi bi-facebook"></i>
                  </a>
                  <a
                    href="#"
                    className="kging-footer-social-link"
                    aria-label="Instagram"
                  >
                    <i className="bi bi-instagram"></i>
                  </a>
                  <a
                    href="#"
                    className="kging-footer-social-link"
                    aria-label="Youtube"
                  >
                    <i className="bi bi-youtube"></i>
                  </a>
                </div>
              </div>
            </div>

            <div className="col-6 col-md-4 col-lg-2">
              <div className="kging-footer-block">
                <h3 className="kging-footer-title">商品分類</h3>
                <ul className="kging-footer-links">
                  <li>
                    <Link to="/product?category=乳清蛋白">乳清蛋白</Link>
                  </li>
                  <li>
                    <Link to="/product?category=訓練補給">訓練補給</Link>
                  </li>
                  <li>
                    <Link to="/product?category=訓練用品">訓練用品</Link>
                  </li>
                  <li>
                    <Link to="/product?category=保健食品">保健食品</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-6 col-md-4 col-lg-3">
              <div className="kging-footer-block">
                <h3 className="kging-footer-title">購物說明</h3>
                <ul className="kging-footer-links">
                  <li>
                    <Link to="/">品牌介紹</Link>
                  </li>
                  <li>
                    <Link to="/">購物須知</Link>
                  </li>
                  <li>
                    <Link to="/">配送說明</Link>
                  </li>
                  <li>
                    <Link to="/">退換貨政策</Link>
                  </li>
                  <li>
                    <Link to="/">隱私權政策</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-12 col-md-4 col-lg-3">
              <div className="kging-footer-block">
                <h3 className="kging-footer-title">聯絡我們</h3>
                <ul className="kging-footer-contact">
                  <li>
                    <i className="bi bi-envelope"></i>
                    <span>service@kging.com</span>
                  </li>
                  <li>
                    <i className="bi bi-telephone"></i>
                    <span>0900-000-000</span>
                  </li>
                  <li>
                    <i className="bi bi-clock"></i>
                    <span>週一至週五 09:00 - 18:00</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="kging-footer-bottom">
          <p className="mb-0">
            © 2026 KGING. All Rights Reserved.
            此網頁為作品展示頁面，並未提供作實際商業用途
          </p>
        </div>
      </div>
    </footer>
  );
}
