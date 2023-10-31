const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  app.post("/api/bookForm", [authJwt.verifyToken], controller.bookForm);

  app.post("/api/bookedClass", [authJwt.verifyToken], controller.bookedClass);

  app.post(
    "/api/getAllLocationsData",
    [authJwt.verifyToken],
    controller.getAllLocationsData
  );

  app.post("/api/trackLocation", controller.trackLocation);

  app.post("/api/getCourseData", controller.getCourseContent);

  app.post(
    "/api/getBookedClasses",
    [authJwt.verifyToken],
    controller.allBookedClasses
  );

  app.post(
    "/api/getAllPromoClasses",
    [authJwt.verifyToken],
    controller.getAllPromoClasses
  );

  app.post(
    "/api/feedbacksubmit",
    [authJwt.verifyToken],
    controller.feedbacksubmit
  );

  app.post(
    "/api/feedbackfetch",
    [authJwt.verifyToken],
    controller.feedbackfetch
  );

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
  app.post(
    "/api/promosubmit",
    controller.promoFormSubmt
  );
  app.post(
    "/api/emailnotification",
    [authJwt.verifyToken],
    controller.emailNotification
  );
};
