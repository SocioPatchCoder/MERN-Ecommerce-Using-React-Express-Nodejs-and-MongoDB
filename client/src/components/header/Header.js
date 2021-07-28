import React, { useContext, useState } from 'react'
import {GlobalState} from "../../GlobalState"
import {Link} from "react-router-dom";

import Menu from "./icons/bar.svg"
import Cart from "./icons/cart.svg"
import Close from "./icons/close.svg"  // go to fontawesome to download the icons....
import "./Header.css"
import axios from 'axios';

function Header() {
    const state = useContext(GlobalState)
    const [isLogged, setIsLogged] = state.userAPI.isLogged
    const [isAdmin, setIsAdmin] = state.userAPI.isAdmin
   const [cart] = state.userAPI.cart
    const adminRouter = () =>{
        return (
            <>
            <li><Link to="/create_product">Create Product</Link></li>
            <li><Link to="/category">Categories</Link></li>
            </>
        )
    }
const loggedOut = async () =>{
    await axios.get('/user/logout')
    localStorage.clear()
    setIsAdmin(false)
    setIsLogged(false)
}
    const loggedRouter = () =>{
        return (
            <>
            <li><Link to="/history">history</Link></li>
            <li><Link to="/" onClick={loggedOut}>Logout</Link></li>
            </>
        )
    }
    const [menu, setMenu] = useState(false)

    const toggleMenu = () => {
        setMenu(!menu)
    }

    const styleMenu = {
        left: menu ? 0 : "-100%"
    }
    return (
        <header>
          <div className="menu" onClick={()=>setMenu(!menu)}>
              <img src={Menu} alt="" width="30"/>
          </div>
          <div className="logo">
              <h1>
                <Link to="/">{isAdmin ? 'Admin' : 'My Shop'}</Link>
              </h1>
          </div>

          <ul style={styleMenu}>
              <li><Link to="/">{isAdmin ? 'Products' : 'Shop'}</Link></li>
              {
                  isAdmin && adminRouter()
              }{
                  isLogged ? loggedRouter() :  <li><Link to="/login">Login & Register</Link></li>
              }
             
              <li onClick={()=>setMenu(!menu)}>
                  <img src={Close} alt="" width="30" className="menu"/>
              </li>
          </ul>
{       isAdmin ?  ' '
          : <div className="cart-icon">
              <span>{cart.length}</span>
              <Link to="/cart">
                  <img src={Cart} alt="" width="40"/>
              </Link>
          </div>
}
        </header>
    )
}

export default Header
