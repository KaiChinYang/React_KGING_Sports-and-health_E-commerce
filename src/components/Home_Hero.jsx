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
      buttonLink: "/products",
    },
    {
      id: 2,
      title: "為訓練而生的每日補給",
      subtitle: "乳清蛋白 × 健身配件 × 運動日常",
      image: hero[1].imageUrl,
      buttonText: "查看商品",
      buttonLink: "/products",
    },
    {
      id: 3,
      title: "專注你的每一次進步",
      subtitle: "從補給到訓練裝備，一次到位",
      image: hero[2].imageUrl,
      buttonText: "探索更多",
      buttonLink: "/products",
    },
    {
      id: 4,
      title: "KGING 運動品牌",
      subtitle: "超越極限，挑戰自我",
      image: hero[3].imageUrl,
      buttonText: "即刻探索",
      buttonLink: "/products",
    },
  ];
  return (
    <section>
      <Swiper
        modules={[SwiperNavigation, SwiperPagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
      >
        {heroSlides.map((item) => (
          <SwiperSlide key={item.id}>
            <div
              style={{
                backgroundImage: `url(${item.image})`,
                width: "100%",
                height: "100%",
                backgroundSize: "contain",
                backgroundPosition: "center",
              }}
            >
              <h2>{item.title}</h2>
              <p>{item.subtitle}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
