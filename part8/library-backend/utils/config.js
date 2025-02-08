require("dotenv").config()

MONGO_URL = process.env.MONGODB_URI

module.exports = { MONGO_URL }
