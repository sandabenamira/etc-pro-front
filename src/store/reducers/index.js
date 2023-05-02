import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import Settings from "./Settings";
import Auth from "./Auth";
import Users from "./Users";
import trainings from "./Trainings";
import Inscriptions from "./Inscriptions";
import Entreprises from "./Entreprise";
import Agence from "./Agence";
import Partner from "./Partner"
// eslint-disable-next-line import/no-anonymous-default-export
export default (history) =>
  combineReducers({
    router: connectRouter(history),
    settings: Settings, // used
    auth: Auth, // used
    users: Users,
    trainings: trainings,
    Inscriptions: Inscriptions,
    Entreprise: Entreprises,
    Agence: Agence,
    Partner:Partner
  });
