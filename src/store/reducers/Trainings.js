/* eslint-disable no-unreachable */
/* eslint-disable import/no-anonymous-default-export */
import { ADD_TRAINING,GET_TRAINING } from "../../constants/ActionTypes";

const initialState = {
  trainings: [
    {
      theme: "React 17",
      title: "override function / Hooks",
      certificate: "true",
      format: "INLINE",
      description: "Pour débutant ",
      trainer:"MR MOHAMED BOUJMIL",
      link: "www.react.new.com",
      formerId: 7,
      descriptionFormer: "c'et ingénieur so smart",
      methodology: "scrum",
      formation:"avec MR MOHAMED BOUJMIL",
      location: "",
      objective: "créer un projet innovant",
      prerequiste: "not found",
      numberDay: 7,
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
          startDate: "Fri Jun 10 2023 12:00:00 GMT+0100 (heure normale d’Europe centrale)",
          endDate: "Fri Jun 10 2023 12:00:00 GMT+0100 (heure normale d’Europe centrale)",
          start: "2023-06-09T11:00:00.000Z",
          end: "2023-07-18T11:00:00.000Z",
        },
      ],
      fk_id_company: 1,
      creationDate: "2023",
      fk_id_creator: 1,
      img:"img1"
    },

    {
      theme: "Design Thinking",
      title: "Innovation centrée sur l’humain",
      certificate: "false",
      format: "en ligne",
      description: " Le design thinking permet de réaliser des produits ou des services ",
      link: "www.react.16.com",
      methodology: "scrum",
      location: "",
      objective: "créer un projet innovant",
      prerequiste: "not found",
      numberDay: 5,
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
          startDate: "Fri Jun 10 2023 12:00:00 GMT+0100 (heure normale d’Europe centrale)",
          endDate: "Fri Jun 10 20236 12:00:00 GMT+0100 (heure normale d’Europe centrale)",
          start: "Fri Jun 10 2023 12:00:00 GMT+0100 (heure normale d’Europe centrale)",
          end: "Fri Jun 10 2023 12:00:00 GMT+0100 (heure normale d’Europe centrale)",
        },
      ],
      fk_id_company: 1,
      creationDate: "2023-06-10T09:19:33.768Z",
      fk_id_creator: 1,
      img:"img2"
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
