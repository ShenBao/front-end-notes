async function test() {
  const r1 = await 1;
  const r2 = await 2;

  console.log("result:", r1 + r2);
}

test();