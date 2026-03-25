import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router";
import { createAsyncGetCart } from "../slice/cartSlice";
import { homeContent } from "../data/homeContent";
import { Collapse } from "bootstrap";
import "../styles/header.css";

export default function Header() {
  const carts = useSelector((state) => state.cart.carts);
  const dispatch = useDispatch();
  const { logoSVG_white } = homeContent.navbar;
  const [searchParams] = useSearchParams();
  const currentCategory = searchParams.get("category");

   const closeNavbar = () => {
     const navbar = document.getElementById("kgingNavbar");
     if (!navbar) return;

     const bsCollapse =
       Collapse.getInstance(navbar) ||
       new Collapse(navbar, {
         toggle: false,
       });

     bsCollapse.hide();
   };

  useEffect(() => {
    dispatch(createAsyncGetCart());
  }, [dispatch]);

  const categoryLinks = [
    { name: "全部商品", to: "/product", category: null },
    {
      name: "乳清蛋白",
      to: "/product?category=乳清蛋白",
      category: "乳清蛋白",
    },
    {
      name: "訓練補給",
      to: "/product?category=訓練補給",
      category: "訓練補給",
    },
    {
      name: "訓練用品",
      to: "/product?category=訓練用品",
      category: "訓練用品",
    },
    {
      name: "保健食品",
      to: "/product?category=保健食品",
      category: "保健食品",
    },
  ];

  return (
    <header className="kging-header sticky-top">
      <div className="container">
        <nav className="navbar navbar-expand-lg kging-navbar px-0">
          <Link className="navbar-brand kging-navbar-brand d-lg-none" to="/">
            <img
              src={logoSVG_white.imageUrl}
              alt="KGING Logo"
              className="kging-navbar-logo"
            />
          </Link>

          <button
            className="navbar-toggler kging-navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#kgingNavbar"
            aria-controls="kgingNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse kging-navbar-collapse"
            id="kgingNavbar"
          >
            <ul className="navbar-nav kging-nav-left">
              {categoryLinks.map((item) => {
                const isActive =
                  item.category === null
                    ? currentCategory === null
                    : currentCategory === item.category;

                return (
                  <li className="nav-item" key={item.name}>
                    <Link
                      to={item.to}
                      onClick={closeNavbar}
                      className={`nav-link kging-nav-link ${
                        isActive ? "active" : ""
                      }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="kging-navbar-center d-none d-lg-flex">
              <Link className="kging-navbar-brand" to="/">
                <img
                  src={logoSVG_white.imageUrl}
                  alt="KGING Logo"
                  className="kging-navbar-logo"
                />
              </Link>
            </div>

            <div className="kging-navbar-actions">
              <Link
                to="/favorite"
                onClick={closeNavbar}
                className="kging-header-icon-btn"
                aria-label="Wishlist"
              >
                <i className="fas fa-heart"></i>
              </Link>
              <Link
                to="/cart"
                onClick={closeNavbar}
                className="kging-header-icon-btn kging-cart-link"
                aria-label="Shopping cart"
              >
                <i className="fas fa-shopping-cart"></i>
                <span className="kging-cart-badge">{carts.length}</span>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
