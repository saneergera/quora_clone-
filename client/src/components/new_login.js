import React from "react";
import PropTypes from "prop-types";
import Chips from "./topics";
import LocationStore from "../stores/Mystore";
import LocationActions from "../actions/MyActions";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";

import { Initial } from "react-initial";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.data = props.commonProps.data;

    this.state = LocationStore.getState();
    this.bio = "I Love Quora";
  }

  componentWillMount() {
    LocationStore.listen(this.onChange);
    LocationActions.getTopics();
  }

  componentWillUnmount() {
    LocationStore.unlisten(this.onChange);
  }

  onChange = state => {
    this.setState(state);
  };
  getData = val => {
    // do not forget to bind getData in constructor
    this.topics = val;
  };
  storeBio = e => {
    this.bio = e.target.value;
  };
  updateuser = () => {
    LocationActions.updateData(this.bio, this.topics);
  };
  render() {
    if (this.state.topics === null) {
      return (
        <div style={{ textAlign: "center" }}>
          <img src="../spinner.gif" />
        </div>
      );
    }

    if (this.state.topics !== null) {
      return (
        <div
          className="container"
          style={{
            background: "url('../quora_logo.png')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "50% 100%"
          }}
        >
          <div style={{ textAlign: "center", color: "#aa4034" }}>
            <h1>Welcome To Quora First Time User</h1>
          </div>
          <Avatar
            style={{
              position: "relative",
              left: "40%",
              height: "100px",
              width: "100px",
              margin: "30px"
            }}
          >
            {this.data.Name.charAt(0)}
          </Avatar>

          <form>
            <div class="form-group">
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                value={this.data.email}
                disabled
              />
              <small id="emailHelp" class="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div class="form-group">
              <input
                type="Name"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                value={this.data.Name}
                disabled
              />
            </div>
            <div class="form-group">
              <label for="exampleFormControlTextarea1">Bio</label>
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                onChange={event => {
                  this.storeBio(event);
                }}
              />
            </div>
          </form>
          <p>{"Select your topics of interest"}</p>
          <Chips sendData={this.getData} topics={this.state.topics} />
          <button
            onClick={() => {
              this.updateuser();
            }}
            class="button button4"
            style={{ float: "right", backgroundColor: "#730d02" }}
          >
            Create profile
          </button>
        </div>
      );
    }
  }
}

export default Form;
