import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

class Question extends React.Component {
  render() {
    return (
      <TextField
        id="outlined-full-width"
        label="Label"
        style={{ margin: 8 }}
        placeholder="Ask a question"
        margin="normal"
        variant="outlined"
        InputLabelProps={{
          shrink: true
        }}
      />
    );
  }
}

export default Question;
