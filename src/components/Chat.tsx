import { useEffect, useRef, useState } from 'react';
import Title from '../components/Title';
import { IoCaretForward } from "react-icons/io5";
import { IoCaretBack } from "react-icons/io5";
import Peer from 'skyway-js'
import { useChannel } from '../hooks/AblyReactEffect';
import { IoIosSend } from "react-icons/io";
import ScrollToBottom from 'react-scroll-to-bottom';

const maxPage = 5;

const Chat = () => {
  const [messageText, setMessageText] = useState("");
  const [receivedMessages, setReceivedMessages] = useState([]);

  const [channel, ably] = useChannel("chat-demo", (message) => {
    const history = receivedMessages.slice(-199);
    setReceivedMessages([...history, message]);
  });

  const sendChatMessage = () => {
    channel.publish({ name: "chat-message", data: messageText });
    setMessageText("");
  }

  return (
    <>
      <div className="w-full h-full flex flex-col">
        <div className="h-2 flex-auto w-full p-2">
          <ul className="w-full h-full p-2 flex flex-col overflow-y-auto">
            {receivedMessages.map((v, i) => {
              return (
                <li key={i} className="w-full chat chat-end">
                  <p className="break-words chat-bubble bg-theme text-white font-bold">{v.data}</p>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="h-28 w-full flex flex-row space-x-2 p-2 items-end">
          <textarea
            value={messageText}
            placeholder="質問！"
            onChange={e => setMessageText(e.target.value)}
            className="flex-auto border rounded-lg p-2 h-24"
          ></textarea>
          <IoIosSend type="submit" onClick={sendChatMessage} className="h-8 w-8 text-theme mb-0" />
        </div>

      </div>
    </>

  );
};

export default Chat;