"use client";
import Globalchatwindow from "../chatComponents/globalchatwindow";
import LogoutButton from "../chatComponents/logout";
import GlobalChatSidebar from "../chatComponents/globalchatsidebar";

import socket from "../util/socket";
import { useEffect, useState } from "react";

export default function GlobalChat() {
  const [AllUserList, setAllUserList] = useState([] as ChatUser[]);

  useEffect(() => {
    socket.emit("fireAllUsersUpdated");
    socket.on("allUsersUpdated", (data) => {
      setAllUserList(data);
    });
  }, []);

  return (
    <div className="flex w-full">
      <section className="grow flex justify-center items-stretch ">
        <Globalchatwindow />
        {AllUserList ? (
          <GlobalChatSidebar UserList={AllUserList} />
        ) : (
          <GlobalChatSidebar />
        )}
      </section>
      <div className="absolute top-0 right-0">
        <LogoutButton />
      </div>
    </div>
  );
}
