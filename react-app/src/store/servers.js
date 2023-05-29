const SET_SERVERS = 'servers/SetServers'
const REMOVE_ALL_SERVERS = 'logout/RemoveServers'
const USER_SERVERS = 'server/UserServers'
const ADD_USER_SERVERS = 'servers/AddServers'
const EDIT_USER_SERVERS = 'servers/EditServers'
const REMOVE_USER_SERVERS = 'servers/RemoveServer'

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
