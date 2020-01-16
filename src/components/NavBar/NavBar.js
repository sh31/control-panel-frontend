import React from "react";
import "./NavBar.scss";
import { Link } from "react-router-dom";
import { useUserContext } from "../../UserContext";

const PageLink = props => {
  const pageNames = {
    tools: "Analytical Tools",
    data: "Data",
    admin: "Administration",
    loading: "Loading"
  };

  if (props.current) {
    return (
      <Link
        className="moj-primary-navigation__link"
        aria-current="page"
        to={props.path}>
        {pageNames[props.path]}
      </Link>
    );
  } else {
    return (
      <Link className="moj-primary-navigation__link" to={props.path}>
        {pageNames[props.path]}
      </Link>
    );
  }
};

const NavItems = () => {
  const { pages } = useUserContext();

  const items = pages.map(item => (
    <li className="moj-primary-navigation__item" key={item}>
      <PageLink
        path={item}
        current={window.location.pathname.startsWith(`/${item}`)}
      />
    </li>
  ));

  return <ul className="moj-primary-navigation__list">{items}</ul>;
};

const NavBar = props => {
  return (
    <div className="moj-primary-navigation">
      <div className="moj-primary-navigation__container">
        <div className="moj-primary-navigation__nav">
          <nav
            className="moj-primary-navigation"
            aria-label="Primary navigation">
            <NavItems />
          </nav>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
