import { Swiper, SwiperSlide } from 'swiper/react';
import './Style/AllProductsPage.css'

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import image1 from '../assets/img/bannar1_Products_Page.png'
import image2 from '../assets/img/bannar2_Products_Page.png'
import image3 from '../assets/img/bannar3_Products_Page.png'
import image4 from '../assets/img/bannar4_Products_Page.png'


import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { useEffect, useState } from 'react';
import ProductCard from '../components/Products/components/ProductCard';

function AllProductsPage() {
    const [categoryList, setCategoryList] = useState([])
    const [activeCategory, setActiveCategory] = useState("beauty")
    const [products, setProducts] = useState([])
    useEffect(() => {
        fetch("https://dummyjson.com/products/category-list")
            .then(res => res.json())
            .then(data => {
                const categories = data.slice(0, -1)
                setCategoryList(categories)
                setActiveCategory(categories[0] ?? "")
            })
    }, [])

    const fetchProducs = async (category) => {
        const res = await fetch(`https://dummyjson.com/products/category/${category}`)
        const data = await res.json()
        return setProducts(data.products)
    }

    useEffect(() => {
        fetchProducs(activeCategory)
    }, [activeCategory])

    console.log(products)

    // console.log(categoryList)
    return (
        <>
            <div className="allProductsPage">
                <div className="container">
                    <div className="topContainer heroBanner">
                        <Swiper
                            loop={true}
                            autoplay={{
                                delay: 2000,
                                disableOnInteraction: false
                            }}
                            spaceBetween={30}
                            effect={'fade'}
                            navigation={true}
                            pagination={{
                                clickable: true,
                            }}
                            modules={[Autoplay, EffectFade, Navigation, Pagination]}
                            className="mySwiper"
                        >
                            <SwiperSlide>
                                <img src={image1} />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src={image2} />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src={image3} />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src={image4} />
                            </SwiperSlide>
                        </Swiper>
                    </div>
                    <div className="bottomContainer">
                        <div className="heading">
                            <h2>All Products</h2>
                        </div>
                        <div className="btnsFilter">
                            {categoryList.map((category, index) => (
                                <button
                                    onClick={() => {
                                        setActiveCategory(category)
                                    }}
                                    key={category}
                                    className={`filterBtn ${activeCategory === category ? "active" : ""
                                        }`}
                                    style={{ "--i": index }}
                                >
                                    <span>{category}</span>
                                </button>
                            ))}
                        </div>
                        <div className="productsContainerShow">
                            {products.map((product) => {
                                return <ProductCard key={product.id} item={product} />
                            })
                            }
                            {/* <Products
                                title={activeCategory.replace("-", " ")}
                                data={products}
                            /> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AllProductsPage
