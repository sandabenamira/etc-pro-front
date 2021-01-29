import arrayMove from 'array-move';
import {
  FETCH_ALL_TODO_CONVERSATION_SUCCESS,
  FETCH_ALL_TODO_SUCCESS,
  GET_ALL_TODO,
  GET_IMPORTANT_TODO,
  GET_MARK_AS_START,
  GET_NAV_FILTERS,
  GET_NAV_LABELS,
  GET_STARRED_TODO,
  GET_TODO_CONVERSATION,
  GET_UNIMPORTANT_TODO,
  GET_UNSELECTED_ALL_TODO,
  GET_UNSTARRED_TODO,
  HANDLE_REQUEST_CLOSE,
  ON_DELETE_TODO,
  ON_HIDE_LOADER,
  ON_LABEL_MENU_ITEM_SELECT,
  ON_LABEL_SELECT,
  ON_LABEL_UPDATE,
  ON_OPTION_MENU_ITEM_SELECT,
  ON_OPTION_MENU_SELECT,
  ON_SORTEND,
  ON_TODO_ADD,
  ON_TODO_CHECKED,
  ON_TODO_SELECT,
  ON_TODO_UPDATE,
  ON_TOGGLE_DRAWER,
  SEARCH_TODO,
  SELECT_ALL_TODO,
  SET_CURRENT_TODO_NULL,
  SHOW_MESSAGE,
  SHOW_TODOS,
  UPDATE_SEARCH,
  ADD_HOMEWORK,
  ASSIGN_HOMEWORK,
  GET_LABELS_FOR_HOMRWORK,
  FETCH_ALL_TODO_SUCCESS_FOR_PARENT,
  FETCH_ALL_TODO_SUCCESS_FOR_ADMIN,
  GET_NAV_LABELS_FOR_ADMIN,
  ADD_TODO_CONVERSATION,
  FETCH_SUBJECTS_PROFESSORS
} from '../constants/ActionTypes';
import React from 'react';
import IntlMessages from '../util/IntlMessages';

const INIT_STATE = {
  searchTodo: '',
  alertMessage: '',
  loader: true,
  showMessage: false,
  optionName: <IntlMessages id="autocomplete.emploidutemps.none"/>,
  drawerState: false,
  allToDos: [],
  currentTodo: null,
  user: {
    name: 'Robert Johnson',
    email: 'robert.johnson@example.com',
    avatar: 'https://via.placeholder.com/150x150'
  },
  selectedToDos: 0,
  labelMenuState: false,
  optionMenuState: false,
  toDos: [],
  toDosForParent:[],
  toDosForAdmin:[],
  filter: -1,
  todoConversation: [],
  // todoConversation,
  conversation: null,
  assignHomeworkList : [],
  labels:[],
  subjectsProfessors:[]
};


export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case ON_SORTEND: {
      return {
        ...state, toDos: arrayMove(state.toDos, action.payload.oldIndex, action.payload.newIndex)
      }
    }
    case ON_LABEL_SELECT: {
      return {
        ...state,
        labelMenuState: !state.labelMenuState
      }
    }
    case ON_OPTION_MENU_SELECT: {
      return {
        ...state,
        optionMenuState: !state.optionMenuState
      }
    }
    case ON_OPTION_MENU_ITEM_SELECT: {
      return { ...state }
    }
    case SELECT_ALL_TODO: {
      let toDos = state.allToDos.map((todo) => todo ? {
        ...todo,
        selected: true
      } : todo);

      return {
        ...state,
        selectedToDos: toDos.length,
        allToDos: action.payload,
        optionName: 'All',
        toDos: action.payload
      }
    }
    case GET_ALL_TODO: {
      return {
        ...state,
        currentTodo: null,
         toDos: state.allToDos
      }
    }
    case GET_UNSELECTED_ALL_TODO: {

      let toDos = state.allToDos.map((todo) => todo ? {
        ...todo,
        selected: false
      } : todo);
      return {
        ...state,
        selectedToDos: 0,
        allToDos: toDos,
        optionName: 'None',
        toDos: toDos
      }
    }
    case GET_STARRED_TODO: {
      let selectedToDos = 0;
      let toDos = state.allToDos.map((todo) => {
        if (todo.starred) {
          selectedToDos++;
          return { ...todo, selected: true };
        }
        return { ...todo, selected: false }
      });
      return {
        ...state,
        selectedToDos: selectedToDos,
        allToDos: toDos,
        optionName: 'Stared',
        toDos: toDos.filter(todo => !todo.deleted)
      }
    }
    case GET_UNSTARRED_TODO: {
      let selectedToDos = 0;
      let toDos = state.allToDos.map((todo) => {
        if (!todo.starred) {
          selectedToDos++;
          return { ...todo, selected: true };
        }
        return { ...todo, selected: false }
      });
      return {
        ...state,
        selectedToDos: selectedToDos,
        allToDos: toDos,
        optionName: 'UnStarred',
        toDos: toDos.filter(todo => !todo.deleted)
      }
    }
    case GET_IMPORTANT_TODO: {
      let selectedToDos = 0;
      let toDos = state.allToDos.map((todo) => {
        if (todo.important) {
          selectedToDos++;
          return { ...todo, selected: true };
        }
        return { ...todo, selected: false }
      });
      return {
        ...state,
        selectedToDos: selectedToDos,
        allToDos: toDos,
        optionName: 'Important',
        toDos: toDos.filter(todo => !todo.deleted)
      }
    }

    case GET_MARK_AS_START: {
      const toDos = state.allToDos.map(todo => {
        if (todo.id === action.payload.id) {
          return action.payload;
        } else {
          return todo;
        }
      });
      return {
        ...state,
        alertMessage: 'ToDo Updated Successfully',
        showMessage: true,
        allToDos: toDos,
        toDos: toDos,
      }
    }
    case GET_UNIMPORTANT_TODO: {
      let selectedToDos = 0;
      let toDos = state.allToDos.map((todo) => {
        if (!todo.important) {
          selectedToDos++;
          return { ...todo, selected: true };
        }
        return { ...todo, selected: false }
      });

      return {
        ...state,
        selectedToDos: selectedToDos,
        allToDos: toDos,
        optionName: 'Unimportant',
        toDos: toDos.filter(todo => !todo.deleted)
      }
    }
    case ON_LABEL_MENU_ITEM_SELECT: {
      const toDos = state.allToDos.map(todo => {
        if (todo.selected) {
          if (todo.labels.includes(action.payload.id)) {
            todo.labels.splice(todo.labels.indexOf(action.payload.id), 1);
            return { ...todo, labels: todo.labels };
          } else {
            return { ...todo, labels: todo.labels.concat(action.payload.id) };
          }
        } else {
          return todo;
        }
      }
      );
      return {
        ...state,
        alertMessage: 'Label Updated Successfully',
        showMessage: true,
        allToDos: toDos,
        toDos: toDos
      }
    }
    case ON_LABEL_UPDATE: {
      if (action.payload.data.labels.includes(action.payload.label.id)) {
        action.payload.data.labels.splice(action.payload.data.labels.indexOf(action.payload.label.id), 1);
      } else {
        action.payload.data.labels = action.payload.data.labels.concat(action.payload.label.id);
      }
      const toDos = state.allToDos.map(todo => {
        if (todo.id === action.payload.data.id) {
          return action.payload.data;
        } else {
          return todo;
        }
      }
      );

      return {
        ...state,
        alertMessage: 'Label Updated Successfully',
        showMessage: true,
        currentTodo: action.payload,
        allToDos: toDos,
        toDos: toDos,
      }
    }

    case ON_TODO_UPDATE: {
      
      
      const toDos = state.allToDos.map(todo => {
      if (todo.id === action.payload.id) {
        let data={
          ...action.payload,
          'professor':todo.professor
        }
      return data;
      } else {
      return todo;
      }
      });
      return {
      ...state,
      alertMessage: 'ToDo Updated Successfully',
      showMessage: true,
     // currentTodo: action.payload,
      allToDos: toDos,
      toDos: toDos,
      }
      }

    case 'TODO_UPDATE':      
      return state = [...state.allToDos.filter(element => element.id !== action.payload.id), action.payload]

      case ON_DELETE_TODO: {
        let selectedToDos = 0;
        const toDos = state.allToDos.map(todo => {
        if (todo.selected) {
        selectedToDos++
        }
        if (action.payload.id === todo.id) {
        if (todo.selected) {
        selectedToDos--
        }
        return { ...todo, deleted: true };
        } else {
        return todo;
        }
        }
        );
        return {
        ...state,
        // alertMessage: 'ToDo Deleted Successfully',
        // showMessage: true,
        allToDos: toDos,
        currentTodo: null,
        selectedToDos: selectedToDos,
        toDos: toDos.filter((todo) => !todo.deleted)
        }
        }

  //   case ON_DELETE_TODO: {
  //   return Object.assign({}, state, {
  //     allToDos: [...state.allToDos.filter(element => element.id !== action.payload.id)],
  //     alertMessage: 'ToDo Deleted Successfully',
  //      showMessage: true,
  //      currentTodo: null,
  //   });

  // }

    case GET_NAV_LABELS: {
   
      // const filterMails = state.allToDos.filter(todo => todo.labels.includes(action.payload.id));
      // return {
      //   ...state,
      //   loader: true,
      //   currentTodo: null,
      //   toDos: filterMails
      // }
      return {
        ...state,
        currentTodo: null,
        toDos: action.payload
      }
    }
    case GET_NAV_LABELS_FOR_ADMIN: {
      return {
        ...state,
        currentTodo: null,
        toDosForAdmin: action.payload
      }
    }
    case GET_NAV_FILTERS: {
      const filterMails = state.allToDos.filter(todo => {
        if (action.payload.id === 0 && todo.starred) {
          return todo
        } else if (action.payload.id === 1 && todo.important) {
          return todo
        } else if (action.payload.id === 2 && todo.important) {
          return todo
        } else if (action.payload.id === 3 && todo.important) {
          return todo
        } else if (action.payload.id === 4 && todo.completed) {
          return todo
        } else if (action.payload.id === 5 && todo.deleted) {
          return todo
        } else return todo;
      });
      return {
        ...state,
        loader: true,
        currentTodo: null,
        filter: action.payload.id,
        toDos: filterMails
      }
    }

    case SEARCH_TODO: {
      if (action.payload === '') {
        return { ...state, toDos: state.allToDos.filter((todo) => !todo.deleted) };
      } else {
        const searchToDos = state.allToDos.filter((todo) =>
          !todo.deleted && todo.title.toLowerCase().indexOf(action.payload.toLowerCase()) > -1);
        return { ...state, toDos: searchToDos }
      }
    }
    case SHOW_TODOS: {
      
      return { ...state }
    }
    case GET_TODO_CONVERSATION: {
      return { ...state }
    }
    case ON_TODO_CHECKED: {
      action.payload.selected = !action.payload.selected;
      let selectedToDos = 0;
      const toDos = state.toDos.map(todo => {
        if (todo.selected) {
          selectedToDos++;
        }
        if (todo.id === action.payload.id) {
          if (todo.selected) {
            selectedToDos++;
          }
          return action.payload;
        } else {
          return todo;
        }
      }
      );
      return {
        ...state,
        selectedToDos: selectedToDos,
        toDos: toDos
      }
    }
    case ON_TODO_ADD: {
      return {
        ...state,
        alertMessage: 'L\'ajout est effectué avec succès',
        showMessage: true,
        currentTodo: null,
        toDos: state.allToDos.concat(action.payload),
        allToDos: state.allToDos.concat(action.payload),
        toDosForAdmin: state.toDosForAdmin.concat(action.payload)
      }
    }
    case ON_TODO_SELECT: {
      let conversationList = state.todoConversation.find((conversation) => conversation.id === action.payload.id);
      if (conversationList) {
        conversationList = conversationList.conversationData;
      } else {
        conversationList = [];
      }
      return {
        ...state,
        currentTodo: action.payload,
        loader: true,
        conversation: conversationList
      }
    }
    case SET_CURRENT_TODO_NULL: {
      return { ...state, currentTodo: null }
    }
    case UPDATE_SEARCH: {
      return { ...state, searchTodo: action.payload }
    }
    case ON_TOGGLE_DRAWER: {
      return { ...state, drawerState: !state.drawerState }
    }
    case HANDLE_REQUEST_CLOSE: {
      return { ...state, showMessage: false, addTodo: false, labelMenuState: false, optionMenuState: false }
    }
    case ON_HIDE_LOADER: {
      return { ...state, loader: false }
    }
    case FETCH_ALL_TODO_SUCCESS: {
      return {
        ...state,
        allToDos: action.payload,
        toDos: action.payload,
        loader: false,
      }
    }
    case FETCH_ALL_TODO_SUCCESS_FOR_PARENT: {
      return {
        ...state,
        toDosForParent: action.payload,
        loader: false,
      }
    } 
    case FETCH_ALL_TODO_SUCCESS_FOR_ADMIN: {
      return {
        ...state,
        toDosForAdmin: action.payload,
        loader: false,
      }
    }
    case FETCH_ALL_TODO_CONVERSATION_SUCCESS: {
      return {
        ...state,
        todoConversation: action.payload
      }
    }
    case SHOW_MESSAGE: {
      return {
        ...state,
        alertMessage: action.payload,
        showMessage: true,
        loader: false
      }
    }
    case ADD_HOMEWORK: {
      return Object.assign({}, state, {
        toDos: state.toDos.concat(action.payload),
        allToDos: state.allToDos.concat(action.payload)

      });
    }
    case ASSIGN_HOMEWORK: {
      return Object.assign({}, state, {
        assignHomeworkList: state.assignHomeworkList.concat(action.payload)
      });
    }
    case GET_LABELS_FOR_HOMRWORK: {
      return {
        ...state,
        currentTodo: null,
        labels: action.payload
      }
    }
    case ADD_TODO_CONVERSATION: {
      return Object.assign({}, state, {
        todoConversation: state.todoConversation.concat(action.payload)
      });
    }
    case 'CLEAN_TODO_STATE': {
      return Object.assign({}, state, {
        allToDos: action.payload,
        toDos: action.payload,
      });
    }
    case FETCH_SUBJECTS_PROFESSORS: {
      return Object.assign({}, state, {
        subjectsProfessors: action.payload,
        
      });
    }


    default:
      return state;
  }
}