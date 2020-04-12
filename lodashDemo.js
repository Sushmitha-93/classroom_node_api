const _ = require("lodash");
const ObjectId = require("mongodb").ObjectID;

let student = {
  _id: ObjectId("5e6e4a2cb8ab5a37b826fc9a"),
  name: "Sushmitha D.T",
  rollno: 1,
  class: "5a",
  phone: "8050033558",
  gender: "Female",
  address: "Bengaluru",
  marksSheet: [
    {
      testId: ObjectId("5e77ad53c06a8189af6e585c"),
      testName: "abcd",
      testScores: {
        English: 32.5,
        Maths: 32.0,
      },
    },
    {
      testId: ObjectId("5e7f7a477db18a5ee003ca47"),
      testName: "MCQ Test",
      testScores: {
        English: 30.0,
        Maths: 36.0,
      },
    },
    {
      _id: ObjectId("5e931e8b7c18b4512ce1c486"),
      testId: ObjectId("5e77ad53c06a8189af6e585a"),
      testName: "Unit Test 1",
      testScores: {
        English: 32.5,
      },
    },
    {
      _id: ObjectId("5e931fec8f1fff416c9ef0cb"),
      testId: ObjectId("5e77ad53c06a8189af6e585b"),
      testName: "MCQ Test2",
      testScores: {
        English: 25,
        Biology: 22,
      },
    },
  ],
};

let subName = "English";
let testId = "5e7f7a477db18a5ee003ca46";

{
  student.marksSheet.length === 0 ||
    ((result = _.find(student.marksSheet, {
      testId: ObjectId(testId),
    })) &&
      typeof result === "undefined") ||
    typeof result === "undefined" ||
    (result = result.testScores[subName]);
}

console.log(result);
