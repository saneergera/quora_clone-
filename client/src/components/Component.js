import React from "react";
import PropTypes from "prop-types";

import LocationStore from "../stores/Mystore";
import LocationActions from "../actions/MyActions";

class Componentss extends React.Component {
  constructor(props) {
    super(props);
    this.state = LocationStore.getState();
  }

  componentDidMount() {
    LocationStore.listen(this.onChange);
    LocationActions.fetchData();
  }

  componentWillUnmount() {
    LocationStore.unlisten(this.onChange);
  }

  onChange = state => {
    this.setState(state);
  };

  activateLasers() {
    LocationActions.updateLocations("India");
  }

  tentDepth() {
    LocationActions.tentDepth("Hello");
  }

  render() {
    return <h1>0</h1>;
  }
}

export default Componentss;
