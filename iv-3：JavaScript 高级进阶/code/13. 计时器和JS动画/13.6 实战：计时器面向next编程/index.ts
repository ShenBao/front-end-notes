interface Unsubscribe {
  (): void;
}

interface CallbackFunction<T = any> {
  (context: T, ...args: any[]): void;
}

interface NextFnInfo<T = any> {
  cancel: Unsubscribe;
  execute: (next: CallbackFunction<T>) => any;
}

interface NextFnGenerator {
  (...args: any[]): NextFnInfo;
}

enum EnumStatus {
  uninitialized = 0,
  initialized,
  waiting,
  working,
  canceled,
  unkown,
}

export default class NextGenerator<T = any> {
  private status: EnumStatus = EnumStatus.uninitialized;
  private nextInfo!: NextFnInfo;

  // 传入的回调函数
  private cb!: CallbackFunction;

  // 下次回调函数的参数
  private args: any[] = [];

  constructor(private generator: NextFnGenerator) {
    this.status = EnumStatus.initialized;
    this.next = this.next.bind(this);
  }

  private next(...args: any[]) {

    // 状态判断
    if (this.status === EnumStatus.canceled) {
      return console.warn(
        "current status is canceled, please call continue method to continue"
      );
    }
    if (this.status === EnumStatus.waiting) {
      return console.warn(
        "current status is waiting, please don't multiple call next method"
      );
    }
    if (args.length > 0) {
      this.args = args;
    }

    // 计时器到期，真正被执行的函数
    const boundFn = this.execute.bind(this, this.cb, ...this.args);
    this.nextInfo = this.generator(boundFn);

    this.status = EnumStatus.waiting;
    this.nextInfo.execute(undefined as any);
  }

  private execute(
    this: NextGenerator<T>,
    cb: Function,
    context: T,
    ...args: any[]
  ) {
    this.status = EnumStatus.working;
    cb.apply(context, [this.next, ...args]);
  }

  cancel() {
    this.status = EnumStatus.canceled;
    if (this.nextInfo && typeof this.nextInfo.cancel === "function") {
      this.nextInfo.cancel();
    }
  }

  start(cb: CallbackFunction, ...args: any[]) {
    if (typeof cb !== "function") {
      throw new SyntaxError("param cb must be a function");
    }
    this.cb = cb;

    if (args.length > 0) {
      this.args = args;
    }

    this.next();
  }

  continue() {
    this.status = EnumStatus.initialized;
    this.next();
  }
}

export function createRequestAnimationFrameGenerator() {
  const requestAnimationFrameGenerator: NextFnGenerator = function (cb: FrameRequestCallback) {
    let ticket: any;
    function execute() {
      ticket = window.requestAnimationFrame(cb);
    }

    return {
      execute,
      cancel: function () {
        cancelAnimationFrame(ticket);
      },
    } as NextFnInfo;
  };

  const factory = new NextGenerator(requestAnimationFrameGenerator);
  return factory;
}

export function createTimeoutGenerator(interval: number = 1000) {
  const timeoutGenerator: NextFnGenerator = function (cb: Function) {
    let ticket: number;
    function execute() {
      ticket = setTimeout(cb, interval);
    }
    return {
      execute,
      cancel: function () {
        clearTimeout(ticket);
      },
    } as NextFnInfo;
  };
  const factory = new NextGenerator(timeoutGenerator);
  return factory;
}

export function createStepUpGenerator(interval: number = 1000) {
  let isFirst = true;
  const stepUpGenerator: NextFnGenerator = function (cb: Function) {
    let ticket: any;
    function execute() {
      interval = isFirst ? interval : interval * 2;
      ticket = setTimeout(cb, interval);
      isFirst = false;
    }

    return {
      execute,
      cancel: function () {
        clearTimeout(ticket);
      },
    } as NextFnInfo;
  };

  const factory = new NextGenerator(stepUpGenerator);
  return factory;
}
