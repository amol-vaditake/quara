import { IconButton, makeStyles } from "@material-ui/core";
import { AccountCircle } from '@material-ui/icons';
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link , useNavigate} from "react-router-dom";
import { ReactComponent as MenuIcon } from "../assets/menu.svg";
import { ReactComponent as CloseMenu } from "../assets/x.svg";
import "./header.css";


const useStyles = makeStyles((theme) => ({
  item: {
    textDecoration: 'none',
    fontWeight: 600,
    padding: 10,
    '&:hover': {
      textDecoration: 'none',
    }
  },
  textWhite: {
    color: "#FFF"
  }
}))
const Navbar = () => {
  const classes = useStyles()
  let navigate = useNavigate()

  function goToTheRoute(route) {
    navigate(route)
  }

  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const { isAuthenticated, user } = useSelector(state => state.auth)


  console.log("IsAthenticated", isAuthenticated)
  console.log("user", user)
  return (
    <div className="header">
      <div className="logo-nav">
        <div className="logo-container">
          <a href="#" onClick={() => { goToTheRoute("/") }}>
            <img className="logo" src="/logo.png" alt="logo " />
          </a>
        </div>
        <ul className={click ? "nav-options active" : "nav-options"}>
          <li className="option" onClick={closeMobileMenu}>
            <Link to="/">Home</Link>
          </li>
          <li className="option" onClick={closeMobileMenu}>
            <Link to="/">About</Link>{" "}
          </li>
          <li className="option" onClick={closeMobileMenu}>
            <Link to="/">Community</Link>{" "}
          </li>
          {
            isAuthenticated ?
              <li className="option" style={{ cursor: "pointer" }} onClick={() => { goToTheRoute("/profile") }}>
                <div>
                  <div>
                    <IconButton
                      size="medium"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={() => { }}
                      color="inherit"
                      className={classes.textWhite}
                      style={{ margin: 0, padding: 0 }}
                    >
                      <AccountCircle />
                    </IconButton>
                    <span className={classes.textWhite}
                    > &nbsp;{user.name}</span>
                  </div>
                </div>
                {/* <Link to="/login">{user.name}</Link>{" "} */}
              </li>
              :
              <li className="option" onClick={closeMobileMenu}>
                <Link to="/login">Login</Link>{" "}
              </li>
          }

        </ul>
      </div>

      <div className="mobile-menu" onClick={handleClick}>
        {click ? (
          <CloseMenu style={{color:"#fff"}} className="menu-icon" />
        ) : (
          <MenuIcon  style={{color:"#fff"}}  className="menu-icon" />
        )}
      </div>
    </div>
  );
};

export default Navbar;
