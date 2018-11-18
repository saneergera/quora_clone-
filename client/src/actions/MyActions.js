import axios from "axios";
var alt = require("../alt");

class LocationActions {
  updateLocations(locations) {
    return locations;
  }

  getTopics() {
    return dispatch => {
      axios
        .get("/api/gettopics")
        .then(function(response) {
          dispatch(response.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    };
  }
  updateData(bio, topics) {
    console.log("hello");
    return dispatch => {
      // we dispatch an event here so we can have "loading" state.

      axios
        .post("/api/newuser", {
          params: {
            bio: bio,
            topics: topics
          }
        })
        .then(function(response) {
          console.log(response);
          topics.forEach(element => {
            axios
              .post("/api/follower", {
                params: {
                  Name: element
                }
              })
              .then(function(response) {
                console.log("mein bhi hoon");
                console.log(response);
                dispatch("done");
                window.location.reload();
              })
              .catch(function(error) {
                console.log(error);
              });
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    };
  }

  tentDepth(data) {
    return data;
  }

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
}

export default alt.createActions(LocationActions);
