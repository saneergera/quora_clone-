import React from "react";
import PropTypes from "prop-types";
import TopicStore from "../stores/Topicstore";
import TopicActions from "../actions/TopicActions";
import Questionfield from "./homepage_components/questionfield";

class Topic extends React.Component {
  constructor(props) {
    super(props);

    this.state = TopicStore.getState();
  }

  componentWillMount() {
    TopicStore.listen(this.onChange);
  }

  componentWillUnmount() {
    TopicStore.unlisten(this.onChange);
  }
  onChange = state => {
    this.setState(state);
  };
  render() {
    console.log(this.state);

    if (this.state.feed !== null) {
      console.log(this.state);
      const a = this.state.feed.map(element => {
        return (
          <Questionfield
            data={element}
            intro={this.topics.Intro.toUpperCase()}
            id={this.topics._id}
            name={this.topics.Name}
          />
        );
      });

      return (
        <div>
          <div>
            <h1>{"No questions on this top"} </h1>
          </div>

          {a}
        </div>
      );
    } else {
      return <div className="loader" />;
    }
  }
}

export default Topic;
