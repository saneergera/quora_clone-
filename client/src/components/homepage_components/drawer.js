import React from "react";
import PropTypes from "prop-types";
import "../../style/sidebar.css";
import Avatar from "@material-ui/core/Avatar";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.topics = props.topics;
  }

  handleClick(even, e) {
    even.preventDefault();
    var strLink = "/topics/" + e;
    window.location.href = strLink;
  }

  render() {
    const list = this.topics.map((element, index) => {
      return (
        <div
          key={index}
          style={{ display: "flex", marginBottom: "10px", cursor: "pointer" }}
        >
          <Avatar style={{ height: "30px", width: "30px" }}>
            {element.charAt(0)}
          </Avatar>
          <a
            style={{ fontSize: "13px" }}
            key={index}
            id={element}
            onClick={event => {
              this.handleClick(event, element);
            }}
          >
            <i className="fa fa-fw fa-home" /> {element}
          </a>
        </div>
      );
    });

    return <div className="sidebar">{list}</div>;
  }
}

export default Sidebar;
