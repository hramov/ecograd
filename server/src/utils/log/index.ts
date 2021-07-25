import logger from "node-color-log"

export function toConsole(data: string, msgType: string) {
    switch(msgType) {
        case 'info': 
            logger.info(data)
            break
        case 'debug': 
            logger.debug(data)
            break
        case 'error': 
            logger.error(data)
            break
        case 'warn': 
            logger.warn(data)
            break
        default:
            logger.log(data)
    }
}