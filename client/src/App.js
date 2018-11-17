import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/homepage_components/navbar";
import LocationStore from "./stores/Mystore";
import LocationActions from "./actions/MyActions";
import Componentss from "./components/decide";
import SimpleCard from "./components/login";
import Home from "./components/home";
import Heading from "./components/homepage_components/heading";
import Sidebar from "./components/homepage_components/drawer";
import Form from "./components/new_login";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Topic from "./components/viewtopic";
import QuestionAnswer from "./components/qa";
const Indexx = () => <Componentss />;
const Topics = ({ match }) => <Topic topicname={match.params} />;
const Question = ({ match }) => {
  return <QuestionAnswer topicname={match.params} />;
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = LocationStore.getState();
  }
  About = () => <Heading data={this.state} />;
  componentWillMount() {
    LocationStore.listen(this.onChange);
    LocationActions.fetchData();
  }

  componentWillUnmount() {
    LocationStore.unlisten(this.onChange);
  }

  onChange = state => {
    this.setState(state);
  };
  render() {
    if (this.state.data !== null) {
      if (
        this.state.data.data !== "" &&
        this.state.data.data.NewUser === false
      ) {
        return (
          <BrowserRouter>
            <div>
              <Navbar information={this.state} />
              <Sidebar topics={this.state.data.data.Topics} />
              <Route exact path="/" component={Indexx} />

              <Route exact path="/about" component={this.About} />
              <Route exact path="/topics/:topic" component={Topics} />
              <Route exact path="/question/:id" component={Question} />
            </div>
          </BrowserRouter>
        );
      } else {
        return (
          <BrowserRouter>
            <div>
              <Route exact path="/" component={Indexx} />
            </div>
          </BrowserRouter>
        );
      }
    } else {
      return <h1>Loading</h1>;
    }
  }
}

export default App;
