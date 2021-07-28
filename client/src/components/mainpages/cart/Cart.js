import React, {useContext, useState, useEffect} from 'react'
import {GlobalState} from "../../../GlobalState"
import {Link} from "react-router-dom"
import axios from "axios"

import "./Cart.css"
function Cart() {
    const state = useContext(GlobalState)
    const [cart, setCart] = state.userAPI.cart
    const [total, setTotal] = useState(0)
   const [token] = state.token
    useEffect(()=>{
            const getTotal = () =>{
                const total = cart.reduce((prev,item)=>{
                    return prev + (item.price * item.quantity)
             
                },0)
                setTotal(total)
            }
                getTotal()
    },[cart])

    const addToCart = async () =>{
        await axios.patch('/user/addcart', {cart}, {
            headers: {Authorization : token}
        })
    }

    const increment =( id) =>{
        cart.forEach(item =>{
            if(item._id === id){
                item.quantity += 1
            }
        })
        setCart ([...cart])
        addToCart()
    }
    const decrement =( id) =>{
        cart.forEach(item =>{
            if(item._id === id){
                item.quantity === 1 ? item.quantity = 1 : item.quantity -=1
            }
        })
        setCart ([...cart])
        addToCart()
    }

    const removeProduct = (id) =>{
        if(window.confirm("Do you want to delete this Product")){
            cart.forEach((item, index)=>{
                if(item._id === id){
                    cart.splice(index,1)
                }
            })
       setCart([...cart])
       addToCart()
        }
    }
    if(cart.length === 0) return <h2 style={{textAlign:'center' , fontSize:"5rem"}}>Cart Empty</h2>
    return (
        <div>
        {
            cart.map(product => (
                <div className="detail cart">
                <img src={product.images.url} alt="" className="img_container"/>
                <div className="box-detail">
                    
                <h2>{product.title}</h2>
                       
                    
                <h5>${product.price * product.quantity}</h5>
                    <p> <h4 style={{textDecoration:'underline' , color:'whitesmoke'}}>Content : </h4>{product.content}</p>
                    <p> <h4 style={{textDecoration:'underline' , color:'whitesmoke'}}>Description : </h4>{product.description}</p>
                    <div className="amount">
                        <button onClick={()=> decrement(product._id)}> - </button>
                        <span>{product.quantity}</span>
                        <button  onClick={()=> increment(product._id)}> + </button>
                    </div>
                 <div className="delete" onClick={()=>removeProduct(product._id)}> x </div>
                
            </div>
            </div>
            ))
        }
        <div className="total">
            <h3>Total : $ {total}</h3>
            <Link to="#"> Payment</Link>
        </div>
        </div>
    )
}

export default Cart
