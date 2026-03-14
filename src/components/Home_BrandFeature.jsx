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
    <section className="home-brand-feature py-5 py-lg-6">
      <div className="container">
        <div className="text-center section-heading mb-4 mb-lg-5">
          <span className="section-subtitle">WHY KGING</span>
          <h2 className="section-title mt-2">品牌特色</h2>
          <p className="section-text mb-0">
            專注運動補給與健康日常，提供更有品質感的選擇
          </p>
        </div>

        <div className="row g-4">
          {features.map((feature) => (
            <div className="col-12 col-md-6 col-lg-3" key={feature.id}>
              <div className="brand-feature-card h-100 text-center">
                <div className="brand-feature-icon">
                  <i className={feature.icon}></i>
                </div>
                <h3 className="brand-feature-title">{feature.title}</h3>
                <p className="brand-feature-desc mb-0">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
