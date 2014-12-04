var assert = require("assert"),
    form = require("../index"),
    filter = form.filter,
    validate = form.validate,
    express = require("express"),
    http = require("http"),
    request = require("request"),
    bodyParser = require("body-parser"),
    app = express();

http.createServer(app).listen(3000);

// some duct-tape to make assert.response work with express 3.x
app.address = function() {
  
  return {port: 3000};
};
app.close = function() {
  process.exit(0);
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

module.exports = {
  'express : middleware : valid-form': function(done) {
    app.post(
      '/user',
      form(
        filter("username").trim(),
        validate("username").required().is(/^[a-z]+$/),
        filter("password").trim(),
        validate("password").required().is(/^[0-9]+$/)
      ),
      function(req, res){
        assert.strictEqual(req.form.username, "dandean");
        assert.strictEqual(req.form.password, "12345");
        assert.strictEqual(req.form.isValid, true);
        assert.strictEqual(req.form.errors.length, 0);
        res.send(JSON.stringify(req.form));
      }
    );

    request.post({
      url: 'http://localhost:3000/user',
      method: 'POST',
      body: JSON.stringify({
        username: "   dandean   \n\n\t",
        password: " 12345 "
      }),
      headers: { 'Content-Type': 'application/json' }
    }, function(err, res, body) {
      assert.ifError(err);
      assert.strictEqual(res.statusCode, 200);
      done();
    });
  },

  'express : middleware : merged-data': function(done) {
    app.post(
      '/user/:id',
      form(
        filter("id").toInt(),
        filter("stuff").toUpper(),
        filter("rad").toUpper()
      ),
      function(req, res){
        // Validate filtered form data
        assert.strictEqual(req.form.id, 5);     // from param
        assert.equal(req.form.stuff, "THINGS"); // from query param
        assert.equal(req.form.rad, "COOL");     // from body

        // Check that originl values are still in place
        assert.ok(typeof req.params.id, "string");
        assert.equal(req.query.stuff, "things");
        assert.equal(req.body.rad, "cool");

        res.send(JSON.stringify(req.form));
      }
    );

    request({
      url: 'http://localhost:3000/user/5?stuff=things&id=overridden',
      method: 'POST',
      body: JSON.stringify({
        id: "overridden by url param",
        stuff: "overridden by query param",
        rad: "cool"
      }),
      headers: { 'Content-Type': 'application/json' }
    }, function(err, res, body) {
      assert.ifError(err);
      assert.strictEqual(res.statusCode, 200);
      done();
    });
  }


};
