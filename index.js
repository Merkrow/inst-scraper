const { scrapeProfile } = require('./lib');

scrapeProfile('leomessi').then((data) => console.log(data))
