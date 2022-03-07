import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import Settings from './Settings';
import Auth from './Auth';
import Users from './Users';
import Trainings from './Trainings';
import Inscriptions from './Inscriptions';

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    settings: Settings, // used
    auth: Auth, // used
    users: Users,
    trainings: Trainings,
    Inscriptions: Inscriptions,
  });
