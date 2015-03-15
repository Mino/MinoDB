#mocha test/test.js;
mocha --require blanket -R html-cov > coverage.html test/; open coverage.html;