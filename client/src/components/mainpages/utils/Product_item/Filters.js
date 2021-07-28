import React , {useContext} from 'react'
import "./Filter.css"
import {GlobalState} from "../../../../GlobalState"

function Filters() {
    const state =useContext(GlobalState)
    const [products, setProducts] = state.productsAPI.products
    const [category, setCategory] = state.productsAPI.category
    const [categories] = state.categoriesAPI.categories

    const [sort, setSort] = state.productsAPI.sort
    const [search, setSearch] = state.productsAPI.search
    const [page, setpage] = state.productsAPI.page
    const [result, setResult] = state.productsAPI.result

    const handleCategory = (e) =>{
        setCategory(e.target.value)
    }
    return (
        <div className="filter_menu">
            <div className='row'>
                <span>Filters:</span>
                <select name="category" value={category} onChange={handleCategory}>
                    <option value="">All Products</option>
                    {
                        categories.map(category => (
                            <option value={"category=" + category._id} key={category._id}>
                                {category.name}
                            </option> 
                        ))
                    }
                </select>
            </div>
            <input type="text" value={search} placeholder="Enter the name for search"
            onChange={e => setSearch(e.target.value.toLowerCase())}/>

        <div className='row'>
                <span>Sort:</span>
                <select  value={sort} onChange={e =>setSort(e.target.value)}>
                    <option value="">Newest</option>
                    <option value="sort=oldest">Oldest</option>
                    <option value="sort=-sold">Best Sales</option>
                    <option value="sort=-price">Price: High-Low</option>
                    <option value="sort=price">Price: Low-High</option>
                </select>
            </div>
        </div>
    )
}

export default Filters
