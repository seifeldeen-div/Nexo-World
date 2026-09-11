import { useState } from "react"
import { FaSearch } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

function SearchBox() {

    const [search, setSearch] = useState("")
    const navigate = useNavigate()

    const searchOperation = (e) => {
        e.preventDefault()
        search.trim() ?
            navigate(`/search?query=${encodeURIComponent(search.trim())}`) : null
    }

    return (
        <form action="" className="searchBox" onSubmit={searchOperation}>
            <input type="text" name="search" id="search" placeholder="Search For Products" onChange={(e) => {
                setSearch(e.target.value)
            }} />
            <button type="submit" >
                <FaSearch />
            </button>
        </form>
    )
}

export default SearchBox
