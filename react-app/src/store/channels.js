import { setMessages } from "./messages";
import { getAServer, updateCurrentServer } from "./servers";
const CLEAR_CHANNELS_STORE = "logout/CLEAR CHANNELS";
const SET_USER_DM_CHANNELS = "dms/setsUserDmChannels";
const SET_SERVER_CHANNELS = "channels/setChannels";
const ADD_CHANNEL_TO_SERVER = "channels/AddChannel";
const UPDATE_CHANNEL_ON_SERVER = "channels/UpdateChannel";
const REMOVE_CHANNEL_FROM_SERVER = "channels/RemoveChannel";
const SET_CURRENT_CHANNEL = "currentChannel/SetCurrentChannel";
const CLEAR_CURRENT_CHANNEL = "currentChannel/Clear";
const CONFIRM_CHANNEL_MESSAGE_DELETION = "currentChannel/ConfirmMessageDeletion";



export const setChannels = (channels) => {
    return {
        type: SET_SERVER_CHANNELS,
        channels
    };
};

export const setUserDms = (dmRooms) => {
    return {
        type: SET_USER_DM_CHANNELS,
        dmRooms
    };
};

export const addChannel = (serverId, channel) => {
  return {
    type: ADD_CHANNEL_TO_SERVER, serverId,
    channel
 };
};

export const logoutChannels = () => {
  return {
    type: CLEAR_CHANNELS_STORE
 };
};


export const postChannel = (channel) => async (dispatch) => {
  const res = await fetch(`/api/servers/${channel.serverId}/channels`, {
    method: "POST",
    headers: {"Content-Type" : "application/json"},
    body: JSON.stringify(channel),
  });

  const newChannel = await res.json();

  dispatch(addChannel(newChannel.serverId, newChannel));
  dispatch(getAServer(newChannel.serverId, newChannel))
  dispatch(setCurrentChannel(newChannel));
  return newChannel;
};


export const updateChannel = (serverId, channel) => {
  return {
    type: UPDATE_CHANNEL_ON_SERVER,
    serverId,
    channel
 };
};

export const putChannel = (channel) => async (dispatch) => {
  const res = await fetch(`/api/channels/${channel.id}`,
    {
      method: "PUT",
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify(channel),
    }
  );

  const updatedChannel = await res.json();
  dispatch(updateChannel(updatedChannel.serverId, updatedChannel));
};


export const removeChanel = (serverId, channelId) => {
  return {
    type: REMOVE_CHANNEL_FROM_SERVER,
    serverId,
    channelId
 };
};

export const deleteChannel = (serverId, channelId) => async (dispatch) => {
  const res = await fetch(`/api/channels/${channelId}`,
    {
      method: "DELETE",
    }
  );
  const deletedChannel = await res.json();
  dispatch(removeChanel(serverId, deletedChannel.channelId));
};


export const setCurrentChannel = (channel) => {
  return {
    type: SET_CURRENT_CHANNEL,
    channel
 };
};

export const getOneChannel = (channelId) => async (dispatch) => {
  const result = await fetch(`/api/channels/${channelId}`);

  const channel = await result.json();
  dispatch(setCurrentChannel(channel));
  return channel;
};

export const clearCurrentChannel = () => {
  return {
    type: CLEAR_CURRENT_CHANNEL
 };
};

export const ADD_CHANNEL_MESSAGE = "currentChannel/AddMessage";
export const addChannelMessage = (messages) => {
  return { type: ADD_CHANNEL_MESSAGE, messages };
};

export const postMessage = (channelId, formData) => async (dispatch) => {
    const res = await fetch(`/api/channels/${channelId}/messages`, {
      method: "POST",
      body: formData,
    });

    const newMessage = await res.json();

    dispatch(addChannelMessage(newMessage));
    return newMessage;
  };


//update message
const UPDATE_CHANNEL_MESSAGE = "currentChannel/UpdateMessage";
export const updateChannelMessage = (message) => {
  return { type: UPDATE_CHANNEL_MESSAGE, message };
};

export const updateMessage =
  (channelId, messageId, formData) => async (dispatch) => {
    const res = await fetch(`/api/channels/${channelId}/messages/${messageId}`,{
        method: "PUT",
        body: formData,
      }
    );
    const updatedMessage = await res.json();
    dispatch(updateChannelMessage(updatedMessage));
    return updatedMessage;
  };


  //delete Message
  const DELETE_CHANNEL_MESSAGE = 'currentChannel/DeleteMessage'
  export const removeChannelMessage = (messageId, channelId) => {
    return { type: DELETE_CHANNEL_MESSAGE, messageId, channelId}
  }

  export const deleteChannelMessage = (channelId, messageId) => async (dispatch) => {
    const res = await fetch(
      `/api/channels/${channelId}/messages/${messageId}`,
      {
        method: "DELETE"
      }
    )
    if (res.ok) {
        const deletedMessage = await res.json();
        dispatch(removeChannelMessage(deletedMessage.messageId, channelId));
    } else {
        console.error("Failed to delete message");
    }
}

export const confirmChannelMessageDeletion = (messageId, channelId) => {
  return { type: CONFIRM_CHANNEL_MESSAGE_DELETION, messageId, channelId };
};

const channelsReducer = (
    state = {
      channels: [],
      // currentChannel: { members: [] },
      currentChannel: null,
      userDmChannels: [],
      dmCurrentChannel: [],
    },
    action
  ) => {

    switch (action.type) {
      case SET_USER_DM_CHANNELS: {
        const newState = {...state}
        newState.userDmChannels = action.dmRooms;
        return newState;
      }

      case ADD_CHANNEL_TO_SERVER: {
        const newState = {...state}
        newState.channels[action.channel.id] = action.channel;
        return newState;
      }

      case UPDATE_CHANNEL_ON_SERVER: {
        const newState = {...state}
        newState.channels[action.channel.id] = action.channel;
        newState.currentChannel = action.channel;
        return newState;
      }

      case REMOVE_CHANNEL_FROM_SERVER: {
        const newState = {...state}
        delete newState.channels[action.channelId];
        return newState;
      }

      case SET_SERVER_CHANNELS: {
        const newState = {...state}
        newState.channels = action.channels;
        return newState;
      }

      case SET_CURRENT_CHANNEL: {
        const newState = {...state}
        newState.currentChannel = action.channel;
        return newState;
      }

      case CLEAR_CURRENT_CHANNEL: {
        const newState = {...state}
        newState.currentChannel = null;
        return newState;
      }

      case ADD_CHANNEL_MESSAGE: {
        let newState = {...state}
        newState = global.structuredClone(newState) // using gloabl.structuredClone due to nested state causing mutation of state instead we created a deep copy to reassign it.
        newState.currentChannel.messages[action.messages.id] = action.messages;
        return newState;
      }
      case UPDATE_CHANNEL_MESSAGE: {
        let newState = {...state}
        newState = global.structuredClone(newState)
        newState.currentChannel.messages[action.message.id] = action.message;
        return newState
      }

      case DELETE_CHANNEL_MESSAGE: {
        let newState = {...state}
        newState = global.structuredClone(newState)
        delete newState.currentChannel.messages[action.messageId]
        return newState
      }
      case CONFIRM_CHANNEL_MESSAGE_DELETION: {
        const liveChatState = global.structuredClone(state);
        delete liveChatState.currentChannel.messages[action.messageId];
        return liveChatState;
    }
      default:
        return state;
    }
  };

  export default channelsReducer;
