import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ProductCard from "../components/Products/components/ProductCard"
import './Style/CategoryProducts.css'
import PageTransition from "../components/PageTransition"

function CategoryProducts() {
    const { categoryName } = useParams()
    const [categoryProducts, setCategoryProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        fetch(`https://dummyjson.com/products/category/${categoryName}`)
            .then(res => res.json())
            .then(data => {
                setCategoryProducts(Array.isArray(data.products) ? data.products : [])
                setIsLoading(false)
            })
            .catch(() => {
                setCategoryProducts([])
                setIsLoading(false)
            })
    }, [categoryName])

    const formatCategoryName = (name) =>
        String(name || 'Category').replace(/-/g, ' ')

    return (
        <PageTransition>
            <div className="categoryProductsPage">
                <div className="container">
                    <section className="categoryIntro">
                        <div className="categoryMeta">
                            <span className="categoryTag">Collection</span>
                            <span className="categoryCount">
                                {isLoading ? 'Loading...' : `${categoryProducts.length} products`}
                            </span>
                        </div>
                        <h1>{formatCategoryName(categoryName)}</h1>
                        <p>
                            Discover premium picks selected for the <strong>{formatCategoryName(categoryName)}</strong> collection.
                        </p>
                    </section>

                    <section className="productsGridWrap">
                        {isLoading ? (
                            <div className="emptyCategory">Loading products...</div>
                        ) : categoryProducts.length > 0 ? (
                            <div className="categoryProductsGrid">
                                {categoryProducts.map((item) => (
                                    <ProductCard key={item.id} item={item} />
                                ))}
                            </div>
                        ) : (
                            <div className="emptyCategory">No products found in this category.</div>
                        )}
                    </section>
                </div>
            </div>
        </PageTransition>
    )
}

export default CategoryProducts
