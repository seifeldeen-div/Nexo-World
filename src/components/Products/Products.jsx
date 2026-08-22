import ProductCard from './components/ProductCard'
import { Swiper, SwiperSlide } from 'swiper/react';

import './Products.css'
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import { Autoplay, FreeMode, Pagination } from 'swiper/modules';


function Products(props) {
    console.log(props.data.description)
    return (
        <div className="products slide">
            <div className="container">
                <div className="headingTopContainer">
                    <div className="heading">
                        <h2>{props.title}</h2>
                        <p>{props.data.description}</p>
                    </div>
                    <div className="showAllProducts">
                        <button className='btn'>Show All Products</button>
                    </div>
                </div>
                <div className="productsContainer">
                    <Swiper
                        loop={props.data.length > 4}
                        autoplay={{
                            delay: 2000,
                            disableOnInteraction: true,
                        }}
                        slidesPerView={1.15}
                        spaceBetween={12}
                        breakpoints={{
                            480: {
                                slidesPerView: 2,
                                spaceBetween: 14,
                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 18,
                            },
                            1100: {
                                slidesPerView: 4,
                                spaceBetween: 24,
                            },
                        }}
                        freeMode={true}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Autoplay, FreeMode, Pagination]}
                        className="mySwiper"
                    >
                        {props.data.map((item) => {
                            return <SwiperSlide key={item.id}><ProductCard productID={item.id} item={item} /></SwiperSlide>
                        })}
                    </Swiper>
                </div>
            </div>
        </div>
    )
}

export default Products
