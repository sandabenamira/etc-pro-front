import { GENERATE_BILLS, FETECHED_ALL_BILLS, PAY_BILL } from '../constants/ActionTypes'; /* eslint eqeqeq: "off" */


const initialState = {
  remoteBills: [],
};

export default function (state = initialState, action) {
  if (action.type === FETECHED_ALL_BILLS) {
    return Object.assign({}, state, {
      remoteBills: action.payload,
    });
  }

  if (action.type === GENERATE_BILLS) {
    return Object.assign({}, state, {
      remoteBills: state.remoteBills.concat(action.payload),
    });
  }

  if (action.type === PAY_BILL) {
    return Object.assign({}, state, {
        remoteBills: state.remoteBills.map(element => {
            if (element.bill.id === action.payload.bill.id) {        
            return action.payload;
            } else {
            return element;
            }
        })
      });
  }

  return state;
}
