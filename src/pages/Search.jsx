import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import ProductCard from "../components/Products/components/ProductCard"
import './Style/Search.css'

function Search() {
    const location = useLocation()
    const query = new URLSearchParams(location.search).get("query") || ""
    const [searchResult, setSearchResult] = useState([])

    useEffect(() => {
        const cleanQuery = query.trim()

        if (!cleanQuery) {
            setSearchResult([])
            return
        }

        fetch(`https://dummyjson.com/products/search?q=${encodeURIComponent(cleanQuery)}`)
            .then(res => res.json())
            .then(data => setSearchResult(Array.isArray(data.products) ? data.products : []))
            .catch(() => setSearchResult([]))
    }, [query])

    return (
        <div className="searchPage">
            <div className="container">
                <div className="searchHeader">
                    <h1>Search Results</h1>
                    <span className="searchQuery">{query}</span>
                </div>

                <div className="products">
                    {searchResult.length > 0 ? (
                        searchResult.map((item) => <ProductCard key={item.id} item={item} />)
                    ) : (
                        <div className="emptySearch">No products found</div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Search
