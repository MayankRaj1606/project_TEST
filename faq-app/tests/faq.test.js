const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const Faq = require("../models/Faq");

chai.use(chaiHttp);
const { expect } = chai;

describe("FAQ API Tests", () => {
  let createdFaqId;

  // 📌 Test Creating FAQ
  it("should create a new FAQ", (done) => {
    chai
      .request(server)
      .post("/api/faqs")
      .send({ question: "What is MERN?", answer: "MERN stands for MongoDB, Express, React, and Node.js." })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property("_id");
        createdFaqId = res.body._id;
        done();
      });
  });

  // 📌 Test Getting FAQs
  it("should retrieve all FAQs", (done) => {
    chai
      .request(server)
      .get("/api/faqs")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        done();
      });
  });

  // 📌 Test Deleting an FAQ
  it("should delete an FAQ", (done) => {
    chai
      .request(server)
      .delete(`/api/faqs/${createdFaqId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
