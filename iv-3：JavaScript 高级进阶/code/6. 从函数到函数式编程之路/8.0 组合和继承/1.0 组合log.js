
class Logger {
    log() {
        console.log(...arguments);
    }
    error() {
        console.error(...arguments);
    }
}

class Reporter {
    constructor(logger) {
        this.logger = logger || new Logger();
    }
    report() {
        // TODO:
        this.logger.log("report");
    }
}

var reporter = new Reporter();
reporter.report()