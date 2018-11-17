const passport = require("passport");

module.exports = app => {
  app.get("/welcome", (req, res) => {
    res.send({ hii: "logedin" });
  });

  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  app.get("/api/current_user", function(req, res) {
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    console.log(req.user);
    res.send(req.user);
  });
  app.get("/api/log_out", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("http://localhost:3006/");
    }
  );
  app.get(
    "/auth/facebook",
    passport.authenticate("facebook", { scope: ["email"] })
  );

  app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", {
      failureRedirect: "/login",
      scope: ["email"]
    }),
    function(req, res) {
      // Successful authentication, redirect home.
      console.log(req);
      if (req.user) {
        res.redirect("http://localhost:3006/");
      } else {
        res.redirect("/old");
      }
    }
  );
};
