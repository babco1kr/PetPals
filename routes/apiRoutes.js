var db = require("../models");
var passport = require("../config/passport.js");

module.exports = function(app) {
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/index");
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    console.log(req.body);
    db.User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        console.log(err);
        res.json(err);
        // res.status(422).json(err.errors[0].message);
      });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Page checks to see if there are any pending requests and sends those back
  app.get("/api/requests", function(req, res) {
    db.Holding.findAll({
      where: {
        UserId: req.user.id
      }
    }).then(function(data) {
      console.log("RESPONSE: " + data.length);
      res.json(data);
    });
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id,
        name: req.user.name
      });
    }
  });

  app.get("/requests/:user", function(req, res) {
    db.Holding.findAll({
      where: {
        UserId: req.params.user
      }
    }).then(function(data) {
      var object = {
        pets: data
      };
      res.render("requests", object);
    });
  });

  app.get("/apis/pet_info/:id/:user/:name", function(req) {
    db.Pet.findAll({
      where: {
        id: req.params.id
      }
    }).then(function(data) {
      var request = data[0].dataValues;
      //finds pet by ID and gets stored into a new table and deleted from the old table when choosing when to watch the pet.
      // console.log(data[0].dataValues);
      db.Holding.create({
        petName: request.petName,
        petType: request.petType,
        pictureLink: request.pictureLink,
        location: request.location,
        price: request.price,
        body: request.body,
        UserId: request.UserId,
        requestsId: req.params.user,
        requestName: req.params.name
      }).then(function() {
        console.log("Request Inserted");
        db.Pet.destroy({
          where: {
            id: req.params.id
          }
        }).then(function() {
          console.log("Pet removed");
        });
      });
    });
  });

  //sequelize statements for user
  // "/user/:id"
  app.get("/user/:id", function(req, res) {
    //This makes sure the current user can only access their user page
    if (req.user.id.toString() === req.params.id.toString()) {
      db.User.findAll({
        where: { id: req.params.id }
      }).then(function(data) {
        res.render("user", data);
      });
    } else {
      res.redirect("/index");
    }
  });

  //sequelize search type for a search filter
  app.get("/search/:type", function(req, res) {
    db.Pet.findAll({
      where: {
        petType: req.params.type
      }
    }).then(function(data) {
      console.log(data);
      var object = {
        pets: data
      };
      res.render("search", object);
    });
  });

  // Call for finding pets based on location and type
  app.get("/search/:type/:location", function(req, res) {
    db.Pet.findAll({
      where: {
        petType: req.params.type,
        location: req.params.location
      }
    }).then(function(data) {
      console.log(data);
      var object = {
        pets: data
      };
      res.render("search", object);
    });
  });

  // Call to add Pet to the database
  app.post("/api/pets", function(req, res) {
    console.log("Pet Added");
    db.Pet.create({
      petName: req.body.petName,
      petType: req.body.petType,
      pictureLink: req.body.pictureLink,
      location: req.body.location,
      price: req.body.price,
      body: req.body.body,
      UserId: req.user.id
    }).then(function(data) {
      res.json(data);
    });
  });
};
