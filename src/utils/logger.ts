import logger from 'pino'
import dayjs from 'dayjs'

const log = logger({
  transport: {
    target: 'pino-pretty',
    options: {
      ignore: 'req.headers,res',
      levelFirst: true,
      translateTime: true,
      colorize: true,
    },
  },
  base: {
    pid: false,
  },
  //   timestamp: () => `."time": ${dayjs().format()}`,
})

export default log
