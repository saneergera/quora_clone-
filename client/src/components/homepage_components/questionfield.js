import React from "react";
import PropTypes from "prop-types";
import "../../style/questionfield.css";
import Avatar from "@material-ui/core/Avatar";
import ReactQuill from "react-quill";

class Questionfield extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    console.log(props);
    this.setState({ color: "black" });
    this.state = {
      Upvotes: 0
    };
    this.b = this.props.data.question.Topics.map(element => {
      return <span class="label label-default">{element}</span>;
    });
    if (this.props.data.answer.length === 0) {
      this.answer = "";
      this.style = "none";
      this.d = "";
      this.by = "";
      this.pro = "";
      console.log("oye nahi chal jaa");
    } else {
      console.log("oye chal jaa");

      this.answer = this.props.data.answer[0].Answer;
      this.style = "";
      this.state.Upvotes = this.props.data.answer[0].Upvotes;
      this.Downvote = this.props.data.answer[0].Downvotes;
      this.by = this.props.data.answer[0].By;
      this.pro = this.props.intro;

      if (this.stateUpvote !== 0) {
        this.array = this.props.data.answer[0].UpvoteBy;
        const a = this.array.indexOf(this.props.id);
        if (a !== -1) {
          this.state.d = (
            <div id="upvoter" style={{ padding: "10px", color: "black" }}>
              <span>
                {this.state.Upvotes} Upvotes
                <i class="material-icons" style={{ color: "blue" }}>
                  arrow_upward
                </i>
              </span>
            </div>
          );
        } else {
          this.state.d = (
            <div id="upvoter" style={{ padding: "10px", color: "black" }}>
              <span onClick={this.upvote}>
                {this.state.Upvotes} Upvotes
                <i class="material-icons">arrow_upward</i>
              </span>
            </div>
          );
        }
      } else {
        this.state.d = (
          <div id="upvoter" style={{ padding: "10px", color: "black" }}>
            <span onClick={this.upvote}>
              {this.state.Upvotes} Upvotes
              <i class="material-icons">arrow_upward</i>
            </span>
          </div>
        );
      }
    }
  }

  upvote = () => {
    var num = this.state.Upvotes;
    console.log(num);
    num++;
    this.setState({
      Upvotes: num
    });
    console.log(this.state.Upvotes);
    this.state.d = (
      <div id="upvoter" style={{ padding: "10px", color: "black" }}>
        <span>
          {num} Upvotes
          <i class="material-icons" style={{ color: "blue" }}>
            arrow_upward
          </i>
        </span>
      </div>
    );
  };
  componentDidMount() {
    var element = document.querySelector(".ql-toolbar.ql-snow");
    element.classList.add("dandi");
    var element2 = document.querySelector(
      ".ql-toolbar.ql-snow + .ql-container.ql-snow"
    );
    element2.classList.add("dandi2");
    var element3 = document.querySelector(".ql-container.ql-snow");
    element3.classList.add("dandi3");

    this.ele = document.querySelector("#upvoter");
    console.log(this.ele);
    const ele4 = document.querySelector("#questionlink");
    console.log("kyon");
  }

  render() {
    ////////////////////////////////////////////////////////////////////////////////////////

    return (
      <div class="row" style={{ width: "50%", marginLeft: "30%" }}>
        <div class="col s12 m6">
          <div class="card ">
            {this.b}
            <div class="card-content white-text">
              <span class="card-title" style={{ color: "black" }}>
                <a
                  href={`question/${this.props.data.question._id}`}
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
                readOnly="true"
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
