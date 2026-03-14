import React from 'react'
import { Link } from 'react-router';
import '../styles/footer.css'
import { homeContent } from '../data/homeContent';
export default function Footer() {
  const { logoSVG_white } = homeContent.navbar;

  return (
    // <>
    //   <div className="bg-dark">
    //     <div className="container">
    //       <div className="d-flex align-items-center justify-content-between text-white py-4">
    //         <p className="mb-0">© 2026 LOGO All Rights Reserved.</p>
    //         <ul className="d-flex list-unstyled mb-0 h4">
    //           <li>
    //             <a href="#" className="text-white mx-3">
    //               <i className="fab fa-facebook"></i>
    //             </a>
    //           </li>
    //           <li>
    //             <a href="#" className="text-white mx-3">
    //               <i className="fab fa-instagram"></i>
    //             </a>
    //           </li>
    //           <li>
    //             <a href="#" className="text-white ms-3">
    //               <i className="fab fa-line"></i>
    //             </a>
    //           </li>
    //         </ul>
    //       </div>
    //     </div>
    //   </div>
    // </>
    <>
      <footer className="kg-footer">
        <div className="container">
          <div className="kg-footer-top">
            <div className="row g-4">
              <div className="col-12 col-lg-4">
                <div className="kg-footer-brand">
                  <Link to="/" className="kg-footer-logo text-decoration-none">
                    <img
                      src={logoSVG_white.imageUrl}
                      alt="KGING Logo"
                      style={{
                        width: "10rem",
                        height: "auto",
                        display: "block",
                      }}
                    />
                  </Link>
                  <p className="kg-footer-text">
                    專注運動補給與健康日常，從高蛋白到健身配件，
                    為每一天的訓練節奏提供更穩定的支持。
                  </p>

                  <div className="kg-footer-social d-flex gap-3">
                    <a
                      href="#"
                      className="kg-footer-social-link"
                      aria-label="Facebook"
                    >
                      <i className="bi bi-facebook"></i>
                    </a>
                    <a
                      href="#"
                      className="kg-footer-social-link"
                      aria-label="Instagram"
                    >
                      <i className="bi bi-instagram"></i>
                    </a>
                    <a
                      href="#"
                      className="kg-footer-social-link"
                      aria-label="Youtube"
                    >
                      <i className="bi bi-youtube"></i>
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-6 col-md-4 col-lg-2">
                <div className="kg-footer-block">
                  <h3 className="kg-footer-title">商品分類</h3>
                  <ul className="kg-footer-links list-unstyled mb-0">
                    <li>
                      <Link to="/products?category=乳清蛋白">乳清蛋白</Link>
                    </li>
                    <li>
                      <Link to="/products?category=搖搖杯">搖搖杯</Link>
                    </li>
                    <li>
                      <Link to="/products?category=健身配件">健身配件</Link>
                    </li>
                    <li>
                      <Link to="/products?category=運動補給">運動補給</Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-6 col-md-4 col-lg-3">
                <div className="kg-footer-block">
                  <h3 className="kg-footer-title">購物說明</h3>
                  <ul className="kg-footer-links list-unstyled mb-0">
                    <li>
                      <Link to="/about">品牌介紹</Link>
                    </li>
                    <li>
                      <Link to="/shopping-policy">購物須知</Link>
                    </li>
                    <li>
                      <Link to="/shipping-policy">配送說明</Link>
                    </li>
                    <li>
                      <Link to="/return-policy">退換貨政策</Link>
                    </li>
                    <li>
                      <Link to="/privacy-policy">隱私權政策</Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-12 col-md-4 col-lg-3">
                <div className="kg-footer-block">
                  <h3 className="kg-footer-title">聯絡我們</h3>
                  <ul className="kg-footer-contact list-unstyled mb-0">
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

          <div className="kg-footer-bottom">
            <p className="mb-0">© 2026 KGING. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
