export const SET_MESSAGES = "messages/setMessages";
export const SEND_MESSAGE = "messages/send";
export const UPDATE_MESSAGE = "messages/update";
export const DELETE_MESSAGE = "messages/delete";

export const setMessages = (messages) => {
    return {
        type: SEND_MESSAGE,
        messages
    }
}

// const ADD_CHANNEL_MESSAGE = "current/AddMessage";
// export const addChannelMessage = (message) => {
//   return { type: ADD_CHANNEL_MESSAGE, message };
// };

// export const postMessage = (channelId, formData) => async (dispatch) => {
//     const res = await fetch(`/api/channels/${channelId}/messages`, {
//       method: "POST",
//       body: formData,
//     });

//     const newMessage = await res.json();

//     dispatch(addChannelMessage(newMessage));
//     return newMessage;
//   };

export const sendMessage = (message) => {
    return {
        type: SEND_MESSAGE,
        message
    }
}

// export const updateMessage = (message) => {
//     return {
//         type: UPDATE_MESSAGE,
//         message
//     }
// }

export const deleteMessage = (messageId) => {
    return {
        type: DELETE_MESSAGE,
        messageId
    }
}

const initialState = {}

const messageReducer = (state = initialState, action) => {
    let newState = {...state}
    switch(action.type){
        case SET_MESSAGES: {
            newState = action.messages
            return newState
        }
        // case ADD_CHANNEL_MESSAGE: {
        //     newState[action.message.id] = action.message
        //     return newState
        // }
        // case UPDATE_MESSAGE: {
        //     newState[action.message.id].content = action.message.content
        //     newState[action.message.id].content = action.message.updateAt
        //     return newState
        // }
        case DELETE_MESSAGE: {
            delete newState[action.messageId]
            return newState
        }
        default:
            return state
    }
}

export default messageReducer
