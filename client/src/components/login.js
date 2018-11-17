import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const styles = {
  card: {
    width: "40%",
    position: "relative",
    top: "30%",
    left: "30%"
  },
  bg: {
    background:
      "url('https://qsf.fs.quoracdn.net/-3-images.home.illo_1920.png-26-5ac607d989ef8067.png')",
    height: "100%",
    textAlign: "center"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  heading: {
    fontFamily: "'Oswald', sans-serif",
    color: "#aa4034",
    marginBottom: "11px",
    marginTop: "0px"
  },
  fbbutton: {
    marginLeft: "10px",
    background: "#456db0"
  }
};

function SimpleCard(props) {
  const { classes } = props;
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <div className={classes.bg}>
      <Card className={classes.card}>
        <CardContent>
          <h1 className={classes.heading}>Quora Clone</h1>
          <Button
            href="/auth/google"
            variant="contained"
            color="secondary"
            className={classes.button}
          >
            Login With Google
          </Button>
          <Button
            href="/auth/facebook"
            variant="contained"
            color="secondary"
            className={classes.fbbutton}
          >
            Login With facebook
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleCard);
