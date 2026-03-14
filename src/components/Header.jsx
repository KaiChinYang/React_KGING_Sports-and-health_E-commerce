import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { createAsyncGetCart } from "../slice/cartSlice";
import { homeContent } from "../data/homeContent";

export default function Header() {
  const carts = useSelector((state) => state.cart.carts);
  const dispatch = useDispatch();
  const { logoSVG } = homeContent.navbar;
  useEffect(() => {
    dispatch(createAsyncGetCart());
  }, [dispatch]);
  return (
    <div className="bg-white sticky-top">
      <div className="container">
        <nav className="navbar px-0 navbar-expand-lg navbar-light bg-white">
          <Link
            className="navbar-brand position-absolute"
            to="/"
            style={{
              left: "50%",
              transform: "translate(-50%, -50%)",
              top: "50%",
            }}
          >
            <img
              src={logoSVG.imageUrl}
              alt="KGING Logo"
              style={{ width: "10rem", height: "auto", display: "block" }}
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse bg-white custom-header-md-open"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item active">
                <Link className="nav-link ps-0" to="/product">
                  全部商品
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/product/23">
                  詳細
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/product/23">
                  乳清蛋白
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/product/23">
                  運動配件
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/product/23">
                  關於品牌
                </Link>
              </li>
            </ul>
          </div>
          <div className="d-flex">
            <a href="#">
              <i className="fas fa-heart me-5"></i>
            </a>
            <Link to="/cart" className="position-relative">
              <i className="fas fa-shopping-cart"></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {carts.length}
                {/* <span className="visually-hidden">unread messages</span> */}
              </span>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
