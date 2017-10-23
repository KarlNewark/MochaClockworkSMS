'use strict';

var mocha = require('mocha');

module.exports = function (runner) {
  mocha.reporters.Base.call(this, runner);
  var passes = 0;
  var failures = 0;

  function MessageGen(pass, fail) {
    var opening = "Mocha tests complete: "
    var message = ""
    if (!fail) {
      message = opening + "all " + pass + " tests have passed";
    }
    else if (!pass) {
      message = opening + "all " + fail + " tests have failed";
    } else {
      message = opening + pass + " passed " + fail + " failed (" + (pass / (pass + fail) * 100).toFixed(2) + "% success rate)."
    }
    return encodeURI(message);
  }

  runner.on('pass', function (test) {
    passes++;
    console.log('pass: %s', test.fullTitle());



  });

  runner.on('fail', function (test, err) {
    failures++;
    console.log('fail: %s -- error: %s', test.fullTitle(), err.message);
  });

  runner.on('end', function () {

    var http = require("https");

    var options = {
      "method": "POST",
      "hostname": "api.clockworksms.com",
      "port": null,
      "path": "/http/send.aspx?Key=" + encodeURI(process.env.CLOCKWORK_KEY) + "&To=" + encodeURI(process.env.CLOCKWORK_RECIPIENT) + "&Content=" + MessageGen(passes, failures) + "&From=CD%2FCI"
    };

    var req = http.request(options, function (res) {
      var chunks = [];

      res.on("data", function (chunk) {
        chunks.push(chunk);
      });

      res.on("end", function () {
        console.log('SMS Alert Sent');
      });
    });

    req.end();

    done();

  })
};
