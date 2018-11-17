import React from "react";
import PropTypes from "prop-types";

class Topic extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  render() {
    return <h1>View Topics</h1>;
  }
}

export default Topic;
