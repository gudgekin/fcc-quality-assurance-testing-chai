const chai = require('chai');
const assert = chai.assert;

const server = require('../server');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

suite('Functional Tests', function () {
  this.timeout(5000);
  suite('Integration tests with chai-http', function () {
    // #1
    test('Test GET /hello with no name', function (done) {
      chai
        .request(server)
        .keepOpen()
        .get('/hello')
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'hello Guest');
          done();
        });
    });
    // #2
    test('Test GET /hello with your name', function (done) {
      chai
        .request(server)
        .keepOpen()
        .get('/hello?name=xy_z')
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'hello xy_z');
          done();
        });
    });
// #3
test('Send {surname: "Colombo"}', function(done) {
  chai
    .request(server)
    .keepOpen()
    .put('/travellers')          // PUT request to /travellers
    .send({ surname: 'Colombo' }) // Send the JSON body
    .end(function(err, res) {
      assert.equal(res.status, 200, 'Response status should be 200');
      assert.equal(res.body.name, 'Cristoforo', 'First name should be Cristoforo');
      assert.equal(res.body.surname, 'Colombo', 'Surname should be Colombo');
      done(); // Signals that the async test is complete
    });
});

// #4
test('Send {surname: "da Verrazzano"}', function(done) {
  chai
    .request(server)
    .keepOpen()
    .put('/travellers')
    .send({ surname: "da Verrazzano" })
    .end(function(err, res) {
      assert.equal(res.status, 200);
      assert.equal(res.type, 'application/json');
      assert.equal(res.body.name, 'Giovanni');
      assert.equal(res.body.surname, 'da Verrazzano');
      done();
    });
});




  });
});

const Browser = require('zombie');

// Step 1: set the URL of your site
Browser.site = 'https://fcc-quality-assurance-testing-chai.onrender.com';

const browser = new Browser();


suite('Functional Tests with Zombie.js', function () {
  this.timeout(5000);

suiteSetup(function(done) {
  return browser.visit('/', done);
});


  suite('Headless browser', function () {
    test('should have a working "site" property', function() {
      assert.isNotNull(browser.site);
    });
  });

  suite('"Famous Italian Explorers" form', function () {
// #5
test('Submit the surname "Colombo" in the HTML form', function (done) {
  browser
    .fill('surname', 'Colombo') // fills the form field with name="surname"
    .pressButton('submit', function() { // presses the submit button
      assert.equal(browser.text('#name'), 'Cristoforo'); // checks the name displayed
      assert.equal(browser.text('#surname'), 'Colombo'); // checks the surname displayed
      done();
    });
});


    // #6
    test('Submit the surname "Vespucci" in the HTML form', function (done) {
      assert.fail();

      done();
    });
  });
});
