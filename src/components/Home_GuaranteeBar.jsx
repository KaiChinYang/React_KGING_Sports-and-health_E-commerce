import "../styles/Home_GuaranteeBar.css";

export default function Home_GuaranteeBar() {
  const guarantees = [
    {
      id: 1,
      icon: "bi bi-truck",
      title: "滿額免運",
      desc: "單筆消費達指定金額，即享免運優惠。",
    },
    {
      id: 2,
      icon: "bi bi-credit-card-2-front",
      title: "安全付款",
      desc: "提供安全可靠的付款流程，購物更安心。",
    },
    {
      id: 3,
      icon: "bi bi-box-seam",
      title: "快速出貨",
      desc: "訂單成立後盡快安排出貨，補給不久等。",
    },
    {
      id: 4,
      icon: "bi bi-headset",
      title: "客服支援",
      desc: "有任何問題，都能獲得即時協助與回覆。",
    },
  ];
  return (
    <section className="kg-guarantee-bar-section py-5">
      <div className="container">
        <div className="kg-guarantee-bar-wrap">
          <div className="text-center mb-4">
            <span className="kg-section-subtitle">SHOP WITH CONFIDENCE</span>
            <h2 className="kg-section-title mt-2">購物保障</h2>
            <p className="kg-section-desc mb-0">
              從下單到收貨，提供更安心順暢的選購體驗
            </p>
          </div>

          <div className="row g-0">
            {guarantees.map((item, index) => (
              <div className="col-12 col-md-6 col-xl-3" key={item.id}>
                <div
                  className={`kg-guarantee-bar-item h-100 ${
                    index !== guarantees.length - 1
                      ? "kg-guarantee-divider"
                      : ""
                  }`}
                >
                  <div className="kg-guarantee-bar-icon">
                    <i className={item.icon}></i>
                  </div>

                  <div className="kg-guarantee-bar-content">
                    <h3 className="kg-guarantee-bar-title">{item.title}</h3>
                    <p className="kg-guarantee-bar-desc mb-0">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
