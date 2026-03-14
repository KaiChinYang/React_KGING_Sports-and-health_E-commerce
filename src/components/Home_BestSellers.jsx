import { homeContent } from "../data/homeContent";
import "../styles/Home_BestSellers.css";
export default function Home_BestSellers() {
  const { hero } = homeContent;

  const bestSellerProducts = [
    {
      id: 1,
      title: "原味乳清蛋白",
      desc: "高蛋白、低負擔，適合日常補充。",
      price: 1280,
      image: hero[0].imageUrl,
    },
    {
      id: 2,
      title: "草莓乳清蛋白",
      desc: "香甜順口，補充蛋白質更輕鬆。",
      price: 1280,
      image: hero[0].imageUrl,
    },
    {
      id: 3,
      title: "巧克力乳清蛋白",
      desc: "經典風味，健身後補充首選。",
      price: 1280,
      image: hero[0].imageUrl,
    },
    {
      id: 4,
      title: "健身搖搖杯",
      desc: "外出攜帶方便，日常補給更簡單。",
      price: 399,
      image: hero[0].imageUrl,
    },
  ];
  return (
    <section className="best-sellers py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold">熱銷商品</h2>
          <p className="text-muted mb-0">
            最多人選購的人氣商品，快速找到你的日常補給
          </p>
        </div>

        <div className="row g-4">
          {bestSellerProducts.map((product) => (
            <div className="col-12 col-sm-6 col-lg-3" key={product.id}>
              <div className="card h-100 border-0 shadow-sm">
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.title}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold">{product.title}</h5>
                  <p className="card-text text-muted small">{product.desc}</p>
                  <p className="fs-5 fw-bold text-dark mb-3">
                    NT$ {product.price}
                  </p>
                  <button className="btn btn-dark mt-auto">查看商品</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
