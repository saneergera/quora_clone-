import React from "react";
import PropTypes from "prop-types";
import TopicStore from "../stores/Topicstore";
import TopicActions from "../actions/TopicActions";
import Question from "./homepage_components/add_question";
import Sidebar from "./homepage_components/drawer";
import SimpleCard from "./homepage_components/card";
import Questionfield from "./homepage_components/questionfield";
import "../style/loader.css";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.topics = props.commonProps.data;
    this.state = TopicStore.getState();
    TopicActions.fetchFeed();
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
            <SimpleCard />
          </div>

          {a}
        </div>
      );
    } else {
      return <div className="loader" />;
    }
  }
}

export default Home;
