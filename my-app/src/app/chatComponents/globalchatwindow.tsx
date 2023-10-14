"use client";

import {
  ChangeEvent,
  FormEvent,
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Globalchatmessage from "./globalchatmessage";
import { useRouter } from "next/navigation";

import socket from "../util/socket";

export default function Globalchatwindow() {
  const [allMessages, setAllMessages] = useState(Array<UserChatMessage>);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");

  const usernameRef = useRef(null as any as HTMLInputElement);

  // use this to push pages onto the router
  const { push } = useRouter();

  // scroll to bottom when new message received
  const messagesEndRef = useRef(null) as any as MutableRefObject<HTMLElement>;
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // get the user who sent message using Index
  const getMessageUser = useCallback(
    (index: number): UserChatMessage | undefined => {
      return allMessages[index];
    },
    []
  );

  // when component loads, get the ChatUser from session.
  // if user exists, load him. Else return back to homepage to signin
  useEffect(() => {
    socket.on("globalchatappend", (obj: UserChatMessage) => {
      setAllMessages((prev) => [...prev, obj]);
    });

    const user: ChatUser = JSON.parse(
      sessionStorage.getItem("discord-chat-user") as string
    );
    if (user) {
      setUsername(user.username);
      if (usernameRef.current) {
        usernameRef.current.disabled = true;
      }
    } else {
      push("/");
    }
  }, []);

  // scroll to bottom whenever allMessages state gets updated
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
    // stop reload
    e.preventDefault();
    // return if username and message doesn't exist
    if (!Boolean(username) || !Boolean(message)) {
      return alert("Please enter message before pressing send");
    }
    // Create a ChatMessage object if socket exists
    if (socket) {
      var globalchatmessage: ChatMessage = {
        text: message,
        socketId: socket.id,
      };
    } else {
      throw new Error("socket is not connected");
    }
    var userMessage: UserChatMessage = {
      username: username,
      message: globalchatmessage,
    };
    // clear text field
    setMessage("");
    // handle global chat submit, send the message along
    socket.emit("globalchatsubmithandler", userMessage);
  }

  const MessagesContent = useMemo(() => {
    return allMessages.map((userMessage, index) => {
      return getMessageUser(index - 1)?.username == userMessage.username ? (
        username == userMessage.username ? (
          <Globalchatmessage
            key={`message${index}`}
            userMessage={userMessage}
            continueUser={true}
            isSender={true}
          />
        ) : (
          <Globalchatmessage
            key={`message${index}`}
            userMessage={userMessage}
            continueUser={true}
            isSender={false}
          />
        )
      ) : username == userMessage.username ? (
        <Globalchatmessage
          key={`message${index}`}
          userMessage={userMessage}
          continueUser={false}
          isSender={true}
        />
      ) : (
        <Globalchatmessage
          key={`message${index}`}
          userMessage={userMessage}
          continueUser={false}
          isSender={false}
        />
      );
    });
  }, [allMessages]);

  const ContentWrapper = useMemo(() => {
    return (
      <section className="m-auto sm:max-w-md md:max-w-2xl max-w-4xl pb-4 min-h-52 flex flex-col justify-center items-center bg-slate-200 gap-4">
        <div className="grow py-4 flex flex-col justify-start text-slate-500 border-b border-black w-full text-center">
          <span>GlobalChat</span>
          <div
            id="globalChatWindow"
            className="max-h-48 md:max-h-72 overflow-auto overflow-x-hidden"
          >
            {MessagesContent}
            <span ref={messagesEndRef}></span>
          </div>
        </div>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col justify-center items-stretch w-full px-4 gap-4"
        >
          <div className="grow flex">
            <span className="inline-block w-32">Username :</span>{" "}
            <input
              ref={usernameRef}
              id="usernameInput"
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
              id="messageInput"
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
            value="Send"
            className="py-2 px-4 bg-slate-800 text-white"
          />
        </form>
      </section>
    );
  }, [username, message, allMessages]);

  return ContentWrapper;
}
