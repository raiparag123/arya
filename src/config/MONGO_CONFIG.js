'use strict'

require('dotenv').config();

const {
  MONGO_DBNAME,
  MONGO_USERNAME,
  MONGO_HOST,
  MONGO_PORT,
  MONGO_PASSWORD,
  APP_NAME
} = process.env

const OPTIONS = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}

const CONNECTION_URI = `mongodb+srv://${encodeURIComponent(MONGO_USERNAME)}:${encodeURIComponent(MONGO_PASSWORD)}@${MONGO_HOST}/${MONGO_DBNAME}?retryWrites=true&writeConcern=majority&appName=${encodeURIComponent(APP_NAME)}`;

const MONGO_CONFIG = {
  MONGO_DBNAME,
  OPTIONS,
  CONNECTION_URI
}

const checkDbKeys = config => {
  Object.keys(config).forEach((key) => {
    if (!config[key]) {
      console.error('[Error] Missing MongoDB Config:', key)
      return process.exit(1)
    }
  })
}

// Terminate Server if any, DB Configuration is missing
checkDbKeys(MONGO_CONFIG)

module.exports = { MONGO_CONFIG };
