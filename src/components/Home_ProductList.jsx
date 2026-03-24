import { Link } from "react-router";
import "../styles/Home_ProductList.css";

export default function Home_ProductList() {
  const categories = [
    {
      id: 1,
      title: "乳清蛋白",
      desc: "高蛋白日常補給，打造穩定訓練節奏。",
      image:
        "https://storage.googleapis.com/vue-course-api.appspot.com/papaya_kg_4health/1773812581667.png",
      link: "/product?category=乳清蛋白",
    },
    {
      id: 2,
      title: "訓練補給",
      desc: "俐落設計與實用機能，補給更方便。",
      image:
        "https://storage.googleapis.com/vue-course-api.appspot.com/papaya_kg_4health/1773812634542.png",
      link: "/product?category=訓練補給",
    },
    {
      id: 3,
      title: "訓練用品",
      desc: "訓練輔助配件，提升你的運動表現。",
      image:
        "https://storage.googleapis.com/vue-course-api.appspot.com/papaya_kg_4health/1773812699253.png",
      link: "/product?category=訓練用品",
    },
    {
      id: 4,
      title: "保健食品",
      desc: "多元補給選擇，滿足不同訓練需求。",
      image:
        "https://storage.googleapis.com/vue-course-api.appspot.com/papaya_kg_4health/1773812667644.png",
      link: "/product?category=保健食品",
    },
  ];

  return (
    <section className="home-category-section kging-section">
      <div className="container">
        <div className="kging-section-heading text-center home-category-heading">
          <p className="kging-section-label">KGING COLLECTION</p>
          <h2 className="kging-section-title">探索商品分類</h2>
          <p className="kging-section-desc mx-auto">
            從高蛋白補給到健身裝備，打造更完整的訓練日常
          </p>
        </div>

        <div className="row g-4">
          {categories.map((category) => (
            <div className="col-12 col-sm-6 col-lg-3" key={category.id}>
              <Link
                to={category.link}
                className="home-category-link text-decoration-none"
              >
                <div className="kging-card home-category-card h-100">
                  <div className="home-category-image-wrap">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="home-category-image"
                    />
                    <div className="home-category-overlay"></div>
                  </div>

                  <div className="kging-card-body d-flex flex-column">
                    <p className="kging-product-category mb-2">Category</p>

                    <h3 className="kging-product-title home-category-title">
                      {category.title}
                    </h3>

                    <p className="kging-product-text home-category-desc">
                      {category.desc}
                    </p>

                    <span className="kging-btn kging-btn-secondary home-category-btn mt-auto">
                      查看商品
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
