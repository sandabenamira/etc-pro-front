/* eslint-disable no-unreachable */
/* eslint-disable import/no-anonymous-default-export */
import { ADD_TRAINING,GET_TRAINING } from "../../constants/ActionTypes";

const initialState = {
  trainings: [
    {
      theme: "Design thinking",
      title: "React 17 hooks",
      certificate: "true",
      format: "INLINE",
      description: "c'est une formation ",
      link: "www.react.new.com",
      formerId: 7,
      descriptionFormer: "c'et ingénieur so smart",
      methodology: "scrum",
      location: "",
      objective: "créer un projet innovant",
      prerequiste: "not found",
      numberDay: 1,
      modules: [
        {
          id: 0,
          title: "module1",
          value: 1,
        },
      ],
      levelsModules: [
        {
          id: 0,
          levelName: "niveau 1",
          moduleName: 1,
        },
      ],
      program: [
        {
          id: 0,
          levelName: "niveau 1",
          moduleName: 1,
        },
      ],
      price: "2",
      sessions: [
        {
          id: 0,
          startDate: "Fri Jun 10 2022 12:00:00 GMT+0100 (heure normale d’Europe centrale)",
          endDate: "Fri Jun 10 2022 12:00:00 GMT+0100 (heure normale d’Europe centrale)",
          start: "2022-06-09T11:00:00.000Z",
          end: "2022-07-18T11:00:00.000Z",
        },
      ],
      fk_id_company: 1,
      creationDate: "2022-06-10T09:19:33.768Z",
      fk_id_creator: 1,
    },

    {
      theme: " thinking",
      title: "React 16 without hooks",
      certificate: "false",
      format: "presentiel",
      description: "formation not online ",
      link: "www.react.16.com",
       descriptionFormer: "c'est ingénieure so smart so beautiful",
      methodology: "scrum",
      location: "",
      objective: "créer un projet innovant",
      prerequiste: "not found",
      numberDay: 1,
      modules: [
        {
          id: 0,
          title: "module1",
          value: 1,
        },
      ],
      levelsModules: [
        {
          id: 0,
          levelName: "niveau 1",
          moduleName: 1,
        },
      ],
      program: [
        {
          id: 0,
          levelName: "niveau 1",
          moduleName: 1,
        },
      ],
      price: "2",
      sessions: [
        {
          id: 0,
          startDate: "Fri Jun 10 2022 12:00:00 GMT+0100 (heure normale d’Europe centrale)",
          endDate: "Fri Jun 10 2022 12:00:00 GMT+0100 (heure normale d’Europe centrale)",
          start: "Fri Jun 10 2022 12:00:00 GMT+0100 (heure normale d’Europe centrale)",
          end: "Fri Jun 10 2022 12:00:00 GMT+0100 (heure normale d’Europe centrale)",
        },
      ],
      fk_id_company: 1,
      creationDate: "2022-06-10T09:19:33.768Z",
      fk_id_creator: 1,
    },
  ],
};
 export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_TRAINING: {
      return Object.assign({}, state, {
        trainings: [action.payload].concat(state.trainings),
      });
    }

    case GET_TRAINING: {
      return Object.assign({}, state, {
        trainings: action.payload,
      });
    }

    default:
      return state;
  }
}
