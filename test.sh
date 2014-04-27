mocha test/;
mocha --require blanket -R html-cov > coverage.html test/; open coverage.html;