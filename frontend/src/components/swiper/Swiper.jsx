import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const SwiperComponent = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={0}
      slidesPerView={5}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
    >
      <SwiperSlide>
        <img src="https://picsum.photos/400/300?random=1" alt="Random 1" className="w-full h-full object-cover" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="https://picsum.photos/400/300?random=2" alt="Random 2" className="w-full h-full object-cover" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="https://picsum.photos/400/300?random=3" alt="Random 3" className="w-full h-full object-cover" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="https://picsum.photos/400/300?random=4" alt="Random 4" className="w-full h-full object-cover" />
      </SwiperSlide>
    </Swiper>
  );
};

export default SwiperComponent;