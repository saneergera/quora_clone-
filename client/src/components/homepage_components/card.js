import React from "react";
import PropTypes from "prop-types";
import "../../style/card_question.css";
import TopicStore from "../../stores/Topicstore";
import TopicActions from "../../actions/TopicActions";
class SimpleCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = TopicStore.getState();

    this.notification = [];

    TopicActions.getMaillist();

    this.users = this.sendMessage = (e, msg) => {
      e.preventDefault();
      document.getElementById(msg).innerHTML = "Sent";
      document.getElementById(msg).parentElement.removeAttribute("href");

      this.notification.push(msg);
      this.setState({
        notification: this.notification
      });
    };
  }

  data = "";

  componentDidMount() {
    TopicStore.listen(this.onChange);
    this.setState({
      data: "",
      topic: "",
      question: ""
    });
  }

  componentWillUnmount() {
    TopicStore.unlisten(this.onChange);
  }

  onChange = state => {
    this.setState(state);
  };

  topics = [];
  openQuestion() {
    const data = document.getElementById("modal1");
    data.className += "nothidden";
  }
  updateState(e) {}
  handleChange = e => {
    this.setState({
      data: e.target.value
    });
  };
  handleInput = e => {
    const finalArray = e.target.value.split(" ");
    const length = finalArray.length;

    if (finalArray[length - 1] !== "?") {
      document.getElementById("error").innerHTML = "Question must end with ?";
    } else {
      this.setState({
        question: e.target.value
      });
      document.getElementById("error").innerHTML = "";
      document.getElementById("next").classList.remove("disabled");
    }
  };
  updateData = () => {
    if (this.state.data !== null) {
      const card = `<a className="waves-effect waves-light btn-small">${
        this.state.data
      }</a>`;
      const div = document.getElementById("topics");

      div.innerHTML += card;
      document.getElementById("topic").value = "";
      this.topics.push(this.state.data);

      this.setState({
        data: "",
        topics: this.topics
      });
    }
  };
  submitAnswer = () => {
    TopicActions.askQuestion(
      this.state.question,
      this.state.notification,
      this.topics
    );

    this.state.loader = true;
  };
  showHide = () => {
    document.getElementById("modal2").className += "nothidden";
    document.getElementById("next").classList.remove = "nothidden";
  };
  sHide = () => {
    document.getElementById("modal1").className += "nothidden";
  };
  render() {
    if (this.state.list !== null) {
      this.data = this.state.list.map((element, index) => {
        return (
          <li key={index} className="collection-item">
            <div>
              {element.name}
              <a
                href=""
                className="secondary-content "
                onClick={event => {
                  this.sendMessage(event, element.id);
                }}
              >
                <i id={element.id}>send</i>
              </a>
            </div>
          </li>
        );
      });
    }
    return (
      <div>
        <div
          className="row"
          style={{ width: "50%", marginLeft: "30%" }}
          onClick={this.openQuestion}
        >
          <div className="col s12 m6">
            <div className="card ">
              <div className="card-content white-text">
                <span className="card-title" style={{ color: "black" }}>
                  Ask a question
                </span>
                <p style={{ color: "black" }}>What is your question?</p>
              </div>
            </div>
          </div>
        </div>

        <div id="modal1" className="modal modal-fixed-footer ">
          <div className="modal-content">
            <span
              style={{
                fontSize: "26px",
                marginLeft: "95%",
                color: "red",
                cursor: "pointer"
              }}
              onClick={this.sHide}
            >
              X
            </span>
            <div>
              <div className="input-field col s6">
                <input
                  id="first_name"
                  type="text"
                  className="validate"
                  onChange={this.handleInput.bind(this)}
                />
                <span id="error" />
                <label for="first_name">Ask a question</label>
              </div>
              <div
                className="input-field col s3"
                style={{ width: "30%", display: "inline-block" }}
              >
                <input
                  id="topic"
                  type="text"
                  className="validate"
                  onChange={this.handleChange.bind(this)}
                />

                <label for="topic">Add Topic</label>
              </div>
              <span className="plus" onClick={this.updateData}>
                +
              </span>
            </div>
            <div id="topics" />
          </div>
          <div className="modal-footer">
            <a
              href="#!"
              id="next"
              className="modal-close waves-effect waves-green btn-flat disabled"
              onClick={this.showHide}
            >
              Next
            </a>
          </div>
        </div>

        <div id="modal2" className="modal modal-fixed-footer ">
          <div className="modal-content" />
          <ul className="collection with-header">
            <li className="collection-header">
              <h4>Ask people to answer the question</h4>
            </li>
            {this.data}
            <li className="collection-item">
              <a
                href="#!"
                id="next"
                className="modal-close waves-effect waves-green btn-flat right "
                onClick={this.submitAnswer}
              >
                Submit
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default SimpleCard;
