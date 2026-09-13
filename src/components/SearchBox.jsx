import { useEffect, useState } from "react"
import { FaSearch } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

function SearchBox() {

    const [search, setSearch] = useState("")
    const [suggestions, setSuggestions] = useState([])

    const navigate = useNavigate()

    const searchOperation = (e) => {
        e.preventDefault()
        if (search.trim()) {
            navigate(`/search?query=${encodeURIComponent(search.trim())}`)
        }
        setSuggestions([])
    }

    const openProduct = (suggest) => {
        setSuggestions([])
        navigate(`/products/${suggest.id}`)
    }

    useEffect(() => {
        const fetchSuggestions = async () => {

            if (!search.trim()) {
                setSuggestions([])
                return
            }

            try {
                const res = await fetch(`https://dummyjson.com/products/search?q=${search}`)
                const data = await res.json()
                setSuggestions(Array.isArray(data.products) ? data.products.slice(0, 5) : [])
            }
            catch (error) {
                console.log(Error(error))
                setSuggestions([])
            }
        }

        fetchSuggestions()

        // const debpounce = setTimeout(() => {
        //     fetchSuggestions()
        // }, 300)

        // return () => clearTimeout(debpounce)
    }, [search])

    return (
        <div className="searchBoxWrapper">
            <form action="" className="searchBox" onSubmit={searchOperation}>
                <input type="text" name="search" id="search" placeholder="Search For Products" autoComplete="off" onChange={(e) => {
                    setSearch(e.target.value)
                }} />
                <button type="submit" >
                    <FaSearch />
                </button>
            </form>

            {suggestions.length > 0 && (
                <ul className="searchSuggestions">
                    {suggestions.map((suggest) => {
                        return (
                            <li className="searchSuggestionItem" key={suggest.id}>
                                <button type="button" className="searchSuggestion" onClick={() => openProduct(suggest)}>
                                    <img className="suggestionImage" src={suggest.images?.[0]} alt={suggest.title} />
                                    <span className="suggestionText">
                                        <span className="suggestionTitle">{suggest.title}</span>
                                        <span className="suggestionMeta">
                                            <span className="suggestionCategory">{suggest.category}</span>
                                            <span className="suggestionPrice">${suggest.price}</span>
                                        </span>
                                    </span>
                                    <span className="suggestionIcon">
                                        <FaSearch />
                                    </span>
                                </button>
                            </li>
                        )
                    })}
                </ul>
            )}
        </div>
    )
}

export default SearchBox
