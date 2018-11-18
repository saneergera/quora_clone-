import alt from "../alt";
import LocationActions from "../actions/MyActions";

class LocationStore {
  constructor() {
    this.state = { data: null, locations: ["hello", "hii"], topics: null };

    this.bindListeners({
      handleUpdateLocations: LocationActions.UPDATE_LOCATIONS,
      fetchLocations: LocationActions.FETCH_DATA,
      updateLocations: LocationActions.UPDATE_DATA,
      getTopics: LocationActions.GET_TOPICS
    });
  }

  fetchLocations(data) {
    this.state.data = data;
  }

  getTopics(data) {
    this.state.topics = data;
  }

  handleUpdateLocations(locations) {
    this.locations = ["hello", "bye"];
    this.errorMessage = null;
  }
  updateLocations(done) {}
  handleupdateData(data) {
    this.data.push(data);
  }
}

export default alt.createStore(LocationStore, "LocationStore");
