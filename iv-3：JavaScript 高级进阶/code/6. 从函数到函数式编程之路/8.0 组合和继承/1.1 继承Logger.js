
class Logger {
    log() {
        console.log(...arguments);
    }
    error() {
        console.error(...arguments);
    }
}

class Reporter extends Logger {

    report() {
        // TODO:
        this.log("report");
    }
}

var reporter = new Reporter();
reporter.report()