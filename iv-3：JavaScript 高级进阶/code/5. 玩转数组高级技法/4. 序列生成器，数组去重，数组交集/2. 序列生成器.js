const createValues = (creator, length = 10) => Array.from({ length }, creator);

const createRange = (start, stop, step) =>
  createValues((_, i) => start + i * step, (stop - start) / step + 1);

const values = createRange(1, 100, 3);

console.log(values);
