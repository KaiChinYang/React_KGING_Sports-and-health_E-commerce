import { useState, useEffect, useCallback } from "react";
import { currency } from "../../utils/filter";
import { useNavigate } from "react-router";
import { getAllProductsApi, getProductsApi } from "../../services/products";
import Pagination from "../../components/Pagination";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("all");
  const [pagination, setPagination] = useState({});
  const navigate = useNavigate();
  function handleChangeCategory(e, category) {
    e.preventDefault();
    setCurrentCategory(category);
  }
  function handleViewDetail(e, id) {
    e.preventDefault();
    navigate(`/product/${id}`);
  }
  const getAllCategories = useCallback(async () => {
    try {
      const res = await getAllProductsApi();
      const result = [
        "all",
        ...new Set(res.data.products.map((item) => item.category)),
      ];
      setCategories(result);
    } catch (error) {
      console.log(error);
    }
  }, []);
  const getProducts = useCallback(async (page = 1, category) => {
    try {
      const res = await getProductsApi(page, category);
      console.log(res.data);
      setProducts(res.data.products);
      setPagination(res.data.pagination);
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    getAllCategories();
  }, [getAllCategories]);
  useEffect(() => {
    getProducts(1, currentCategory);
  }, [currentCategory, getProducts]);
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light justify-content-center border border-start-0 border-end-0 border-top border-bottom">
        <div className="navbar-nav flex-row overflow-auto navbar-custom-scroll">
          {categories.map((item) => (
            <a
              key={item}
              className={`nav-item nav-link text-nowrap px-2 ${currentCategory === item && "active"}`}
              href="#"
              onClick={(e) => {
                handleChangeCategory(e, item);
              }}
            >
              {item}
            </a>
          ))}
        </div>
      </nav>
      <div className="container mt-md-5 mt-3 mb-7">
        <div className="row">
          {/* 產品列表 */}
          {products.map((item) => (
            <div className="col-md-3" key={item.id}>
              <div className="card border-0 mb-4 position-relative position-relative">
                <img
                  src={item.imageUrl}
                  className="card-img-top rounded-0"
                  alt="..."
                />
                {/* 收藏 */}
                <a href="#" className="text-dark">
                  <i
                    className="far fa-heart position-absolute"
                    style={{ right: "16px", top: "16px" }}
                  ></i>
                </a>
                <div className="card-body p-0">
                  <h4 className="mb-0 mt-3">
                    <a href="#" onClick={(e) => handleViewDetail(e, item.id)}>
                      {item.title}
                    </a>
                  </h4>
                  <p className="card-text text-muted mb-0">
                    {item.description}
                  </p>
                  <p className="text-muted mt-3">NT$ {currency(item.price)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* 分頁 */}
        {/* <nav className="d-flex justify-content-center">
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li className="page-item active">
              <a className="page-link" href="#">
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                3
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav> */}
        <Pagination pagination={pagination} onPageChange={getProducts} />
      </div>
    </>
  );
};

export default Products;
