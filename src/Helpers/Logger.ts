// logger.ts
        enum LogColor {
            Reset = '[0m',
            FgRed = '[31m',
            FgGreen = '[32m',
            FgBlue = '[34m',
        }
        
        function logWithColor(color: LogColor, message: any) {
            console.log(color, message, LogColor.Reset);
        }
        
        export function success(message: any) {
            logWithColor(LogColor.FgGreen, message);
        }
        
        export function error(message: any) {
            logWithColor(LogColor.FgRed, message);
        }
        
        export function msg(message: any) {
            logWithColor(LogColor.FgBlue, message);
        }