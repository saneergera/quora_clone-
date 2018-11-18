import React from "react";
import PropTypes from "prop-types";
import TopicStore from "../stores/Topicstore";
import TopicActions from "../actions/TopicActions";
import Questionfield from "./homepage_components/questionfield";

class Myquestion extends React.Component {
  constructor(props) {
    super(props);

    TopicActions.fetchMyquestion();
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
    if (this.state.myquestion !== null && this.state.myquestion.length > 0) {
      const a = this.state.myquestion.map((element, index) => {
        return <Questionfield data={element} key={index} />;
      });
      return a;
    } else if (
      this.state.myquestion !== null &&
      this.state.myquestion.length == 0
    ) {
      return (
        <div>
          <div class="container">
            <h1>{"You Dont have any question"} </h1>
            <a href="/">Add Question</a>
          </div>
        </div>
      );
    } else {
      return <div className="loader" />;
    }
  }
}

export default Myquestion;
