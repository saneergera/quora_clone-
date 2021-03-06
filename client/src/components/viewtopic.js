import React from "react";
import PropTypes from "prop-types";
import TopicStore from "../stores/Topicstore";
import TopicActions from "../actions/TopicActions";
import Questionfield from "./homepage_components/questionfield";

class Topic extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.topicname.topic);
    TopicActions.fetchTopicquestion(props.topicname.topic);
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
    if (this.state.topic !== null && this.state.topic.length > 0) {
      const a = this.state.topic.map((element, index) => {
        return <Questionfield data={element} key={index} />;
      });
      return a;
    } else if (this.state.topic !== null && this.state.topic.length == 0) {
      return (
        <div>
          <div class="container">
            <h1>{"No questions on this topic"} </h1>
            <a href="/">Add Question</a>
          </div>
        </div>
      );
    } else {
      return <div className="loader" />;
    }
  }
}

export default Topic;
