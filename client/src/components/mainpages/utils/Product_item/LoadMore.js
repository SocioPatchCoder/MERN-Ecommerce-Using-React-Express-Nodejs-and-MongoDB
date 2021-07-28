import React , {useContext} from 'react'
import "./Filter.css"
import {GlobalState} from "../../../../GlobalState"

function LoadMore() {
    const state =useContext(GlobalState)
    const [products, setProducts] = state.productsAPI.products
    const [category, setCategory] = state.productsAPI.category
    const [categories] = state.categoriesAPI.categories

    const [sort, setSort] = state.productsAPI.sort
    const [search, setSearch] = state.productsAPI.search
    const [page, setpage] = state.productsAPI.page
    const [result, setResult] = state.productsAPI.result
    
    return (
        <div className="load_more">
            {
                result < page * 9 ? ""
                : <button onClick={()=>setpage(page + 1)}>Load More</button>
            }
            
        </div>
    )
}

export default LoadMore
