import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";
import DoneIcon from "@material-ui/icons/Done";
import "../style/pills.css";
import LocationStore from "../stores/Mystore";
import LocationActions from "../actions/MyActions";

class Pills extends React.Component {
  constructor(props) {
    super(props);
    this.topics = [];
    this.state = LocationStore.getState();
  }

  componentWillMount() {
    LocationStore.listen(this.onChange);

    this.generateArray(this.state.topics);
  }

  componentWillUnmount() {
    LocationStore.unlisten(this.onChange);
  }

  onChange = state => {
    this.setState(state);
  };

  finaltopics = [];
  addTopic(ele) {
    var index = this.finaltopics.indexOf(ele);

    if (this.finaltopics.indexOf(ele) === -1) {
      this.finaltopics.push(ele);
    } else {
      this.finaltopics.splice(index, 1);
    }

    var a = document.getElementById(ele);
    a.classList.toggle("disabled");

    this.props.sendData(this.finaltopics);
  }
  generateArray(element) {
    element.map(element => {
      this.topics.push(element.Name);
    });
  }

  render() {
    if (this.state.topics === null) {
      return <h1>loading</h1>;
    }
    if (this.state.topics) {
      var a = this.topics.map((element, index) => {
        return (
          <button
            id={element}
            className="button"
            key={index}
            onClick={() => {
              this.addTopic(element);
            }}
          >
            {element}
          </button>
        );
      });

      return <div>{a}</div>;
    }
  }
}

export default Pills;
