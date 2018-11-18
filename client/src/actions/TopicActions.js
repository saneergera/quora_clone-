import axios from "axios";
var alt = require("../alt");

class TopicActions {
  fetchData() {
    return dispatch => {
      // we dispatch an event here so we can have "loading" state.

      axios
        .get("/api/current_user")
        .then(function(response) {
          dispatch(response);
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    };
  }

  fetchTopicquestion(topic) {
    return dispatch => {
      axios.get;
    };
  }
  updateFetch(id) {
    console.log(id);
    return dispatch => {
      axios
        .post("/api/upvote", {
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

  answerQuestion(id, ans) {
    return dispatch => {
      axios
        .post("/api/answer", {
          params: {
            id: id,
            ans: ans
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

  updateLocations(locations) {
    return locations;
  }

  fetchQuestion(id) {
    console.log(id);
    return dispatch => {
      axios
        .post("/api/singlequestion", {
          params: {
            id: id
          }
        })
        .then(response => {
          console.log("hello");

          console.log(response.data);
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
