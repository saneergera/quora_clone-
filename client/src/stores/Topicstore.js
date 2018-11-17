import alt from "../alt";
import TopicActions from "../actions/TopicActions";

class TopicStore {
  constructor() {
    this.state = { data: null, loader: false, feed: null };

    this.bindListeners({
      handleUpdateLocations: TopicActions.UPDATE_LOCATIONS,
      handleAskQuestion: TopicActions.ASK_QUESTION,
      fetchFeed: TopicActions.FETCH_FEED,
      fetchSingleFeed: TopicActions.FETCH_QUESTION
    });
  }

  handleUpdateLocations(data) {
    this.state.data = data;
  }

  handleAskQuestion(data) {
    console.log("done");
  }

  fetchFeed(data) {
    this.state.feed = data;
  }
  fetchSingleFeed(data) {
    this.state.data = data;
  }
}

export default alt.createStore(TopicStore, "TopicStore");
