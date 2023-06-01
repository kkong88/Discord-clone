import { setMessages } from "./messages";
const CLEAR_CHANNELS_STORE = "logout/CLEAR CHANNELS";
const SET_USER_DM_CHANNELS = "dms/setsUserDmChannels";
const SET_SERVER_CHANNELS = "channels/setChannels";
const ADD_CHANNEL_TO_SERVER = "channels/AddChannel";
const UPDATE_CHANNEL_ON_SERVER = "channels/UpdateChannel";
const REMOVE_CHANNEL_FROM_SERVER = "channels/RemoveChannel";
const SET_CURRENT_CHANNEL = "currentChannel/SetCurrentChannel";
const CLEAR_CURRENT_CHANNEL = "currentChannel/Clear";


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
  const res = await fetch(`/api/servers/${channel.serverId}/channels/${channel.id}`,
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
  const res = await fetch(`/api/servers/${serverId}/channels/${channelId}`,
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
  dispatch(setMessages(channel.messages));
  return channel;
};

export const clearCurrentChannel = () => {
  return {
    type: CLEAR_CURRENT_CHANNEL
 };
};

const channelsReducer = (
    state = {
      channels: [],
      currentChannel: { members: [] },
      userDmChannels: [],
      dmCurrentChannel: [],
    },
    action
  ) => {
    let newState = { ...state };
    switch (action.type) {
      case CLEAR_CHANNELS_STORE: {
        newState = {
          channels: {},
          currentChannel: { channel: null },
          userDmChannels: {},
          dmCurrentChannel: {},
        };
        return newState;
      }

      case SET_USER_DM_CHANNELS: {
        newState.userDmChannels = action.dmRooms;
        return newState;
      }

      case ADD_CHANNEL_TO_SERVER: {
        newState.channels[action.channel.id] = action.channel;
        return newState;
      }

      case UPDATE_CHANNEL_ON_SERVER: {
        newState.channels[action.channel.id] = action.channel;
        newState.currentChannel = action.channel;
        return newState;
      }

      case REMOVE_CHANNEL_FROM_SERVER: {
        delete newState.channels[action.channelId];
        return newState;
      }

      case SET_SERVER_CHANNELS: {
        newState.channels = action.channels;
        return newState;
      }

      case SET_CURRENT_CHANNEL: {
        newState.currentChannel = action.channel;
        return newState;
      }

      case CLEAR_CURRENT_CHANNEL: {
        newState.currentChannel = null;
        return newState;
      }

      default:
        return state;
    }
  };

  export default channelsReducer;