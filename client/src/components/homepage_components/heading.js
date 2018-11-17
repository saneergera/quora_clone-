import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";

class Heading extends React.Component {
  constructor(props) {
    super(props);
    this.data = props.data.data.data;
    console.log(this.data);
  }

  render() {
    if (this.data !== "") {
      return <h1>HELLO</h1>;
    } else {
      return <Redirect to="/" />;
    }
  }
}

export default Heading;
