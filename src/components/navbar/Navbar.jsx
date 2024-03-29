import React, { useEffect, useState } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { SlBasket } from "react-icons/sl";
import { useProductsContext } from "../../contexts/productsContext/ProductsContext";
import { AiOutlineMenuFold } from "react-icons/ai";
import { useAuthContext } from "../../contexts/authContext/AuthContext";
import { useBasketContext } from "../../contexts/basketContext/BasketContext";
import { Dropdown } from "react-bootstrap";

function Navbar() {
  const [isActive, setIsActive] = useState(false);
  const [menuStyle, setMenuStyle] = useState("");
  const { setSelectedCategory } = useProductsContext();
  const { isLoggedIn, logout } = useAuthContext();
  const { user } = useAuthContext();
  const { basketList } = useBasketContext();
  // console.log(isLoggedIn);
  useEffect(() => {
    isActive ? setMenuStyle("") : setMenuStyle("display-none");
  }, [isActive]);
  return (
    <div className="navbar">
      <div className="left">
        <div className="logo">
          <Link to={"/"} onClick={() => setSelectedCategory(null)}>
            E-Commerce
          </Link>
        </div>
        <div className="products">
          <Link to={"/"} onClick={() => setSelectedCategory(null)}>
            Products
          </Link>
        </div>
      </div>
      <div className="right">
        <div className="basket-logo">
          <Link to={"/cart"}>
            {basketList.length > 0 && <div>{basketList.length}</div>}
            <SlBasket />
          </Link>
        </div>
        {!isLoggedIn && (
          <>
            <div className="signup padding_right">
              <Link to={"/login"}>Login</Link>
            </div>
            <div className="signup">
              <Link to={"/signup"}>Register</Link>
            </div>
          </>
        )}
        {isLoggedIn && (
          <>
            <Dropdown>
              <Dropdown.Toggle
                variant="secondary"
                id="dropdown-basic"
                className="justify-content-center align-items-center"
              >
                <img
                  className="rounded-pill bg-white me-3"
                  style={{ width: "30px", height: "30px" }}
                  src={user.image}
                  alt=""
                  srcset=""
                />
                {user.firstName + " " + user.lastName}
              </Dropdown.Toggle>

              <Dropdown.Menu className="bg-dark">
                <Dropdown.Item as={Link} to="/profile">
                  Profile
                </Dropdown.Item>
                <Dropdown.Item as={Link} onClick={() => logout()} to="/">
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            {/* <div className="signup padding_right">
              <Link to={"/profile"}>Profile</Link>
            </div>
            <div className="signup padding_right">
              <Link to={"/"} onClick={() => logout()}>
                Logout
              </Link>
            </div> */}
          </>
        )}

        {/* 3-dot menu */}

        <div className="menu">
          <Link
            onClick={() => {
              isActive ? setIsActive(false) : setIsActive(true);
            }}
          >
            <AiOutlineMenuFold />
          </Link>
          <div className={`${menuStyle} menu-bar`}>
            <div className="menu">
              <Link onClick={() => setSelectedCategory(null)} to={"/"}>
                Home
              </Link>
            </div>
            <div className="basket-logo-menu menu">
              <Link to={"/cart"}>
                <span className="padding_right">Basket</span>
                {basketList.length > 0 && <span>({basketList.length})</span>}
              </Link>
            </div>
            <div className="menu">
              <Link to={"/categories"}>Categories</Link>
            </div>
            {isLoggedIn && (
              <>
                <div className="menu">
                  <Link to={"/profile"}>Profile</Link>
                </div>
                <div className="menu">
                  <Link onClick={() => logout()} to={"/"}>
                    Log out
                  </Link>
                </div>
              </>
            )}
            {!isLoggedIn && (
              <>
                <div className="signup-menu menu">
                  <Link to={"/login"}>Login</Link>
                </div>
                <div className="signup-menu menu">
                  <Link to={"/signup"}>Register</Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
