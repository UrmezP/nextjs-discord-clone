"use client";

import { io } from "socket.io-client";
import {
  ChangeEvent,
  FormEvent,
  MutableRefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Globalchatmessage from "./globalchatmessage";

export default function Globalchatwindow() {
  const [allMessages, setAllMessages] = useState(Array<UserChatMessage>);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");

  const messagesEndRef = useRef(null) as any as MutableRefObject<HTMLElement>;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  function getPreviousMessageUser(index: number): UserChatMessage | undefined {
    return allMessages[index];
  }

  const socket = useMemo(() => {
    return io("http://localhost:3001/");
  }, []);

  useEffect(() => {
    socket.on("globalchatappend", (obj: UserChatMessage) => {
      setAllMessages((prev) => [...prev, obj]);
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [allMessages]);

  function handleMessageInput(e: ChangeEvent<HTMLInputElement>) {
    setMessage(e.target.value);
  }
  function handleUsernameInput(e: ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value);
  }
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (socket) {
      var globalchatmessage: ChatMessage = {
        text: message,
        socketId: socket.id,
      };
    } else {
      throw new Error("socket is not connected");
    }
    var userMessage: UserChatMessage = {
      userId: username,
      message: globalchatmessage,
    };
    // clear text field
    setMessage("");
    // handle global chat submit, send the message along
    socket.emit("globalchatsubmithandler", userMessage);
  }

  const content = (
    <section className="m-auto sm:max-w-md md:max-w-2xl max-w-4xl pb-4 min-h-52 flex flex-col justify-center items-center bg-slate-200 gap-4">
      <div className="grow py-4 flex flex-col justify-start text-slate-500 border-b border-black w-full text-center">
        <span>GlobalChat</span>
        <div
          id="globalChatWindow"
          className="max-h-48 md:max-h-72 overflow-auto overflow-x-hidden"
        >
          {allMessages.map((userMessage, index) => {
            return userMessage.userId ==
              getPreviousMessageUser(index - 1)?.userId ? (
              <Globalchatmessage
                key={`message${index}`}
                userMessage={userMessage}
                continueUser={true}
              />
            ) : (
              <Globalchatmessage
                key={`message${index}`}
                userMessage={userMessage}
                continueUser={false}
              />
            );
          })}
          <span ref={messagesEndRef}></span>
        </div>
      </div>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col justify-center items-stretch w-full px-4 gap-2"
      >
        <div className="grow flex">
          <span className="inline-block w-32">Username :</span>{" "}
          <input
            type="text"
            className="grow px-4"
            onChange={(e) => {
              handleUsernameInput(e);
            }}
            value={username}
          />
        </div>
        <div className="grow flex">
          <span className="inline-block w-32">Message :</span>
          <input
            type="text"
            className="grow px-4"
            onChange={(e) => {
              handleMessageInput(e);
            }}
            value={message}
          />
        </div>
        <input
          type="submit"
          value="Submit"
          className="py-2 px-4 bg-slate-800 text-white"
        />
      </form>
    </section>
  );

  return content;
}
