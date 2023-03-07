import { useEffect, useState } from 'react';
import Title from '../components/Title';
import { IoCaretForward } from "react-icons/io5";
import { IoCaretBack } from "react-icons/io5";
import Peer from 'skyway-js'
import { useChannel } from '../hooks/AblyReactEffect';
import Chat from '../components/Chat';
import { IoIosSend } from 'react-icons/io';

const maxPage = 55

const PdfPage = () => {
  const [messageText, setMessageText] = useState("");
  const [receivedMessages, setReceivedMessages] = useState([]);
  
  const [channel, ably] = useChannel("chat-demo", (message) => {
    const history = receivedMessages.slice(-199);
    setReceivedMessages([...history, message]);
    console.log(message);
  });

  const sendChatMessage = () => {
    channel.publish({ name: "chat-message", data: messageText });
    setMessageText("");
  }

  const send = (msg) => {
    channel.publish({ name: "chat-message", data: msg });
  }

  return (
    <>
      <div className="w-screen h-screen flex flex-col items-center justify-center">
        <div className="w-96 h-96 flex flex-col">
          <div className="h-80 flex-auto w-full flex flex-row">
            <div className="w-1/2 flex flex-col items-center h-full justify-evenly">
              <button className="w-16 h-16 rounded-xl bg-white text-2xl border-2" onClick={() => send("👏")}>👏</button>
              <button className="w-16 h-16 rounded-xl bg-white text-2xl border-2" onClick={() => send("😄")}>😄</button>
            </div>
            <div className="w-1/2 flex flex-col items-center h-full justify-evenly">
              <button className="w-16 h-16 rounded-xl bg-white text-2xl border-2" onClick={() => send("👍")}>👍</button>
              <button className="w-16 h-16 rounded-xl bg-white text-2xl border-2" onClick={() => send("✋")}>✋</button>
            </div>
          </div>
          <div className="w-full h-16 flex flex-row items-center space-x-2">
            <textarea
              value={messageText}
              placeholder="チャット"
              onChange={e => setMessageText(e.target.value)}
              className="flex-auto border rounded-lg p-2 h-16 w-full"
            ></textarea>
            <IoIosSend type="submit" onClick={sendChatMessage} className="h-8 w-8 text-theme mb-0" />
          </div>

        </div>
      </div>
    </>
  )
};

export default PdfPage;