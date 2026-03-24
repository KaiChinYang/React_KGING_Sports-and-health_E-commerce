import "../styles/Home_BrandFeature.css";

export default function Home_BrandFeature() {
  const features = [
    {
      id: 1,
      icon: "bi bi-award",
      title: "高標準選品",
      desc: "從配方到使用體驗，堅持更穩定、更值得信賴的品質。",
    },
    {
      id: 2,
      icon: "bi bi-lightning-charge",
      title: "高蛋白低負擔",
      desc: "讓補給更融入日常，幫助你維持訓練與生活節奏。",
    },
    {
      id: 3,
      icon: "bi bi-box-seam",
      title: "快速出貨",
      desc: "簡單下單、快速配送，讓需要的補給更快到位。",
    },
    {
      id: 4,
      icon: "bi bi-stars",
      title: "運動風格生活",
      desc: "不只是商品，更是一種自律、穩定、持續進步的狀態。",
    },
  ];

  return (
    <section className="home-brand-feature-section kging-section">
      <div className="container">
        <div className="kging-section-heading text-center home-brand-feature-heading">
          <p className="kging-section-label">WHY KGING</p>
          <h2 className="kging-section-title">品牌特色</h2>
          <p className="kging-section-desc mx-auto">
            專注運動補給與健康日常，提供更有品質感的選擇
          </p>
        </div>

        <div className="row g-4">
          {features.map((feature) => (
            <div className="col-12 col-md-6 col-lg-3" key={feature.id}>
              <div className="kging-card home-brand-feature-card h-100 text-center">
                <div className="kging-card-body home-brand-feature-body">
                  <div className="home-brand-feature-icon">
                    <i className={feature.icon}></i>
                  </div>

                  <h3 className="home-brand-feature-title">{feature.title}</h3>

                  <p className="home-brand-feature-desc mb-0">{feature.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
