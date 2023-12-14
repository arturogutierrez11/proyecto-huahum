const { Pool } = require('pg')
 
const pool = new Pool({
  connectionString: "postgres://default:uz9AdbGHn2am@ep-red-sunset-66050248-pooler.us-east-1.postgres.vercel-storage.com:5432/verceldb" + "?sslmode=require",
})

pool.connect((err) => {
    if (err) throw err
    console.log("Connect to PostgreSQL successfully!")
})

module.exports = pool