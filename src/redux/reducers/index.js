import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

const initialState = {};

export function appReducer(state = initialState, action) {
  return state;
}

const rootReducer = combineReducers({
  app: appReducer,
  router: connectRouter(history)
})

export default rootReducer;
// const initialState = {
//   people: [],
//   planets: []
// };

// export default function reducer(state = initialState, action) {
//   switch (action.type) {
//     case 'SET_PEOPLE': {
//       return { ...state, people: [...state.people, ...action.payload]}
//     }
//       case 'SET_PLANETS': {
//       return { ...state, planets: [...state.planets, ...action.payload]}
//     }
//     default: {
//       return state;
//     }
//   }
// }