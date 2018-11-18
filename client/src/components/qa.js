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
    console.log(props);
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
    console.log(this.state.text);
    TopicActions.answerQuestion(this.id, this.state.text);
    TopicActions.fetchQuestion(this.id);
  };

  upvote = a => {
    TopicActions.updateFetch(a);
    TopicActions.fetchQuestion(this.id);
  };
  render() {
    if (this.state.singlefeed === null) {
      return <div className="loader" />;
    } else {
      if (this.state.singlefeed.answer.length !== 0) {
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
      console.log(this.final);
      return (
        <div>
          <div
            className="question "
            style={{
              width: "50%",
              marginLeft: "30%",
              background: "white",
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
                    <a href="#">Answer</a>
                    <a href="#">Follow</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="hideShow"
            style={{
              width: "50%",
              marginLeft: "30%",
              background: "white",
              marginTop: "1%",
              height: "inherit",
              border: "1px solid black"
            }}
          >
            <ReactQuill
              className=""
              onChange={this.handleChange}
              modules={this.modules}
              formats={this.formats}
            />
            <div>
              <button
                class="btn waves-effect waves-light "
                type="submit"
                name="action"
                onClick={this.data}
                style={{ float: "right" }}
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
