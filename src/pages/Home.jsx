import { useEffect, useState } from 'react'
import Header from '../components/header/Header'
import Hero from '../components/Hero/Hero'
import Products from '../components/Products/Products'
import './Style/Home.css'
import { BeatLoader } from 'react-spinners'
import SlideProductLoading from '../components/Products/components/SlideProductLoading'

function Home() {
    const [produts, setProducts] = useState([])
    const [isloading, setIsLoading] = useState(true)

    const categories = [
        'laptops',
        'smartphones',
        'tablets',
        'mens-watches',
        'motorcycle',
        // 'beauty',
        // 'vehicle',
        // 'sports-accessories',
    ]
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const result = await Promise.all(
                    categories.map(async (category) => {
                        const res = await fetch(`https://dummyjson.com/products/category/${category}`)
                        const data = await res.json()
                        return { [category]: data.products }
                    })
                )
                const productsData = Object.assign({}, ...result)
                setProducts(productsData)
            } catch (error) {
                console.log('Error Happend While Featching Data' + error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchProducts()
    }, [])

    return (
        <>
            <Hero />
            {isloading ? (
                // <div className="spinner">
                //         <BeatLoader
                //             color="#0090f0"
                //             cssOverride={{
                //                 margin: '10px 0 0 0'
                //             }}
                //             margin={1}
                //             size={23}
                //         />
                // </div>
                <SlideProductLoading />
            ) : (
                categories.map((category) => {
                    return (
                        <Products key={category} title={category.replace("-", " ")} data={produts[category]} />
                    )
                })
            )}
        </>
    )
}

export default Home
