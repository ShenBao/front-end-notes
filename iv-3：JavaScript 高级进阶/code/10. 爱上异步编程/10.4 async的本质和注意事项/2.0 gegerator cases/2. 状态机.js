
//PDCA 循环 .Plan-Do-Check-Action 
function* stateMachineGenerator(states, state) {
  const len = states.length;
  let index =  Math.max(states.findIndex(s => s === state) , 0);
  while (true) {
    yield states[(++index) % len];
  }
}
const startState = "Do";
const stateMachine = stateMachineGenerator(["Plan", "Do", "Check", "Action"], startState );

console.log(startState);                // Do
console.log(stateMachine.next().value); // Check
console.log(stateMachine.next().value); // Action
console.log(stateMachine.next().value); // Plan
console.log(stateMachine.next().value); // Do
console.log(stateMachine.next().value); // Check
console.log(stateMachine.next().value); // Action
console.log(stateMachine.next().value); // Plan

