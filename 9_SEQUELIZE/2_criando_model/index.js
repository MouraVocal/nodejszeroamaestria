const conn = require('./db/conn')

const User = require('./models/user')

conn.sync().then(() => console.log('Models sincronizados'))
  .catch((err) => console.log(err))
