// import { setChannels } from "./channels";
// const SET_SERVERS = 'servers/SetServers'
// const REMOVE_ALL_SERVERS = 'logout/RemoveServers'
// const USER_SERVERS = 'server/UserServers'
// const ADD_USER_SERVERS = 'servers/AddServers'
// const EDIT_USER_SERVERS = 'servers/EditServers'
// const REMOVE_USER_SERVERS = 'servers/RemoveServer'
// const CURRENT_SERVER = 'servers/CurrentServer'
// const CLEAR_SERVER = 'servers/ClearServer'
// const EDIT_CURRENT_SERVER = 'servers/EditCurrentServer'
// const ADD_MEMBER_TO_SERVER = "server/AddMember"
// const REMOVE_MEMBER_FROM_SERVER = "server/RemoveMember"


// // All Server
// export const setServers = (servers) => {
//     return {
//         type: SET_SERVERS,
//         servers
//     }
// }

// export const allServers = () => async (dispatch) => {
//     const result = await fetch('/api/servers')
//     const all_servers = await result.json()

//     dispatch(allServers(all_servers.servers))
//     return all_servers.servers
// }

// export const leftServers = () => {
//     return {
//         type: REMOVE_ALL_SERVERS,
//     }
// }

// export const user_server = (server) => {
//     return {
//         type: USER_SERVERS,
//         server
//     }
// }

// export const addUserServer = (server) => async (dispatch) => {
//     return {
//         type: ADD_USER_SERVERS,
//         server
//     }
// }

// export const joinServer = (serverId, userId) => async (dispatch) => {
//     const result = await fetch(`/api/servers/${serverId}/members/`,{
//         method: 'POST',
//         body: JSON.stringify({serverId, userId})
//     })

//     const data = await result.json()
//     dispatch(joinServer(data.server))
//     return data.server
// }

// export const leaveServer =  (serverId,memberId) => async (dispatch) => {
//     const result = await fetch(`/api/servers/${serverId}/members/${memberId}`,{
//         method: 'DELETE'
//     })

//     const data = await result.json()
//     dispatch(leaveServer(data.serverId))
// }

// export const UserCreatedServer = (formData) => async (dispatch) => {
//     const res = await fetch("/api/servers/", {
//       method: "POST",
//       body: formData,
//     });

//     const newServer = await res.json();
//     dispatch(addUserServer(newServer));
//     return newServer;
//   };

//   export const editUserServer = (server) => {
//       return {
//           type: EDIT_USER_SERVERS,
//           server
//         }
//     }

//     export const removeUserServer = (serverId) => {
//         return {
//             type: REMOVE_USER_SERVERS,
//             serverId
//         }
//     }

//     export const deleteServer = (serverId) => async (dispatch) => {
//         await fetch(`/api/servers/${serverId}`, {
//             method: "DELETE"
//         })
//         dispatch(removeUserServer(serverId))
//     }

// //Single Server
// export const currentServer = (server) => {
//     return {
//         type: CURRENT_SERVER,
//         server
//     }
// }

// export const clearServer = () => {
//     return {
//         type: CLEAR_SERVER
//     }
// }

// export const serverDetail = (serverId) => async (dispatch) => {
//     const result = await fetch(`/api/servers/${serverId}`)
//     const singleServer = await result.json()
//     dispatch(currentServer(singleServer))
//     dispatch(setChannels(singleServer.channels))
//     return singleServer
// }

// export const updateServer = (server) => {
//     return {
//         type: EDIT_CURRENT_SERVER,
//         server
//     }
// }

// export const updateCurrentServer = (serverId, formData) => async (dispatch) => {
//     const result = await fetch(`/api/servers/${serverId}`, {
//         method: 'PUT',
//         body: formData
//     })
//     const update = await result.json()
//     dispatch(updateCurrentServer(update))
//     dispatch(editUserServer(update))
//     dispatch(setChannels(update))

//     return update.picture
// }

// export const addMember = (serverId, member) => {
//   return { type: ADD_MEMBER_TO_SERVER, serverId, member };
// };

// export const removeMember = (serverId, memberId) => {
//   return { type: REMOVE_MEMBER_FROM_SERVER, serverId, memberId };
// };

// const initialState = {
//     userServers: { server: null },
//     allServers: { server: null },
//     currentServer: {
//       channels: { 0: 0 },
//       members: { 0: 0 },
//     },
//   };

//   const serversReducer = (state = initialState, action) => {
//     let newState = { ...state };
//     switch (action.type) {
//       case REMOVE_ALL_SERVERS: {
//         return initialState;
//       }

//       case CURRENT_SERVER: {
//         newState.currentServer = initialState.currentServer;
//         return newState;
//       }
//       case SET_SERVERS: {
//         newState.allServers = action.servers;
//         return newState;
//       }
//       case USER_SERVERS: {
//         newState.userServers = action.servers;
//         return newState;
//       }

//       case EDIT_USER_SERVERS: {
//         newState.userServers[action.server.id] = action.server;
//         return newState;
//       }

//       case ADD_USER_SERVERS: {
//         newState.userServers[action.server.id] = action.server;
//         return newState;
//       }

//       case REMOVE_USER_SERVERS: {
//         delete newState.userServers[action.serverId];
//         return newState;
//       }

//       case CURRENT_SERVER: {
//         newState.currentServer = action.server;
//         return newState;
//       }

//       case EDIT_CURRENT_SERVER: {
//         newState.currentServer = action.server;
//         return newState;
//       }

//       case ADD_MEMBER_TO_SERVER: {
//         newState.currentServer.members[action.member.id] = action.member;
//         return newState;
//       }

//       case REMOVE_MEMBER_FROM_SERVER: {
//         delete newState.currentServer.members[action.memberId];
//         return newState;
//       }

//       default:
//         return state;
//     }
//   };

//   export default serversReducer;


const SET_ALL_SERVERS = "servers/SetAllServers";
const SET_USER_SERVERS = "servers/SetUserServers";
const ADD_USER_SERVER = "servers/AddUserServer";
const REMOVE_USER_SERVER = "servers/RemoveUserServer";
const UPDATE_USER_SERVERS = "servers/UpdateOwnedServers";
const SET_SELECTED_SERVER = "currentServer/SetSelectedServer";
const CLEAR_SELECTED_SERVER = "currentServer/ClearSelectedServer";
const UPDATE_CURRENT_SERVER = "currentServer/UpdateSelectedServer";
const ADD_MEMBER_TO_SERVER = "currentServer/AddMember";
const REMOVE_MEMBER_FROM_SERVER = "currentServer/RemoveMember";

// adds servers to the store
export const setAllServers = (servers) => {
  return { type: SET_ALL_SERVERS, servers };
};

// gets all the servers in the back end to pass off to setAllServers
export const getAllServers = () => async (dispatch) => {
    const res = await fetch("/api/servers");
    const servers = await res.json();

    dispatch(setAllServers(servers.servers));
    return servers.servers;
  };


// sets servers the user belongs in the store
export const setUserServers = (servers) => {
    return {
      type: SET_USER_SERVERS,
      servers
    };
  };


// adds a server the user joined in the store
export const addUserServer = (server) => {
    return {
      type: ADD_USER_SERVER,
      server
    };
  };
// adds user to an existing server they just joined
export const joinUserServer = (serverId, userId) => async (dispatch) => {

  const res = await fetch(`/api/servers/${serverId}/members`, {
    method: "POST",
    headers: {"Content-Type" : "application/json"},
    body: JSON.stringify({ serverId, userId }),
  });
    const data = await res.json();
    console.log(data)
    dispatch(addUserServer(data.server));
    return data.server;
  };

  // adds new server the user has created to the store
  export const postUserServer = (formData) => async (dispatch) => {
      const res = await fetch("/api/servers", {
        method: "POST",
        body: formData,
      });
      const newServer = await res.json();

      dispatch(addUserServer(newServer));
      return newServer;
    };
  // export const postUserServer = (formData) => async (dispatch) => {
  //   const res = await fetch("/api/servers/", {
  //     method: "POST",
  //     body: formData,
  //   });
  //   const newServer = await res.json();

  //   dispatch(addUserServer(newServer));
  //   return newServer;
  // };

// remove a server the user joined in the store
export const removeUserServer = (serverId) => {
      return { type: REMOVE_USER_SERVER, serverId };
    };

// deletes the user from a server they joined
export const leaveUserServer = (serverId, membershipId) => async (dispatch) => {
    const res = await fetch(
      `/api/servers/${serverId}/members/${membershipId}`,
      {
        method: "DELETE",
      }
    );
    const data = await res.json();
    dispatch(removeUserServer(data.serverId));
  };
// deletes server entitely, user must own the server
export const deleteServer = (serverId) => async (dispatch) => {
    await fetch(`/api/servers/${serverId}`, {
      method: "DELETE",
    });
    dispatch(removeUserServer(serverId));
  };


// setting the selected server to the store and removing it when no longer selected
  export const setCurrentServer = (server) => {
    return { type: SET_SELECTED_SERVER, server };
  };
  export const clearCurrentServer = () => {
    return { type: CLEAR_SELECTED_SERVER };
  };

export const getAServer = (serverId) => async (dispatch) => {
    const res = await fetch(`/api/servers/${serverId}`);

    const server = await res.json();

    dispatch(setCurrentServer(server));
    //dispatch(setChannels(server.channels));
  };


// updating the selected server in store for both "current" and servers you are a member of
  export const updateCurrentServer = (server) => {
    return { type: UPDATE_CURRENT_SERVER, server };
  };

  export const updateUserServers = (server) => {
    return { type: UPDATE_USER_SERVERS, server };
  };

  export const putCurrentServer = (serverId, formData) => async (dispatch) => {
    const res = await fetch(`/api/servers/${serverId}`, {
      method: "PUT",
      body: formData,
    });
    const updatedServer = await res.json();

    dispatch(updateCurrentServer(updatedServer));
    dispatch(updateUserServers(updatedServer));
    // dispatch(setChannels(updatedServer.channels));

    // return updatedServer.picture;
  };

//adding or deleting users from the members
export const addMember = (serverId, member) => {
    return { type: ADD_MEMBER_TO_SERVER, serverId, member };
  };

export const removeMember = (serverId, memberId) => {
    return { type: REMOVE_MEMBER_FROM_SERVER, serverId, memberId };
  };

  const serversReducer = (
    state = {
      userServers: { server: null },
      allServers: { server: null },
      currentServer: {
        server: null,
      },
    },
    action
  ) => {
    let newState = { ...state };
    switch (action.type) {
    //   case CLEAR_ALL_SERVERS: {
    //     newState = {
    //       userServers: { server: null },
    //       allServers: { server: null },
    //       currentServer: {
    //         server: null,
    //       },
    //     };
    //     return newState;
    //   }

      case CLEAR_SELECTED_SERVER: {
        newState.currentServer = null;
        return newState;
      }
      case SET_ALL_SERVERS: {
        newState.allServers = action.servers;
        return newState;
      }
      case SET_USER_SERVERS: {
        newState.userServers = action.servers;
        return newState;
      }

      case UPDATE_USER_SERVERS: {
        newState.userServers[action.server.id] = action.server;
        return newState;
      }

      case ADD_USER_SERVER: {
        newState.userServers[action.server.id] = action.server;
        return newState;
      }

      case REMOVE_USER_SERVER: {
        delete newState.userServers[action.serverId];
        return newState;
      }

      case SET_SELECTED_SERVER: {
        newState.currentServer = action.server;
        return newState;
      }

      case UPDATE_CURRENT_SERVER: {
        newState.currentServer = action.server;
        return newState;
      }

      case ADD_MEMBER_TO_SERVER: {
        newState.currentServer.members[action.member.id] = action.member;
        return newState;
      }

      case REMOVE_MEMBER_FROM_SERVER: {
        delete newState.currentServer.members[action.memberId];
        return newState;
      }

      default:
        return state;
    }
  };

  export default serversReducer;
