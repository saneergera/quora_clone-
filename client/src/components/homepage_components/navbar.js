import React from "react";
import PropTypes from "prop-types";
import "../../style/navbar.css";
import Sidebar from "./navbar";
class Navbar extends React.Component {
  counter = 0;
  constructor(props) {
    super(props);

    this.value = props.information;

    this.value.data.data.Notifications.map(element => {
      if (element.Read === false) {
        this.counter++;
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
    this.counter = "";
  };
  render() {
    const a = this.value.data.data.Notifications.map(element => {
      return (
        <li>
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
      <div class="navbar-fixed">
        <nav style={{ backgroundColor: "white" }}>
          <div class="nav-wrapper container">
            <a href="#!" class="brand-logo" style={{ color: "#b93026" }}>
              Quora
            </a>
            <ul class="right hide-on-med-and-down ">
              <li>
                <a href="/" style={{ color: "#b93026" }}>
                  Feed
                </a>
              </li>
              <li>
                <a style={{ color: "#b93026" }} onClick={this.Toggle}>
                  Notifications
                  <span id="badge" class="new badge">
                    {this.counter}
                  </span>
                </a>
              </li>

              <li>
                <a href="badges.html" style={{ color: "#b93026" }}>
                  Answers
                </a>
              </li>
              <li>
                <a href="api/log_out" style={{ color: "#b93026" }}>
                  Logout
                </a>
              </li>
            </ul>
            <ul id="dropdown1" class="dropdown-content hidden">
              {a}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
