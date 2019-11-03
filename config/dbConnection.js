const mongo = require('mongodb')

const mongoDbConnection =  function () {

  console.log('Connected to mongo database')

  const db = new mongo.Db(
    'got',
    new mongo.Server(
      'mongo',
      27017,
      {}
    ),
    {}
  )

  return db
}

module.exports = () => mongoDbConnection