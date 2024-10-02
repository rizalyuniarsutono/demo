import React, { useContext, useEffect, useReducer, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Collapse } from 'react-bootstrap';
import { Modal } from "react-bootstrap";
/// Link
import { Link } from "react-router-dom";
import { MenuList } from "./Menu";
import foodServing from "../../../images/food-serving.png";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
// import { ThemeContext } from "../../../context/ThemeContext";

const reducer = (previousState, updatedState) => ({
  ...previousState,
  ...updatedState,
});

const initialState = {
  active: "",
  activeSubmenu: "",
}

const SideBar = () => {
  var d = new Date();

  // const {
  // 	iconHover,
  // 	sidebarposition,
  // 	headerposition,
  // 	sidebarLayout,
  //   ChangeIconSidebar,  
  // } = useContext(ThemeContext);

  const [addMenus, setAddMenus] = useState(false);
  const [state, setState] = useReducer(reducer, initialState);
  const [menuList, setMenuList] = useState([]);
  let handleheartBlast = document.querySelector('.heart');
  function heartBlast() {
    return handleheartBlast.classList.toggle("heart-blast");
  }

  const [hideOnScroll, setHideOnScroll] = useState(true)
  useScrollPosition(
    ({ prevPos, currPos }) => {
      const isShow = currPos.y > prevPos.y
      if (isShow !== hideOnScroll) setHideOnScroll(isShow)
    },
    [hideOnScroll]
  )


  const handleMenuActive = status => {
    setState({ active: status });
    if (state.active === status) {
      setState({ active: "" });
    }
  }
  const handleSubmenuActive = (status) => {
    setState({ activeSubmenu: status })
    if (state.activeSubmenu === status) {
      setState({ activeSubmenu: "" })
    }
  }


  /// Path
  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];

  /// Active menu
  useEffect(() => {
    const accessRole = localStorage.getItem("accessRole");
    setMenuList(MenuList.filter((menu) => menu.role.includes(accessRole)));
  }, []);


  return (
    <div className="deznav">
      <PerfectScrollbar className="deznav-scroll">
        <ul className="metismenu" id="menu">
          {console.log(MenuList)}
          {menuList.map((data, index) => {
            let menuClass = data.classsChange;
            if (menuClass === "menu-title") {
              return (
                <li className={menuClass} key={index} >{data.title}</li>
              )
            } else {
              return (
                <li className={` ${state.active === data.title ? 'mm-active' : ''}`}
                  key={index}
                >
                  {data.content && data.content.length > 0 ?
                    <Link to={"#"}
                      className="has-arrow"
                      onClick={() => { handleMenuActive(data.title) }}
                    >
                      {data.iconStyle}{" "}
                      <span className="nav-text">{data.title}</span>
                    </Link>
                    :
                    <Link to={data.to} >
                      {data.iconStyle}
                      <span className="nav-text">{data.title}</span>
                    </Link>
                  }
                  <Collapse in={state.active === data.title ? true : false}>
                    <ul className={`${menuClass === "mm-collapse" ? "mm-show" : ""}`}>
                      {data.content && data.content.map((data, index) => {
                        return (
                          <li key={index}
                            className={`${state.activeSubmenu === data.title ? "mm-active" : ""}`}
                          >
                            {data.content && data.content.length > 0 ?
                              <>
                                <Link to={data.to} className={data.hasMenu ? 'has-arrow' : ''}
                                  onClick={() => { handleSubmenuActive(data.title) }}
                                >
                                  {data.title}
                                </Link>
                                <Collapse in={state.activeSubmenu === data.title ? true : false}>
                                  <ul className={`${menuClass === "mm-collapse" ? "mm-show" : ""}`}>
                                    {data.content && data.content.map((data, index) => {
                                      return (
                                        <>
                                          <li key={index}>
                                            <Link className={`${path === data.to ? "mm-active" : ""}`} to={data.to}>{data.title}</Link>
                                          </li>
                                        </>
                                      )
                                    })}
                                  </ul>
                                </Collapse>
                              </>
                              :
                              <Link to={data.to}>
                                {data.title}
                              </Link>
                            }

                          </li>

                        )
                      })}
                    </ul>
                  </Collapse>
                </li>
              )
            }
          })}
        </ul>
      </PerfectScrollbar>
    </div>
  );
}

export default SideBar;
