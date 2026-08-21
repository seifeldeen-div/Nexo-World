import ProductCard from './components/ProductCard'
import './Products.css'
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import { Autoplay, FreeMode, Pagination } from 'swiper/modules';
import { PiMicrosoftPowerpointLogoDuotone } from 'react-icons/pi';


function Products(props) {
    console.log(props.data.description)
    return (
        <div className="products slide">
            <div className="container">
                <div className="heading">
                    <h2>{props.title}</h2>
                    <p>{props.data.description}</p>
                </div>
                <div className="productsContainer">
                    <Swiper
                        loop={true}
                        autoplay={{
                            delay: 2000,
                            disableOnInteraction: true,
                        }}
                        slidesPerView={4}
                        spaceBetween={30}
                        freeMode={true}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Autoplay, FreeMode, Pagination]}
                        className="mySwiper"
                    >
                        {props.data.map((item) => {
                            return <SwiperSlide><ProductCard item={item} /></SwiperSlide>
                        })}
                    </Swiper>
                </div>
            </div>
        </div>
    )
}

export default Products
