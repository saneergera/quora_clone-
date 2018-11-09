const mongoose = require("mongoose");
const Topics = mongoose.model("Topics");
const Questions = mongoose.model("Questions");
const Answers = mongoose.model("Answers");
function titleCase(str) {
  var splitStr = str.toLowerCase().split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(" ");
}

module.exports = app => {
  app.post("/api/answer", async (req, res) => {
    const questionid = req.body.questionid;
    const answer = await new Answers({
      Question: questionid,
      By: req.user._id,
      Answer: req.body.answer,
      Upvotes: 0,
      Downvotes: 0
    }).save();
    console.log(questionid);
    console.log(answer._id);
    const update = await Questions.findOneAndUpdate(
      { _id: questionid },
      { $push: { Answer: answer._id } }
    );
    res.send({ done: "Done" });
  });

  app.post("/api/newquestion", async (req, res) => {
    const a = [req.user._id];
    const question = await new Questions({
      Question: req.body.question,
      By: req.user._id,
      Followers: a
    }).save();
    res.send(question);
  });

  app.post("/api/comment");

  app.post("/api/newtopic", async (req, res) => {
    console.log(req);
    const name = titleCase(req.body.name);
    const entery = await Topics.findOne({ Name: name });
    if (entery) {
      res.send("Aready a topic");
    } else {
      const topic = await new Topics({
        Name: name
      }).save();
      res.send(topic);
    }
  });
};
