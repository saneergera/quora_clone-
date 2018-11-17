import axios from "axios";
var alt = require("../alt");

class TopicActions {
  updateLocations(locations) {
    return locations;
  }

  fetchQuestion(id) {
    return dispatch => {
      axios
        .post("/api/singlequestion", {
          params: {
            id: id
          }
        })
        .then(response => {
          dispatch(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    };
  }
  fetchFeed() {
    return dispatch => {
      axios
        .get("/api/question")
        .then(function(response) {
          dispatch(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    };
  }

  askQuestion(question, ask, topics) {
    return dispatch => {
      axios
        .post("/api/newquestion", {
          params: {
            question: question,
            ask: ask,
            topics: topics
          }
        })
        .then(function(response) {
          dispatch(response.data);
          window.location.assign("/about");
        })
        .catch(function(error) {
          console.log(error);
        });
    };
  }
}

export default alt.createActions(TopicActions);
