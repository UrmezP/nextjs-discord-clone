"use client";
import Globalchatwindow from "../chatComponents/globalchatwindow";
import LogoutButton from "../chatComponents/logout";
import GlobalChatSidebar from "../chatComponents/globalchatsidebar";

import socket from "../util/socket";
import { useEffect, useState } from "react";

export default function globalChat() {
  const [AllUserList, setAllUserList] = useState([] as ChatUser[]);

  useEffect(() => {
    socket.emit("fireAllUsersUpdated");
    socket.on("allUsersUpdated", (data) => {
      setAllUserList(data);
    });
  }, []);

  return (
    <div className="flex w-full">
      <section className="grow">
        <p className="mb-8">
          Chat with anyone globally! Just enter your message and send!
        </p>
        <Globalchatwindow />
      </section>
      <div className="absolute top-0 right-0">
        <LogoutButton />
      </div>
      {AllUserList ? (
        <GlobalChatSidebar UserList={AllUserList} />
      ) : (
        <GlobalChatSidebar />
      )}
    </div>
  );
}
