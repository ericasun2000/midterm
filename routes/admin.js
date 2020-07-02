const express = require('express');
const router = express.Router();
const path = require('path');

module.exports = ({getDishes, getDish, deleteDish, updateDish}) => {
  router.get("/", (req, res) => {
    //if has cookie
    if (req.session.isAuthenticated) {
      res.render("admin");
      res.sendFile(path.join(__dirname + '/../views/owner.html'));

    } else {
      res.render("adminLogin");
    }

  });

  router.post("/", (req, res) => {
    // check inputed password
    if (req.body.password === "1234") {
      req.session.isAuthenticated = true;
      res.render("admin");
    } else {
      res.render("adminlogin");
    }
  });

  router.post("/logout", (req, res) => {
    req.session = null;
    res.redirect('/admin');
  });

  router.get("/display", (req, res) => {
    if (req.session.isAuthenticated) {
      getDishes()
      // .then(dishes => console.log(dishes[0].name))
      .then(dishes => {
        res.render("display", {dishes});
      })
    } else {
      res.redirect("/admin");
    }
  });

  router.get("/display/:id/edit", (req, res) => {
    if (req.session.isAuthenticated) {
      const dishId = req.params.id;
      getDish(dishId)
      .then(dish => res.render("edit", {dish}))
    } else {
      res.redirect("/admin");
    }
  })

  router.post("/display/:id/edit", (req, res) => {
    if (req.session.isAuthenticated) {
      const dishId = req.params.id;
      const updatedDish = req.body.updatedDish;
      updateDish(dishId, updatedDish)
      .then(res.redirect("/admin/display"))
      .catch(err => console.log(err));

    } else {
      res.redirect("/admin");
    }
  })

  router.post("/display/:id/delete", (req, res) => {
    const dishId = req.params.id;
    if (req.session.isAuthenticated) {
      deleteDish(dishId)
      .then(res.redirect("/admin/display"))
      .catch(err => console.log(err));
    } else {
      res.redirect("/admin");
    }
  })

  return router;
};

