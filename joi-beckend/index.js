const express = require("express");
const Joi = require("joi");
const cors = require("cors")


const validateCoure = (course) => {
  const schema = Joi.object().keys({
    name: Joi.string().min(3).required(),
    email: Joi.string()
      .min(3)
      .required()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
    phone: Joi.string().min(6).max(10).required(),
    age: Joi.string().min(2).required(),
  });
  const result = Joi.validate(course, schema);
  return result;
};

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world!");
});


app.post("/api/addData", (req, res) => {
  response = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    age: req.body.age,
  };
  const { error } = validateCoure(response);
  console.log(error, "Error<<")
  if (error) return res.status(400).send(error.details[0]?.message);
  // console.log(req.body, "<body");
  // const newCourse = {
  //   id: courses.length + 1,
  //   course_name: req.body.course_name,
  //   uploading_month: month,
  //   year: year,
  // };

  // courses.push(newCourse);
  res.send(req.body);
  res.end();
});

app.put("/api/updateCourse/:id", (req, res) => {
  console.log(req.params.id);

  //validate id
  const course = courses.find((item) => item?.id === parseInt(req.params.id));

  if (!course)
    return res.status(404).send("course with given id doesn't exist");

  //validate payload
  // console.log(validateCoure(req.body), "result<<<");
  // const { error } = validateCoure(req.body);
  // if (error) return req.status(400).send("invalid payload");

  //update data

  course.course_name = req.body.course_name;
  console.log(course, req.body.course_name);
  res.send(course);
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`listening on port num ${port}`);
});
