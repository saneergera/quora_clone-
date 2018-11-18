import React from "react";
import PropTypes from "prop-types";
import TopicStore from "../stores/Topicstore";
import TopicActions from "../actions/TopicActions";
import ReactQuill from "react-quill";
import Avatar from "@material-ui/core/Avatar";
import "../style/hideShow.css";

class QuestionAnswer extends React.Component {
  constructor(props) {
    super(props);

    this.id = this.props.topicname.id;

    this.state = TopicStore.getState();
    this.setState({ text: "" }); // You can also pass a Quill Delta here
    this.handleChange = this.handleChange.bind(this);
    TopicActions.fetchData();
    TopicActions.fetchQuestion(this.id);
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

  modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" }
      ],
      ["link", "image"],
      ["clean"]
    ]
  };
  config = {
    toolbar: false
  };
  formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image"
  ];

  handleChange(value) {
    this.setState({ text: value.replace(/"/g, "'") });
  }

  data = () => {
    var element = document.getElementById("answer_box");

    element.classList.toggle("hideShow");
    this.setState({ text: "" });
    TopicActions.answerQuestion(this.id, this.state.text);
    TopicActions.fetchQuestion(this.id);
  };

  upvote = a => {
    TopicActions.updateFetch(a);
    TopicActions.fetchQuestion(this.id);
  };

  Hideshow = () => {
    var element = document.getElementById("answer_box");

    element.classList.toggle("hideShow");
  };
  render() {
    if (this.state.singlefeed === null) {
      return <div className="loader" />;
    } else {
      if (
        this.state.singlefeed.answer !== undefined &&
        this.state.singlefeed.answer.length !== 0
      ) {
        this.final = this.state.singlefeed.answer.map((element, index) => {
          if (element.UpvoteBy.indexOf(this.state.data.data._id) !== -1) {
            this.d = (
              <div class="card" style={{ textAlign: "center" }}>
                <div id="upvoter" style={{ padding: "10px", color: "black" }}>
                  <span style={{ cursor: "pointer" }}>
                    {element.Upvotes} Upvotes
                    <i class="material-icons" style={{ color: "blue" }}>
                      arrow_upward
                    </i>
                  </span>
                </div>
              </div>
            );
          } else {
            this.d = (
              <div class="card" style={{ textAlign: "center" }}>
                <div id="upvoter" style={{ padding: "10px", color: "black" }}>
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      this.upvote(element._id);
                    }}
                  >
                    {element.Upvotes} Upvotes
                    <i class="material-icons">arrow_upward</i>
                  </span>
                </div>
              </div>
            );
          }
          return (
            <div key={index}>
              <div
                class="row"
                style={{ width: "50%", marginLeft: "30%", marginTop: "10px" }}
              >
                <div class="col s12 m6">
                  <div class="card ">
                    <div class="card-content ">
                      <div
                        style={{
                          display: "flex",
                          marginBottom: "10px",
                          cursor: "pointer"
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            marginBottom: "10px",
                            cursor: "pointer"
                          }}
                        >
                          <Avatar>{element.By.charAt(0)}</Avatar>
                        </div>
                        <div style={{ marginLeft: "1%" }}>
                          <span style={{ color: "black", display: "block" }}>
                            {element.By}
                          </span>{" "}
                          <span style={{ color: "black" }}>
                            {element.Intro}
                          </span>
                        </div>
                      </div>

                      <ReactQuill
                        readOnly={true}
                        modules={this.config}
                        value={element.Answer}
                        style={{ height: "300px" }}
                      />
                    </div>
                  </div>
                  {this.d}
                </div>
              </div>
            </div>
          );
        });
      }

      return (
        <div>
          <div
            className="question "
            style={{
              width: "50%",
              marginLeft: "30%",

              color: "black"
            }}
          >
            <div class="row ">
              <div class="col s12 m6">
                <div class="card ">
                  <div class="card-content white-text">
                    <span
                      class="card-title"
                      style={{ color: "black", fontWeight: "600" }}
                    >
                      {this.state.singlefeed.question[0].Question}
                    </span>
                  </div>
                  <div class="card-action">
                    <a style={{ cursor: "pointer" }} onClick={this.Hideshow}>
                      Answer
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            id="answer_box"
            className="answer_box"
            style={{
              width: "48%",
              marginLeft: "31%",
              background: "white",
              marginTop: "1%",
              height: "inherit"
            }}
          >
            <ReactQuill
              className=""
              onChange={this.handleChange}
              modules={this.modules}
              formats={this.formats}
              value={this.state.text}
            />
            <div
              style={{
                height: "39px",

                border: "1px solid #ccc"
              }}
            >
              <button
                class="btn waves-effect waves-light "
                type="submit"
                name="action"
                onClick={this.data}
                style={{ float: "right", backgroundColor: "#aa4034" }}
              >
                Submit
                <i class="material-icons right">send</i>
              </button>
            </div>
          </div>
          <div>{this.final}</div>
        </div>
      );
    }
  }
}

export default QuestionAnswer;
