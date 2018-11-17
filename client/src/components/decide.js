import React from "react";
import PropTypes from "prop-types";

import LocationStore from "../stores/Mystore";
import LocationActions from "../actions/MyActions";
import Login from "./login";
import Form from "./new_login";
import Home from "./home";

class Componentss extends React.Component {
  constructor(props) {
    super(props);
    this.state = LocationStore.getState();
  }

  componentDidMount() {
    LocationStore.listen(this.onChange);
    LocationActions.fetchData();
    LocationActions.getTopics();
  }

  componentWillUnmount() {
    LocationStore.unlisten(this.onChange);
  }

  onChange = state => {
    this.setState(state);
  };

  render() {
    if (this.state.data == null) {
      return (
        <div style={{ textAlign: "center" }}>
          <img src="../spinner.gif" />
        </div>
      );
    }

    if (this.state.data.data === "") {
      return <Login />;
    } else {
      if (this.state.data.data.NewUser) {
        return <Form commonProps={this.state.data} />;
      } else {
        return <Home commonProps={this.state.data} />;
      }
    }
  }
}

export default Componentss;
