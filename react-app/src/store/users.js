export const SET_ACTIVE_USERS = "users/setActiveUsers";
export const ACTIVATE_USER = "users/activateUser";
export const SET_USER_IDLE = "users/setUserIdle";
export const INACTIVATE_USER = "users/inactivate";


export const setActiveUsers = (users) => {
  return {
    type: SET_ACTIVE_USERS,
    users,
  };
};

export const setUserIdle = (user) => {
  return {
    type: SET_USER_IDLE,
    user,
  };
};

export const activateUser = (user) => {
  return {
    type: ACTIVATE_USER,
    user
 };
};


export const inactivateUser = (user) => {
  return { type: INACTIVATE_USER, user };
};

const initialState = {};

const usersReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case SET_ACTIVE_USERS: {
      newState = action.users;
      return newState;
    }
    case ACTIVATE_USER: {
      newState[action.user.id] = action.user;
      return newState;
    }
    case SET_USER_IDLE: {
      newState[action.user.id] = action.user;
      return newState;
    }
    case INACTIVATE_USER: {
      delete newState[action.user.id];
      return newState;
    }

    default:
      return state;
  }
};

export default usersReducer;
