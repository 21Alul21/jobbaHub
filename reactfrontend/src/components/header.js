import "../components.css";
import { Link } from "react-router-dom";
import PostJob from "../pages/post_job";
import { useState } from "react";

const Header = () => {
  const [hamburgerState, setHamburgerState] = useState(false);
  const [color, setColor] = useState("white");

  const handleHamburgerMenu = () => {
    setHamburgerState(!hamburgerState);

    return color === "white" ? setColor("red") : setColor("white");
  };

  return (
    <>
      <header>
        <nav>
          <div className="logo">
            <Link className="Link" to="/">
              Jobba Hub
            </Link>
          </div>
          <ul className="not-menu">
            <li>
              <Link to="/jobs-posted/">Jobs Posted</Link>
            </li>

            <li>
              <Link to="/jobs-applied/">Job Applications</Link>
            </li>

            {!localStorage.getItem("access") && (
              <li>
                <Link className="Link" to="/post-job/">
                  Post Job Opening
                </Link>
              </li>
            )}
          </ul>
          <ul className="not-menu">
            <li>
              <Link to="/profile/">Profile</Link>
            </li>

            <li>
              <Link className="Link" to={"/login/"}>
                Sign in
              </Link>
            </li>

            <li>
              <Link to="/logout/">Logout</Link>
            </li>
          </ul>
          <HamburgerMenu
            onClick={handleHamburgerMenu}
            color={color}
            open={hamburgerState}
          />
        </nav>

        {hamburgerState && (
          <>
            <div className="menu">
              <ul>
                <li>
                  <Link to="/jobs-posted/">Jobs Posted</Link>
                </li>
                <hr />
                <li>
                  <Link to="/jobs-applied/">Job Applications</Link>
                </li>
                <hr />
                {!localStorage.getItem("access") && (
                  <li>
                    <Link className="Link" to="/post-job/">
                      Post Job Opening
                    </Link>
                  </li>
                )}
                <hr />
                <li>
                  <Link to="/profile/">Profile</Link>
                </li>
                <hr />
                <li>
                  <Link className="Link" to={"/login/"}>
                    Sign in
                  </Link>
                </li>

                <hr />
                <li>
                  <Link to="/logout/">Logout</Link>
                </li>
              </ul>
            </div>
          </>
        )}
      </header>
    </>
  );
};

function HamburgerMenu({ onClick, color, open }) {
  return (
    <button onClick={onClick} className="hamburger-menu">
      <span className={open ? "clicked" : ""}></span>
      <span className={open ? "clicked" : ""}></span>
      <span className={open ? "clicked" : ""}></span>
    </button>
  );
}
export default Header;
