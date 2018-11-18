import React from "react";
import PropTypes from "prop-types";
import "../../style/questionfield.css";
import TopicStore from "../../stores/Topicstore";
import TopicActions from "../../actions/TopicActions";
import Avatar from "@material-ui/core/Avatar";
import ReactQuill from "react-quill";

class Questionfield extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.setState({ color: "black" });
    this.state = {
      Upvotes: 0
    };
    this.b = this.props.data.question.Topics.map((element, index) => {
      return (
        <span key={index} className="label label-default">
          <a
            style={{ textDecoration: "none", color: "white" }}
            href={`/topics/${element}`}
          >
            {element}
          </a>
        </span>
      );
    });
    if (this.props.data.answer.length === 0) {
      this.answer = "";
      this.style = "none";
      this.d = "";
      this.by = "";
      this.pro = "";
    } else {
      this.answer = this.props.data.answer[0].Answer;
      this.style = "";
      this.state.Upvotes = this.props.data.answer[0].Upvotes;
      this.Downvote = this.props.data.answer[0].Downvotes;
      this.by = this.props.data.answer[0].By;
      this.pro = this.props.data.answer[0].Intro;

      if (this.stateUpvote !== 0) {
        this.array = this.props.data.answer[0].UpvoteBy;
        const a = this.array.indexOf(this.props.id);
        if (a !== -1) {
          this.state.d = (
            <div id="upvoter" style={{ padding: "10px", color: "black" }}>
              <span>
                {this.state.Upvotes} Upvotes
                <i className="material-icons" style={{ color: "blue" }}>
                  arrow_upward
                </i>
              </span>
            </div>
          );
        } else {
          this.state.d = (
            <div id="upvoter" style={{ padding: "10px", color: "black" }}>
              <span
                onClick={() => {
                  this.upvote(this.props.data.answer[0]._id);
                }}
              >
                {this.state.Upvotes} Upvotes
                <i className="material-icons">arrow_upward</i>
              </span>
            </div>
          );
        }
      } else {
        this.state.d = (
          <div id="upvoter" style={{ padding: "10px", color: "black" }}>
            <span
              onClick={() => {
                this.upvote(this.props.data.answer[0]._id);
              }}
            >
              {this.state.Upvotes} Upvotes
              <i className="material-icons">arrow_upward</i>
            </span>
          </div>
        );
      }
    }
  }

  upvote = a => {
    TopicActions.updateFetch(a);
    var num = this.state.Upvotes;

    num++;
    this.setState({
      Upvotes: num
    });

    this.state.d = (
      <div id="upvoter" style={{ padding: "10px", color: "black" }}>
        <span>
          {num} Upvotes
          <i className="material-icons" style={{ color: "blue" }}>
            arrow_upward
          </i>
        </span>
      </div>
    );
  };
  componentDidMount() {
    var element = document.querySelectorAll(".ql-toolbar.ql-snow");

    element.forEach(ele => {
      ele.classList.add("dandi");
    });
    var element2 = document.querySelectorAll(
      ".ql-toolbar.ql-snow + .ql-container.ql-snow"
    );
    element2.forEach(ele => {
      ele.classList.add("dandi2");
    });

    var element3 = document.querySelectorAll(".ql-container.ql-snow");
    element3.forEach(ele => {
      ele.classList.add("dandi3");
    });

    this.ele = document.querySelectorAll("#upvoter");

    const ele4 = document.querySelectorAll("#questionlink");
  }

  render() {
    ////////////////////////////////////////////////////////////////////////////////////////

    return (
      <div className="row" style={{ width: "50%", marginLeft: "30%" }}>
        <div className="col s12 m6">
          <div className="card ">
            {this.b}
            <div className="card-content ">
              <span className="card-title" style={{ color: "black" }}>
                <a
                  href={`/question/${this.props.data.question._id}`}
                  style={{
                    textDecoration: "none",
                    color: "black",
                    fontWeight: "700"
                  }}
                  id="questionlink"
                >
                  {this.props.data.question.Question}
                </a>
              </span>
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
                  <Avatar>{this.by.charAt(0)}</Avatar>
                </div>
                <div style={{ marginLeft: "1%" }}>
                  <span style={{ color: "black", display: "block" }}>
                    {this.by}
                  </span>{" "}
                  <span style={{ color: "black" }}>{this.pro}</span>
                </div>
              </div>

              <ReactQuill
                readOnly={true}
                value={this.answer}
                style={{ display: this.style, height: "300px" }}
              />
              {this.state.d}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Questionfield;
