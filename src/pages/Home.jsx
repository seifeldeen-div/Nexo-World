import { useEffect, useState } from 'react'
import Header from '../components/header/Header'
import Hero from '../components/Hero/Hero'
import Products from '../components/Products/Products'
import './Style/Home.css'

function Home() {
    const [produts, setProducts] = useState([])
    const [isloading, setIsLoading] = useState(true)

    const categories = [
        'laptops',
        'smartphones',
        'tablets',
        'mens-watches',
        // 'beauty',
        // 'vehicle',
        // 'motorcycle',
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
                <h1>Loading....</h1>
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
