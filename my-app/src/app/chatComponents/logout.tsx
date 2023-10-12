"use client";
import { useRouter } from "next/navigation";
export default function LogoutButton() {
  const { push } = useRouter();
  function clickHandler() {
    sessionStorage.setItem("discord-chat-user", JSON.stringify(null));
    push("/");
  }

  return <button onClick={clickHandler}>Logout ❌</button>;
}
