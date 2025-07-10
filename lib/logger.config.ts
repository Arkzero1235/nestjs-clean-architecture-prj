import { WinstonModuleOptions } from 'nest-winston'
import * as winston from 'winston'
import * as path from 'path'

export const winstonConfig: WinstonModuleOptions = {
    transports: [
        new winston.transports.File({
            filename: path.join('logs', 'error.log'),
            level: 'error',
        }),
        new winston.transports.File({
            filename: path.join('logs', 'combined.log'),
        }),
        new winston.transports.Console({
            format: winston.format.simple(),
        }),
    ],
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
    ),
}
