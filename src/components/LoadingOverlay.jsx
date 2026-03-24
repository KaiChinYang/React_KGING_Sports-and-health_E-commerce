import { Vortex } from "react-loader-spinner";

function LoadingOverlay({
  isOpen = false,
  eyebrow = "KGING PROCESSING",
  title = "資料處理中",
  text = "系統正在同步資料，請稍候。",
}) {
  if (!isOpen) return null;

  return (
    <div className="kging-loading-overlay">
      <div className="kging-loading-overlay__backdrop"></div>

      <div className="kging-loading-card">
        <div className="kging-loading-card__ring"></div>

        <div className="kging-loading-card__spinner">
          <Vortex
            height={64}
            width={64}
            visible={true}
            ariaLabel="vortex-loading"
            colors={["#d4af37", "#ffffff", "#8c6b15"]}
          />
        </div>

        <p className="kging-loading-card__eyebrow mb-2">{eyebrow}</p>
        <h3 className="kging-loading-card__title mb-2">{title}</h3>
        <p className="kging-loading-card__text mb-0">{text}</p>
      </div>
    </div>
  );
}

export default LoadingOverlay;
