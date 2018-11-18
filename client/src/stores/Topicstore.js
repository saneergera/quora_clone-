import alt from "../alt";
import TopicActions from "../actions/TopicActions";

class TopicStore {
  constructor() {
    this.state = {
      data: null,
      loader: false,
      feed: null,
      singlefeed: null,
      answerUpdated: false,
      topic: null,
      list: null,
      myquestion: null
    };

    this.bindListeners({
      handleUpdateLocations: TopicActions.UPDATE_LOCATIONS,
      handleAskQuestion: TopicActions.ASK_QUESTION,
      fetchLocations: TopicActions.FETCH_DATA,
      fetchFeed: TopicActions.FETCH_FEED,
      fetchSingleFeed: TopicActions.FETCH_QUESTION,
      answerQuestion: TopicActions.ANSWER_QUESTION,
      updateFetch: TopicActions.UPDATE_FETCH,
      fetchTopicquestion: TopicActions.FETCH_TOPICQUESTION,
      getMaillist: TopicActions.GET_MAILLIST,
      fetchMyquestion: TopicActions.FETCH_MYQUESTION
    });
  }

  fetchLocations(data) {
    this.state.data = data;
  }
  getMaillist(data) {
    this.state.list = data;
  }
  handleUpdateLocations(data) {
    this.state.data = data;
  }

  handleAskQuestion(data) {}

  fetchFeed(data) {
    this.state.feed = data;
  }
  fetchSingleFeed(data) {
    this.state.singlefeed = data;
  }
  answerQuestion() {
    this.state.answerUpdated = true;
  }
  updateFetch() {
    this.state.upvote = true;
  }
  fetchTopicquestion(data) {
    this.state.topic = data;
  }
  fetchMyquestion(data) {
    this.state.myquestion = data;
  }
}

export default alt.createStore(TopicStore, "TopicStore");
