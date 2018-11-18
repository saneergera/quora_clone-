import React from "react";
import PropTypes from "prop-types";
import "../../style/navbar.css";

import Sidebar from "./navbar";
class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { counter: "" };
    this.value = props.information;

    this.value.data.data.Notifications.map(element => {
      if (element.Read === false) {
        this.state.counter++;
      }
    });
  }
  addHref = (even, ele) => {
    even.preventDefault();

    var strLink = ele.Link;

    window.location.href = strLink;
  };
  Toggle = () => {
    document.getElementById("dropdown1").classList.toggle("hidden");

    document.getElementById("badge").classList.add("hidden");
    this.state.counter = "";
  };
  render() {
    const a = this.value.data.data.Notifications.map((element, index) => {
      return (
        <li key={index}>
          <a
            onClick={event => {
              this.addHref(event, element);
            }}
          >
            {element.Body}
          </a>
        </li>
      );
    });
    return (
      <div className="navbar-fixed">
        <nav style={{ backgroundColor: "white" }}>
          <div className="nav-wrapper container">
            <a className="brand-logo" style={{ color: "#b93026" }}>
              Quora
            </a>
            <ul className="right hide-on-med-and-down ">
              <li>
                <a href="/" style={{ color: "#b93026" }}>
                  Feed
                </a>
              </li>
              <li>
                <a style={{ color: "#b93026" }} onClick={this.Toggle}>
                  Notifications
                  <span id="badge" className="new badge">
                    {this.state.counter}
                  </span>
                </a>
              </li>
              <li>
                <a href="/myquestion" style={{ color: "#b93026" }}>
                  My questions
                </a>
              </li>

              <li>
                <a href="/api/log_out" style={{ color: "#b93026" }}>
                  Logout
                </a>
              </li>
            </ul>
            <ul id="dropdown1" className="dropdown-content hidden">
              {a}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
