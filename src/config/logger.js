'use-strict'
const { createLogger, transports, format } = require('winston')

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.simple(),
        format.timestamp({
            format: 'MMM-DD-YYYY HH:mm:ss'
        }),
        format.printf(
            info => `[${info.timestamp}]  '${info.level}' ${info.message}`
        )
    ),
    transports: [
        new transports.Console({
            level: 'debug'
        }),
        new transports.File({ 
            maxsize: 3120000,
            maxFiles: 2,
            filename: `${__dirname}/../../logs/errors.log`, 
            level: 'error' }),
        new transports.File({ 
            maxsize: 3120000,
            maxFiles: 1,
            filename: `${__dirname}/../../logs/warns.log`, 
            level: 'warn' }),
        new transports.File({ 
            maxsize: 5120000,
            maxFiles: 5,
            filename: `${__dirname}/../../logs/logs.log` }),
    ]
})

module.exports = logger