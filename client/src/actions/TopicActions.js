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
      axios
        .post("/api/topicdetails", {
          params: {
            topic: topic
          }
        })
        .then(function(response) {
          dispatch(response.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    };
  }
  fetchMyquestion() {
    return dispatch => {
      axios
        .get("/api/myquestion")
        .then(function(response) {
          dispatch(response.data);
        })
        .catch(function(error) {
          console.log(error);
        });
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
          this.fetchQuestion(id);
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

  getMaillist() {
    return dispatch => {
      axios
        .get("/api/getUsers")
        .then(response => {
          console.log("abc");
          console.log(response.data);
          dispatch(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    };
  }

  askQuestion(question, ask, topics) {
    console.log(ask);
    console.log(topics);
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
          console.log(response.data);
          dispatch(response.data);

          window.location.assign("/");
        })
        .catch(function(error) {
          console.log(error);
        });
    };
  }
}

export default alt.createActions(TopicActions);
