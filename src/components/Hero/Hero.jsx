import './Hero.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
import hero1 from '../../assets/img/banner_Hero1.jpg'
import hero2 from '../../assets/img/banner_Hero2.jpg'
import hero3 from '../../assets/img/banner_Hero3.jpg'

const banner = [
    {
        src: hero1,
        heading4: 'Latest Technology',
        heading3: 'Discover The Future',
        para: 'Explore our latest electronic products with great quality and amazing prices Find everything you need from modern electronics designed for your everyday life.',
    },
    {
        src: hero2,
        heading4: 'Smart Choices',
        heading3: 'Upgrade Your Lifestyle',
        para: 'Find everything you need from modern electronics designed for your everyday life Shop premium electronics and enjoy great deals on products you will love',
    },
    {
        src: hero3,
        heading4: 'Best Deals',
        heading3: 'Technology Made Simple',
        para: 'Shop premium electronics and enjoy great deals on products you will love Explore our latest electronic products with great quality and amazing prices',
    }
]
function Hero() {
    return (
        <div className='hero'>
            <div className="container">
                <Swiper
                    loop={true}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }} pagination={true} speed={800} modules={[Pagination, Autoplay]} className="mySwiper">
                    {banner.map((img, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <div className="textContentSlider">
                                    <h4>{img.heading4}</h4>
                                    <h3>{img.heading3}</h3>
                                    <p>{img.para}</p>
                                    <div>
                                        <Link className='btn' to={'./'}>Shop Now</Link>
                                    </div>
                                </div>
                                <div className='sliderImage'>
                                    <img src={img.src} alt={img.heading4} />
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>
        </div>
    )
}

export default Hero
