const mongoose = require('mongoose');
const { dbHost } = require('../config');

const opts = {
  useUnifiedTopology: true,
  useNewUrlParser: true
}

mongoose.connect(dbHost, opts, (err) => {
  if(err)
	return console.log(err)

  console.log(`Succesfull connection to mongo :D! ${url}`)
})

module.exports = mongoose.connection;
