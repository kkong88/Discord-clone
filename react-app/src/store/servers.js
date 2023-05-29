import { setChannels } from "./channels";
const SET_SERVERS = 'servers/SetServers'
const REMOVE_ALL_SERVERS = 'logout/RemoveServers'
const USER_SERVERS = 'server/UserServers'
const ADD_USER_SERVERS = 'servers/AddServers'
const EDIT_USER_SERVERS = 'servers/EditServers'
const REMOVE_USER_SERVERS = 'servers/RemoveServer'
const CURRENT_SERVER = 'servers/CurrentServer'
const CLEAR_SERVER = 'servers/ClearServer'
const EDIT_CURRENT_SERVER = 'servers/EditCurrentServer'
const ADD_MEMBER_TO_SERVER = "server/AddMember"
const REMOVE_MEMBER_FROM_SERVER = "server/RemoveMember"


// All Server
export const setServers = (servers) => {
    return {
        type: SET_SERVERS,
        servers
    }
}

export const allSevers = () => async (dispatch) => {
    const result = await fetch('/api/servers')
    const all_servers = await result.json()

    dispatch(allSevers(all_servers.servers))
    return all_servers.servers
}

export const leftServers = () => {
    return {
        type: REMOVE_ALL_SERVERS,
    }
}

export const user_server = (server) => {
    return {
        type: USER_SERVERS,
        server
    }
}

export const addUserServer = (server) => async (dispatch) => {
    return {
        type: ADD_USER_SERVERS,
        server
    }
}

export const joinServer = (serverId, userId) => async (dispatch) => {
    const result = await fetch(`/api/servers/${serverId}/members/`,{
        method: 'POST',
        body: JSON.stringify({serverId, userId})
    })

    const data = await result.json()
    dispatch(joinServer(data.server))
    return data.server
}

export const leaveServer =  (serverId,memberId) => async (dispatch) => {
    const result = await fetch(`/api/servers/${serverId}/members/${memberId}`,{
        method: 'DELETE'
    })

    const data = await result.json()
    dispatch(leaveServer(data.serverId))
}

export const UserCreatedServer = (formData) => async (dispatch) => {
    const res = await fetch("/api/servers/", {
      method: "POST",
      body: formData,
    });

    const newServer = await res.json();
    dispatch(addUserServer(newServer));
    return newServer;
  };

  export const editUserServer = (server) => {
      return {
          type: EDIT_USER_SERVERS,
          server
        }
    }

    export const removeUserServer = (serverId) => {
        return {
            type: REMOVE_USER_SERVERS,
            serverId
        }
    }

    export const deleteServer = (serverId) => async (dispatch) => {
        await fetch(`/api/servers/${serverId}`, {
            method: "DELETE"
        })
        dispatch(removeUserServer(serverId))
    }

//Single Server
export const currentServer = (server) => {
    return {
        type: CURRENT_SERVER,
        server
    }
}

export const clearServer = () => {
    return {
        type: CLEAR_SERVER
    }
}

export const serverDetail = (serverId) => async (dispatch) => {
    const result = await fetch(`/api/servers/${serverId}`)
    const singleServer = await result.json()
    dispatch(currentServer(singleServer))
    dispatch(setChannels(singleServer.channels))
    return singleServer
}

export const updateServer = (server) => {
    return {
        type: EDIT_CURRENT_SERVER,
        server
    }
}

export const updateCurrentServer = (serverId, formData) => async (dispatch) => {
    const result = await fetch(`/api/servers/${serverId}`, {
        method: 'PUT',
        body: formData
    })
    const update = await result.json()
    dispatch(updateCurrentServer(update))
    dispatch(editUserServer(update))
    dispatch(setChannels(update))

    return update.picture
}

export const addMember = (serverId, member) => {
  return { type: ADD_MEMBER_TO_SERVER, serverId, member };
};

export const removeMember = (serverId, memberId) => {
  return { type: REMOVE_MEMBER_FROM_SERVER, serverId, memberId };
};

const initialState = {
    userServers: { server: null },
    allServers: { server: null },
    currentServer: {
      channels: { 0: 0 },
      members: { 0: 0 },
    },
  };

  const serversReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
      case REMOVE_ALL_SERVERS: {
        return initialState;
      }

      case CURRENT_SERVER: {
        newState.currentServer = initialState.currentServer;
        return newState;
      }
      case SET_SERVERS: {
        newState.allServers = action.servers;
        return newState;
      }
      case USER_SERVERS: {
        newState.userServers = action.servers;
        return newState;
      }

      case EDIT_USER_SERVERS: {
        newState.userServers[action.server.id] = action.server;
        return newState;
      }

      case ADD_USER_SERVERS: {
        newState.userServers[action.server.id] = action.server;
        return newState;
      }

      case REMOVE_USER_SERVERS: {
        delete newState.userServers[action.serverId];
        return newState;
      }

      case CURRENT_SERVER: {
        newState.currentServer = action.server;
        return newState;
      }

      case EDIT_CURRENT_SERVER: {
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
