// import produce from "immer";

const immer = require("immer");
const { produce } = immer;

const baseState = [
  {
    title: "Learn TypeScript",
    done: true,
  },
  {
    title: "Try Immer",
    done: false,
  },
];

const nextState = produce(baseState, (draft) => {
  draft[1].done = true;
  draft.push({ title: "Tweet about it" });
});

console.log("nextState:", nextState);
console.log("nextState==baseState:", nextState == baseState);
console.log("nextState[0]==baseState[0]:", nextState[0] == baseState[0]);
