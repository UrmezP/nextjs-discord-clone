"use client";
import socket from "../util/socket";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const { push } = useRouter();

  function clickHandler() {
    socket.emit("logoutuser", sessionStorage.getItem("discord-chat-user"));
    sessionStorage.setItem("discord-chat-user", JSON.stringify(null));
    push("/");
  }

  return <button onClick={clickHandler}>Logout ❌</button>;
}
