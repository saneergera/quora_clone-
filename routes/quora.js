const mongoose = require("mongoose");
const Topics = mongoose.model("Topics");
const Questions = mongoose.model("Questions");
const Answers = mongoose.model("Answers");
const User = mongoose.model("Users");
const { parse, stringify } = require("flatted/cjs");

function titleCase(str) {
  var splitStr = str.toLowerCase().split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(" ");
}

module.exports = app => {
  app.post("/api/topicdetails", async (req, res) => {
    const data = [];
    const topics = await Topics.findOne({ Name: req.body.name });

    for (const item of topics.Question) {
      const obj = new Object();
      const a = await Questions.findOne({
        _id: item
      });

      obj.question = a;
      const answers = [];
      for (const item of a.Answer) {
        const b = await Answers.findOne({
          _id: item
        });
        stringify(b);
        if (answers.length === 0) {
          answers.push(b);
        } else {
          if (answers[0].length < b.length) {
            answers[0] = b;
          }
        }
      }

      obj.answers = answers;

      data.push(obj);
    }

    res.send(data);
  });

  app.get("/api/gettopics", async (req, res) => {
    const topics = await Topics.find({});
    res.send(topics);
  });
  app.post("/api/follower", async (req, res) => {
    const update = await Topics.findOneAndUpdate(
      {
        Name: req.body.params.Name
      },

      {
        $push: {
          Followers: req.user._id
        }
      }
    );
  });
  app.post("/api/newuser", async (req, res) => {
    const update = await User.findOneAndUpdate(
      {
        _id: req.user._id
      },
      {
        $set: {
          Topics: req.body.params.topics,
          Intro: req.body.params.bio,
          NewUser: false
        }
      }
    );
    req.body.params.topics.forEach(async element => {
      const update = await Topics.findOneAndUpdate(
        {
          Name: element
        },

        {
          $push: {
            Followers: req.user._id
          }
        }
      );
    });
    res.redirect("/");
  });
  app.post("/api/answer", async (req, res) => {
    const questionid = req.body.params.id;
    const answer = await new Answers({
      Question: questionid,
      By: req.user._id,
      Intro: req.user.Intro,
      Answer: req.body.params.ans,
      Upvotes: 0,
      Downvotes: 0
    }).save();

    const update = await Questions.findOneAndUpdate(
      { _id: questionid },
      { $push: { Answer: answer._id } }
    );
    res.send({ done: "Done" });
  });

  app.post("/api/newquestion", async (req, res) => {
    const a = [req.user._id];

    const question = await new Questions({
      Question: req.body.params.question,
      By: req.user._id,
      Followers: [req.user._id],
      Topics: req.body.params.topics.forEach(ele => {
        ele
          .toLowerCase()
          .split(" ")
          .map(s => s.charAt(0).toUpperCase() + s.substring(1))
          .join(" ");
      })
    }).save();

    if (req.body.params.topics !== undefined) {
      for (const item of req.body.params.topics) {
        const entery = await Topics.findOne({
          Name: item
            .toLowerCase()
            .split(" ")
            .map(s => s.charAt(0).toUpperCase() + s.substring(1))
            .join(" ")
        });

        if (!entery) {
          const topic = await new Topics({
            Name: item
              .toLowerCase()
              .split(" ")
              .map(s => s.charAt(0).toUpperCase() + s.substring(1))
              .join(" ")
          }).save();
        } else {
          await entery.update({
            $push: {
              Question: question._id
            }
          });
        }
      }
    }

    if (req.body.params.ask !== undefined) {
      for (const item of req.body.params.ask) {
        const entery = await User.findOneAndUpdate(
          { _id: item },
          {
            $push: {
              Notifications: {
                Body: `${req.user.Name} has requested you to answer a question`,
                Link: `question/${question._id}`,
                Read: false
              }
            }
          }
        );
      }
    }

    res.send("done");
  });

  app.post("/api/comment", async (req, res) => {
    const entery = await Answers.findOneAndUpdate(
      { _id: req.body.id },
      {
        $push: {
          Comments: {
            Body: req.body.comment,
            By: req.user.Name
          }
        }
      }
    );
    res.send({ HIi: "hiii" });
  });

  app.get("/api/topic");

  app.post("/api/singlequestion", async (req, res) => {
    var book = new Object();

    const question = await Questions.find({ _id: req.body.params.id });

    var final = [];
    var answers = question[0].Answer;

    book.question = question;
    if (answers.length === 0) {
      res.send(book);
    }
    for (const item2 of answers) {
      var ans = await Answers.find({ _id: item2 });

      final.push(ans[0]);
    }
    book.answer = final;

    res.send(book);
  });

  app.post("/api/upvote", async (req, res) => {
    var id = req.body.params.id;

    const a = await Answers.findOneAndUpdate(
      {
        _id: req.body.params.id
      },
      {
        $push: {
          UpvoteBy: req.user._id
        },
        $inc: {
          Upvotes: 1
        }
      }
    );
    res.send("done");
  });
  app.get("/api/question", async (req, res) => {
    var book = new Object();
    const question = await Questions.find({});

    var final1 = [];
    var i = 0;
    var j = 100;

    for (const item of question) {
      const final = [];
      var ques = `question${i}`;
      var answer = `answer${i}`;
      const answers = item.Answer;
      book[ques] = item;
      for (const item2 of answers) {
        const ans = await Answers.find({ _id: item2 });

        final.push(ans[0]);
      }
      book[answer] = final;

      var q = {
        question: book[ques],
        answer: book[answer]
      };
      final1.push(q);
      i++;
      j++;
    }

    res.send(final1);
  });

  app.post("/api/newtopic", async (req, res) => {
    const name = titleCase(req.body.name);
    const entery = await Topics.findOne({ Name: name });
    if (entery) {
      res.send("Aready a topic");
    } else {
      const topic = await new Topics({
        Name: nametext
          .toLowerCase()
          .split(" ")
          .map(s => s.charAt(0).toUpperCase() + s.substring(1))
          .join(" ")
      }).save();
      res.send(topic);
    }
  });
};
