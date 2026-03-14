import { Link } from "react-router";
import "../styles/Home_ProductList.css";

export default function Home_ProductList() {
    const categories = [
      {
        id: 1,
        title: "乳清蛋白",
        desc: "高蛋白日常補給，打造穩定訓練節奏。",
        image: "/images/home/category-whey.jpg",
        link: "/products?category=乳清蛋白",
      },
      {
        id: 2,
        title: "搖搖杯",
        desc: "俐落設計與實用機能，補給更方便。",
        image: "/images/home/category-shaker.jpg",
        link: "/products?category=搖搖杯",
      },
      {
        id: 3,
        title: "健身配件",
        desc: "訓練輔助配件，提升你的運動表現。",
        image: "/images/home/category-accessories.jpg",
        link: "/products?category=健身配件",
      },
      {
        id: 4,
        title: "運動補給",
        desc: "多元補給選擇，滿足不同訓練需求。",
        image: "/images/home/category-supplement.jpg",
        link: "/products?category=運動補給",
      },
    ];
  return (
    <section className="home-category-luxury py-5 py-lg-6">
      <div className="container">
        <div className="text-center section-heading mb-4 mb-lg-5">
          <span className="section-subtitle">KGING COLLECTION</span>
          <h2 className="section-title mt-2">探索商品分類</h2>
          <p className="section-text mb-0">
            從高蛋白補給到健身裝備，打造更完整的訓練日常
          </p>
        </div>

        <div className="row g-4">
          {categories.map((category) => (
            <div className="col-12 col-sm-6 col-lg-3" key={category.id}>
              <div className="category-luxury-card h-100">
                <div className="category-luxury-img-wrap">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="category-luxury-img"
                  />
                  <div className="category-luxury-overlay"></div>
                </div>

                <div className="category-luxury-body">
                  <h3 className="category-luxury-title">{category.title}</h3>
                  <p className="category-luxury-desc">{category.desc}</p>

                  <Link
                    to={category.link}
                    className="btn category-luxury-btn rounded-pill"
                  >
                    查看商品
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
