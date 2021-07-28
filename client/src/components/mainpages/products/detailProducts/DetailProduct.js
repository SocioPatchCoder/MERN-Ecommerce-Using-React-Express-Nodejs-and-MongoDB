import React ,{useContext, useEffect, useState} from 'react'
import {useParams , Link}  from "react-router-dom";
import {GlobalState} from "../../../../GlobalState"
import ProductItem from "../../utils/Product_item/ProductItem"

import "./DetailProduct.css"
function DetailProduct() {
    const params = useParams();
    const state = useContext(GlobalState)
    const [products]= state.productsAPI.products
    const[detailProduct,setDetailProduct] = useState([])

    useEffect(()=>{
        if(params.id){
            products.forEach(product =>{
                if(product._id === params.id) setDetailProduct(product)
            })
        }
    },[products,params.id])

    console.log(detailProduct)
    if(detailProduct.length === 0) return 0;
    return (
        <>
        <div className="detail">
            <img src={detailProduct.images.url} alt=""/>
            <div className="box-detail">
                <div className="row">
                    <h2>{detailProduct.title}</h2>
                    <h6>ID: {detailProduct.product_id}</h6>
                </div>
                <h5>${detailProduct.price}</h5>
                <p> <h4 style={{textDecoration:'underline' , color:'whitesmoke'}}>Content:</h4> {detailProduct.content}</p>
                <p><h4 style={{textDecoration:'underline' , color:'whitesmoke'}}>Description : </h4>{detailProduct.description}</p>
                <p>SOLD:  {detailProduct.sold}</p>
                <Link to="/cart" className="cart">BUY NOW</Link>
            </div>
        </div>
        <div>
            <h2>Related Products</h2>
            <div className="products">
                {
                    products.map(product => {
                        return product.category === detailProduct.category
                        ? <ProductItem key={product._id} product={product}/> : null
                    })
                }
            </div>
        </div>
        </>
    )
}

export default DetailProduct
