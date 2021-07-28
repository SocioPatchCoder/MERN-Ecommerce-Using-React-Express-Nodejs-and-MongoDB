import React, {useContext, useState} from 'react'
import {GlobalState} from "../../../../GlobalState"
import {Link} from "react-router-dom"
import "./ProductItem.css"
import axios from 'axios';
import Loading from '../Loading/Loading';
import Products from '../../products/Products';

function ProductItem({product, isAdmin,deleteProduct, callback, setCallback,products, setProducts}) {
    const state = useContext(GlobalState)
    const addCart = state.userAPI.addCart
    const [token]= state.token;
    const [loading, setLoading] = useState(false)

    // const deleteProduct =async  () => {

    
    //     try {
    //         setLoading(true)
    //         const destroyImg = axios.post(`/api/destroy`, {public_id: product.images.public_id},{
    //             headers: {Authorization: token}
    //         })
    //         const deleteProdukt = axios.delete(`/api/products/${product._id}`,{
    //             headers: {Authorization: token}
    //         })
    //         await destroyImg
    //         await deleteProdukt
    //         setLoading(false)
    //         setCallback(!callback)
    //     } catch (err) {
    //         alert(err.response.data.msg)
    //     }
    // }

    const handleCheck = (id) => {
        products.forEach(product => {
            if(product._id === id) product.checked = !product.checked
        })
        setProducts([...products])
        
    }
    if(loading) return <div className="product_card"><Loading/></div>
    return (
        <div className="product_card">
            {
                isAdmin && <input type="checkbox" checked={product.checked} onChange={()=>handleCheck(product._id)}/>
            }
            <img src={product.images.url} alt=""/>

            <div className="product_box">
                <h2>{product.title}</h2>

                <h1>${product.price}</h1>
                <p>{product.description}</p>

            </div>
            <div className="row_btn">
                { isAdmin ? <>
                <Link  id="btn_buy" to="#!" onClick={()=>deleteProduct(product._id, product.images.public_id)}>
                    DELETE
                </Link>
                <Link id="btn_view" to={`/edit_product/${product._id}`}>
                    EDIT
                </Link>
                </>:
                <>
                 <Link  id="btn_buy" to="#!" onClick={()=>addCart(product)}>
                    BUY
                </Link>
                <Link id="btn_view" to={`/detail/${product._id}`}>
                    View
                </Link>
                </>
               }
            </div>
                
        </div>
    )
}

export default ProductItem
