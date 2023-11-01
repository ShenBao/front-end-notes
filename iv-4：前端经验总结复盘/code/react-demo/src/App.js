import { useState } from 'react'
// import UseEffectDemo from './components/UseEffectDemo'
import UseStateDemo from './components/UseStateDemo'
// import HeartBeat from './components/HeartBeat'

function App() {
  const [flag, setFlag] = useState(true)
  
  return (
    // <p>hello</p>
    <div>
      <button onClick={() => setFlag(!flag)}>Toggle flag</button>
      <hr></hr>

      {/* <UseEffectDemo></UseEffectDemo> */}
      <UseStateDemo></UseStateDemo>
      {/* {flag && <HeartBeat></HeartBeat> } */}
    </div>
  );
}

export default App;
