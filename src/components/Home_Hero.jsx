import { Link } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Pagination as SwiperPagination,
  Navigation as SwiperNavigation,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { homeContent } from "../data/homeContent";
import "../styles/Home_Hero.css";

export default function Home_Hero() {
  const { hero } = homeContent;

  const heroSlides = [
    {
      id: 1,
      title: "KGING 運動健康補給",
      subtitle: "高蛋白、低負擔，打造你的日常補給節奏",
      image: hero[0].imageUrl,
      buttonText: "立即選購",
      buttonLink: "/product",
    },
    {
      id: 2,
      title: "為訓練而生的每日補給",
      subtitle: "乳清蛋白 × 健身配件 × 運動日常",
      image: hero[1].imageUrl,
      buttonText: "查看商品",
      buttonLink: "/product",
    },
    {
      id: 3,
      title: "專注你的每一次進步",
      subtitle: "從補給到訓練裝備，一次到位",
      image: hero[2].imageUrl,
      buttonText: "探索更多",
      buttonLink: "/product",
    },
    {
      id: 4,
      title: "KGING 運動品牌",
      subtitle: "超越極限，挑戰自我",
      image: hero[3].imageUrl,
      buttonText: "即刻探索",
      buttonLink: "/product",
    },
  ];

  return (
    <section className="home-hero">
      <Swiper
        modules={[SwiperNavigation, SwiperPagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        className="home-hero-swiper"
      >
        {heroSlides.map((item) => (
          <SwiperSlide key={item.id}>
            <div
              className="home-hero-slide"
              style={{ backgroundImage: `url(${item.image})` }}
            >
              <div className="home-hero-overlay"></div>

              <div className="container h-100">
                <div className="home-hero-content">
                  <p className="kging-section-label home-hero-label">
                    KGING FITNESS
                  </p>

                  <h1 className="home-hero-title">{item.title}</h1>

                  <p className="home-hero-desc">{item.subtitle}</p>

                  <div className="home-hero-actions">
                    <Link
                      to={item.buttonLink}
                      className="kging-btn kging-btn-primary"
                    >
                      {item.buttonText}
                    </Link>
                    <Link
                      to="/product"
                      className="kging-btn kging-btn-secondary"
                    >
                      查看全部商品
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
