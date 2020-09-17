import React from "react";
import Layout from "../components/layout";
import Join from "../components/join";

// export default () => (
//   <Layout>
//     <h1>TODO: create app</h1>
//   </Layout>
// );

const Index = () => (
  <Layout>
    <Join />
  </Layout>
);

export default Index;

// useContext: Accepts a context object (the value returned from React.createContext) and returns the current context value for that context.

// useReducer example:
// const initialState = {count: 0};

// function reducer(state, action) {
//   switch (action.type) {
//     case 'increment':
//       return {count: state.count + 1};
//     case 'decrement':
//       return {count: state.count - 1};
//     default:
//       throw new Error();
//   }
// }

// function Counter() {
//   const [state, dispatch] = useReducer(reducer, initialState);
//   return (
//     <>
//       Count: {state.count}
//       <button onClick={() => dispatch({type: 'decrement'})}>-</button>
//       <button onClick={() => dispatch({type: 'increment'})}>+</button>
//     </>
//   );
// }