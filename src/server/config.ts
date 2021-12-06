import convict from 'convict'

const config = convict({
  env: {
    doc: 'Node environment.',
    format: ['development', 'test', 'production'],
    default: 'production',
    env: 'NODE_ENV'
  },
  appEnv: {
    doc: 'Applicaton environment.',
    format: ['development', 'staging', 'production'],
    default: 'development',
    env: 'APP_ENV'
  },
  host: {
    doc: 'Server host',
    format: String,
    default: '0.0.0.0',
    env: 'HOST'
  },
  port: {
    doc: 'Server port',
    format: 'port',
    default: 9000,
    env: 'PORT'
  },
  perfAnalyticsApi: {
    doc: 'Perf analytics api host',
    format: String,
    default: 'http://localhost:8080',
    env: 'PERF_ANALYTICS_API'
  }
})

config.validate({ allowed: 'strict' })

export type PassedToClient = Pick<ReturnType<typeof config.getProperties>, 'perfAnalyticsApi'>

export default config
