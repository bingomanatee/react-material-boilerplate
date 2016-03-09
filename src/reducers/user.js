import {SET_USER} from '../actions/types';
import objectAssign from 'object-assign';

const initialState = {
  user: null,
  displayName: ''
};

//IMPORTANT: Note that with Redux, state should NEVER be changed.
//State is considered immutable. Instead,
//create a copy of the state passed and set new values on the copy.
//Note that I'm using Object.assign to create a copy of current state
//and update values on the copy.
export default function fuelSavingsAppState (state = initialState, action) {
  let out = state;
  switch (action.type) {
    case SET_USER:
      out = objectAssign({}, {
        user: action.user || null,
        displayName: action.user ? action.user.displayName || action.user.name : ''
      });
      break;
    default:
  }

  return out;
}
