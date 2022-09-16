
//process.env.NODE_ENV = "test";
const chai = require('chai');
const chaiHttp = require('chai-http');
//const app = require('../app');
const should = chai.should();
const expect = chai.expect;

chai.use(require('chai-json-schema'));
chai.use(chaiHttp);
const app = require("../index");

//get all emp
describe('/emp', () => {
  it('it expect to GET all the Employee', (done) => {
      chai.request(app)
          .get('/emp')
          .end((err, res) => {
              expect(res).to.have.status(200);
              expect(res.body).to.be.an('object');
              //expect(res.body.message.should.be.eql('All employee data'));
              done();
          });
  });
});

//get emp by id
describe('/emp/:id', () => {
  var empId = 1;
  it('it expect to GET the Employee by Id', (done) => {
      chai.request(app)
          .get('/emp/' + empId)
          .end((err, res) => {
              expect(res).to.have.status(200);
              expect(res).to.be.json;
              expect(res.body).to.be.an('object');
              //expect(res.body.message.should.be.eql('Employee found'));
              done();
          });
  });
});


//post an employee
describe('/emp', () => {
  it('Adding an employee', (done) => {
      let employee = {
          "name": "test-chai",
          "city": "Atartica",
          "salary": "987",
          "company": "Programmer",
          "gender": "male" 
      }
      chai.request(app)
          .post('/emp')
          .send(employee)
          .end((err, res) => {
              //expect(res).to.have.status(200);
              expect(res).to.be.an('object');
              //expect(res.body.message.should.be.eql("Employee Created with emp id " + res.body.data.employeeId));
              done();
          });
  });
});


//update an employee
describe('/emp/:id', () => {
  it('updating an employee', (done) => {
      let empId = 1;
      let employee = {
        "name": "test",
      }
      chai.request(app)
          .patch('/emp' + empId)
          .send(employee)
          .end((err, res) => {
              //expect(res).to.have.status(200);
              expect(res).to.be.an('object');
              //expect(res.body.message.should.be.eql("Employee Updated Successfully"));
              done();
          });
  });
});
