import alt from "../alt";
import TopicActions from "../actions/TopicActions";

class TopicStore {
  constructor() {
    this.state = {
      data: null,
      loader: false,
      feed: null,
      singlefeed: null,
      answerUpdated: false
    };

    this.bindListeners({
      handleUpdateLocations: TopicActions.UPDATE_LOCATIONS,
      handleAskQuestion: TopicActions.ASK_QUESTION,
      fetchFeed: TopicActions.FETCH_FEED,
      fetchSingleFeed: TopicActions.FETCH_QUESTION,
      answerQuestion: TopicActions.ANSWER_QUESTION
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
    this.state.singlefeed = data;
  }
  answerQuestion() {
    this.state.answerUpdated = true;
  }
}

export default alt.createStore(TopicStore, "TopicStore");
