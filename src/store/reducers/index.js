import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import Settings from './Settings';
import Auth from './Auth';
import establishmentReducer from './Establishment';
import Alerts from './Alert';
import SchoolYearEtabReducer from './SchoolYearEtab';

export default history =>
  combineReducers({
    router: connectRouter(history),
    settings: Settings, // used
    auth: Auth, // used
    establishment: establishmentReducer, // used
    schoolYearEtab: SchoolYearEtabReducer, // used
    alert: Alerts, // used
  });
