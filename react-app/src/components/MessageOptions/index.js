import { useState, useEffect } from "react";
import './MessageOptions.css'

const MessageOptions = ({
  message,
  user,
  server,
  handleDeleteMessage,
  setShowEditMessage,
}) => {
  const [loaded, setLoaded] = useState(false);
  const messageId = message.id
  const channelId = message.channelId

  useEffect(() => {
    setLoaded(true);
  }, []);

  const isServerOwner = user?.id === server?.owner?.id;
  const isMessageSender = user?.id === message?.senderId;

  return (
    loaded && (
      <div>
        {/* user for these options must be server owner or message sender */}
        {(isMessageSender || isServerOwner) && (
          <>
            {/* <button onClick={() => setShowEditMessage(message.id)}>
                <img src="https://res.cloudinary.com/dip4w3xmy/image/upload/v1688601613/1024px-OOjs_UI_icon_edit-ltr-progressive.svg_cs3wbv.png" alt="edit" className="message_option_img" />
            </button> */}

            <button
              onClick={() => {
                handleDeleteMessage(channelId, messageId)
              }}
            >
              <img src="https://res.cloudinary.com/dip4w3xmy/image/upload/v1690844054/104-1047033_trash-bin-remove-recycle-delete-trashcan-can-comments-mobile-drawing-png_dhxffk.jpg" alt="delete" className="message_option_img" />
            </button>
          </>
        )}
      </div>
    )
  );
};

export default MessageOptions;
