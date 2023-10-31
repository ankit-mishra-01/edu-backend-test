const db = require("../models");
const Course = require("../models/course.model");
const JEE = require("../models/data/Jee");
const NEETUG = require("../models/data/NeetUg");
const SpokenEnglish = require("../models/data/SpokenEnglish");
const Location = require("../models/location.model");
const Feedback = require("../models/feedback.model");
const BookForm = db.bookForm;
const Role = db.role;
var NodeGeocoder = require("node-geocoder");
const ContactForm = require("../models/contact.model");
const { mailTransport } = require("../config/auth.config");

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

exports.bookForm = (req, res) => {
  const form = new BookForm({
    username: req.body.username,
    email: req.body.email,
    name: req.body.name,
    mobile: req.body.mobile,
    course: req.body.course,
    subject: req.body.subject,
    date: req.body.date,
    formattedDate: req.body.formattedDate,
    time: req.body.time,
    specialRequirement: req.body.specialRequirement,
  });
  form.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err, status: 500 });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err, status: 500 });
            return;
          }

          form.roles = roles.map((role) => role._id);
          form.save((err) => {
            if (err) {
              res.status(500).send({ message: err, status: 500 });
              return;
            }

            res
              .status(200)
              .send({ message: "Form Submitted Successfully", status: 200 });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err, status: 500 });
          return;
        }

        form.roles = [role._id];
        form.save((err) => {
          if (err) {
            res.status(500).send({ message: err, status: 500 });
            return;
          }

          res.status(200).send({
            message: "Form Submitted Successfully.",
            status: 200,
          });
        });
      });
    }
  });
};
exports.feedbacksubmit = (req, res) => {
  const type = req.body.type;
  let update = {};

  if (type === "userdata") {
    update["userdata"] = req.body.userdata;
  } else if (type == "postdemo") {
    update["postdemo"] = req.body.postdemo;
  }

  var query = {
      mobile: req.body.mobile,
    },
    options = { upsert: true, new: true, setDefaultsOnInsert: true };

  // Find the document
  Feedback.findOne({ mobile: req.body.mobile }, function (err, res1) {
    if (err) {
      console.log("here", err);
      //res.status(500).send({ message: err, status: 500 });
      return;
    }
    if (res1) {
      Feedback.findOneAndUpdate(
        query,
        update,
        options,
        function (error, result) {
          if (error) {
            res.status(500).send({ message: err });
            return;
          } else {
            res.status(200).send({
              message: "Lead Updated Successfully",
              status: 200,
              documentExisted: true,
              doc: result,
            });
          }
          // do something with the document
        }
      );
    } else {
      Feedback.findOneAndUpdate(
        query,
        update,
        options,
        function (error, result) {
          if (error) {
            res.status(500).send({ message: err });
            return;
          } else {
            res.status(200).send({
              message: "Lead Updated Successfully",
              status: 200,
              documentExisted: false,
              doc: result,
            });
          }
          // do something with the document
        }
      );
    }
  });
};
exports.promoFormSubmt = (req, res) => {
  const type = req.body.type;

  var query = {
      mobile: req.body.mobile || "",
    },
    options = { upsert: true, new: true, setDefaultsOnInsert: true };

  // Find the document

  ContactForm.findOneAndUpdate(
    query,
    {
      name: req.body.name,
      mobile: req.body.mobile,
      email: req.body.email,
      course: req.body.course,
      src: req.body.src,
    },
    options,
    function (error, result) {
      if (error) {
        res.status(500).send({ message: err });
        return;
      } else {
        res.status(200).send({
          message: "Lead Updated Successfully",
          status: 200,
        });
      }
      // do something with the document
    }
  );
};
exports.feedbackfetch = (req, res) => {
  if (req.body.username === "admin@edusession.live") {
    if (req.body.showAll) {
      Feedback.find({}, null, { sort: { updatedAt: -1 }})
        //.sort({ updated_at: -1 })
        //.limit(400)
        // .populate("roles", "-__v")
        .exec((err, forms) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          if (!forms) {
            return res.status(404).send({ message: "Not found." });
          }
          res.status(200).send({
            username: req.body.username,
            forms: forms,
          });
        });
    } else
      Feedback.findOne({
        _id: req.body._id,
      }).exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }

        res.status(200).send({
          mobile: req.body.mobile,
          userdata: user.userdata || {},
          postdemo: user.postdemo || {},
          status: 200,
        });
      });
  } else {
    return res.status(401).send({ message: "Not valid username", status: 401 });
  }
};
exports.bookedClass = (req, res) => {
  BookForm.find({
    username: req.body.username,
  })

    // .populate("roles", "-__v")
    .exec((err, forms) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!forms) {
        return res.status(404).send({ message: "Not found." });
      }
      res.status(200).send({
        username: req.body.username,
        forms: forms,
      });
    });
};

exports.allBookedClasses = (req, res) => {
  if (req.body.username === "admin@edusession.live") {
    BookForm.find({})
      .sort({ _id: -1 })
      // .populate("roles", "-__v")
      .exec((err, forms) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        if (!forms) {
          return res.status(404).send({ message: "Not found." });
        }
        res.status(200).send({
          username: req.body.username,
          forms: forms,
        });
      });
  } else {
    return res.status(500).send({ message: "Not valid username", status: 500 });
  }
};
exports.getAllPromoClasses = (req, res) => {
  if (req.body.username === "admin@edusession.live") {
    ContactForm.find({})
      .sort({ _id: -1 })
      // .populate("roles", "-__v")
      .exec((err, forms) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        if (!forms) {
          return res.status(404).send({ message: "Not found." });
        }
        res.status(200).send({
          username: req.body.username,
          forms: forms,
        });
      });
  } else {
    return res.status(500).send({ message: "Not valid username", status: 500 });
  }
};

const getCourseData = {
  "jee-mains-and-advanced(mh-cet-and-gcet)": JEE,
  "neet-ug": NEETUG,
  "spoken-english": SpokenEnglish,
};

exports.getCourseContent = (req, res) => {
  const course = new Course({
    course: req.body.course,
    data: getCourseData[`${req.body.course}`],
  });
  // .populate("roles", "-__v")
  if (!getCourseData[req.body.course]) {
    return res.status(404).send({ message: "Not found.", status: 404 });
  }
  res.status(200).send({
    courseData: course,
    status: 200,
  });
};

exports.getAllLocationsData = (req, res) => {
  if (req.body.username === "admin@edusession.live") {
    Location.find({})
      // .populate("roles", "-__v")
      .exec((err, forms) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        if (!forms) {
          return res.status(404).send({ message: "Not found." });
        }
        var cityResult = {};
        var pathResult = {};
        for (let { city, path } of forms)
          if (city) {
            cityResult[city] = {
              city,
              path,
              count: cityResult[city] ? cityResult[city].count + 1 : 1,
            };
          }

        for (let { path } of forms)
          if (path) {
            if (path == "/") {
              pathResult["Main_Homepage"] = {
                path,
                count: pathResult["Main_Homepage"]
                  ? pathResult["Main_Homepage"].count + 1
                  : 1,
              };
            } else
              pathResult[path] = {
                path,
                count: pathResult[path] ? pathResult[path].count + 1 : 1,
              };
          }
        let databycity = Object.values(cityResult);
        let databypath = Object.values(pathResult);

        res.status(200).send({
          forms: {
            databycity,
            databypath,
          },
        });
      });
  } else {
    return res.status(500).send({ message: "Not valid username", status: 500 });
  }
};

exports.trackLocation = (req, res) => {
  var options = {
    provider: "openstreetmap",
  };

  var geocoder = NodeGeocoder(options);
  geocoder
    .reverse({ lat: Number(req.body.lat), lon: Number(req.body.lon) })
    .then((result) => {
      //console.log(result);
      const form = new Location({
        city: result?.[0].city,
        formattedAddress: `${result?.[0].formattedAddress}`,
        country: result?.[0].country,
        countryCode: result?.[0].countryCode,
        zipcode: `${result?.[0].zipcode}`,
        lat: `${req.body.lat}`,
        lon: `${req.body.lon}`,
        path: `${req.body.path}`,
      });

      form.save((err, user) => {
        if (err) {
          res.status(500).send({ message: err, status: 500 });
          return;
        }

        if (req.body.roles) {
          Role.find(
            {
              name: { $in: req.body.roles },
            },
            (err, roles) => {
              if (err) {
                res.status(500).send({ message: err, status: 500 });
                return;
              }

              form.roles = roles.map((role) => role._id);
              form.save((err) => {
                if (err) {
                  res.status(500).send({ message: err, status: 500 });
                  return;
                }

                res.status(200).send({
                  message: "Location Submitted Successfully",
                  status: 200,
                });
              });
            }
          );
        } else {
          Role.findOne({ name: "user" }, (err, role) => {
            if (err) {
              res.status(500).send({ message: err, status: 500 });
              return;
            }

            form.roles = [role._id];
            form.save((err) => {
              if (err) {
                res.status(500).send({ message: err, status: 500 });
                return;
              }

              res.status(200).send({
                message: "Location Submitted Successfully.",
                status: 200,
              });
            });
          });
        }
      });
    });
};

exports.emailNotification = async (req, res) => {
  try {
    const { to, subject, body } = req.body;
    if (!to || !subject || !body) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // Create a Nodemailer transporter
    const transporter = mailTransport();
    // Define the email options
    const mailOptions = {
      from: process.env.fromemail || "support@edusession.live",
      to,
      subject,
      html: body,
      bcc: process.env.bcc
        ? process.env.bcc.join(", ")
        : "edusession123@gmail.com, pcedusession@gmail.com",
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);

    if (error.code === "ECONNECTION") {
      return res
        .status(500)
        .json({ message: "Failed to connect to the email server." });
    }

    res.status(500).json({ message: "Failed to send email." });
  }
};
