import React from "react";
import PropTypes from "prop-types";
import TopicStore from "../stores/Topicstore";
import TopicActions from "../actions/TopicActions";
import ReactQuill from "react-quill";

class QuestionAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.id = this.props.topicname.id;

    this.state = TopicStore.getState();
    this.setState({ text: "" }); // You can also pass a Quill Delta here
    this.handleChange = this.handleChange.bind(this);
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
    this.setState({ text: value });
  }

  data = () => {
    console.log(this.state.text);
  };

  render() {
    console.log(this.state);
    if (this.state.data === null) {
      return <div className="loader" />;
    } else {
      return (
        <div>
          <ReactQuill
            value={this.state.text}
            onChange={this.handleChange}
            modules={this.modules}
            formats={this.formats}
            style={{
              width: "40%",
              marginLeft: "30%",
              background: "white",
              marginTop: "1%",
              height: "300px",
              border: "1px solid black"
            }}
          />
        </div>
      );
    }
  }
}

export default QuestionAnswer;
