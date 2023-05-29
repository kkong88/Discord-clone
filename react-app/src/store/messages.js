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

export const sendMessage = (message) => {
    return {
        type: SEND_MESSAGE,
        message
    }
}

export const updateMessage = (message) => {
    return {
        type: UPDATE_MESSAGE,
        message
    }
}

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
        case SEND_MESSAGE: {
            newState[action.message.id] = action.message
        }
        
    }
}
