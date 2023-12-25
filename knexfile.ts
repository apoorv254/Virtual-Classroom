import dotenv from 'dotenv'
import type { Knex } from 'knex'
import path from 'path'

export const loadDotEnv = (nodeEnv = 'dev') => {
  dotenv.config({ path: path.resolve(`./configs/.${nodeEnv}.env`) })
  dotenv.config({ path: path.resolve('./configs/.env') })
}

loadDotEnv(process.env.NODE_ENV)

const config: Knex.Config = {
  client: process.env.DB_CLIENT,
  connection: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    directory: path.resolve('./migrations')
  },
  seeds: {
    directory: path.resolve('./seedData')
  }
}

module.exports = config
