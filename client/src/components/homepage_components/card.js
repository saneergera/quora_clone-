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

    this.users = [
      {
        id: "5be5ba16d192b69a01a6f814",
        Name: "The Indo Canadian Dream"
      },
      {
        id: "5be52eea9328dc8d4ef4d729",
        Name: "Saneer Gera"
      }
    ];

    this.sendMessage = (e, msg) => {
      e.preventDefault();
      document.getElementById(msg).innerHTML = "Sent";
      document.getElementById(msg).parentElement.removeAttribute("href");

      this.notification.push(msg);
      this.setState({
        notification: this.notification
      });
    };
  }

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
    const card = `<a class="waves-effect waves-light btn-small">${
      this.state.data
    }</a>`;

    if (this.state.data !== "") {
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

  diaplayData = () => {
    const data = this.users.map(element => {
      return (
        <li class="collection-item">
          <div>
            {element.Name}
            <a
              href=""
              class="secondary-content "
              onClick={event => {
                this.sendMessage(event, element.id);
              }}
            >
              <i class="material-icons " id={element.id}>
                send
              </i>
            </a>
          </div>
        </li>
      );
    });

    return data;
  };

  render() {
    return (
      <div>
        <div
          class="row"
          style={{ width: "50%", marginLeft: "30%" }}
          onClick={this.openQuestion}
        >
          <div class="col s12 m6">
            <div class="card ">
              <div class="card-content white-text">
                <span class="card-title" style={{ color: "black" }}>
                  Ask a question
                </span>
                <p style={{ color: "black" }}>What is your question?</p>
              </div>
            </div>
          </div>
        </div>

        <div id="modal1" class="modal modal-fixed-footer ">
          <div class="modal-content">
            <div>
              <div class="input-field col s6">
                <input
                  id="first_name"
                  type="text"
                  class="validate"
                  onChange={this.handleInput.bind(this)}
                />
                <span id="error" />
                <label for="first_name">Ask a question</label>
              </div>
              <div
                class="input-field col s3"
                style={{ width: "30%", display: "inline-block" }}
              >
                <input
                  id="topic"
                  type="text"
                  class="validate"
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
          <div class="modal-footer">
            <a
              href="#!"
              id="next"
              class="modal-close waves-effect waves-green btn-flat disabled"
              onClick={this.showHide}
            >
              Next
            </a>
          </div>
        </div>

        <div id="modal2" class="modal modal-fixed-footer ">
          <div class="modal-content" />
          <ul class="collection with-header">
            <li class="collection-header">
              <h4>Ask people to answer the question</h4>
            </li>
            {this.diaplayData()}
            <li class="collection-item">
              <a
                href="#!"
                id="next"
                class="modal-close waves-effect waves-green btn-flat right "
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
