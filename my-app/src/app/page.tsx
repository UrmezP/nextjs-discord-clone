"use client";
import { useRouter } from "next/navigation";
import Globalchatusernamechecker from "./chatComponents/globalchatusernamechecker";
import { useEffect } from "react";

export default function Landing() {
  const { push } = useRouter();
  function checkIfLoggedIn() {
    const user: ChatUser = JSON.parse(
      sessionStorage.getItem("discord-chat-user") as string
    );
    if (user) return true;
    return false;
  }

  useEffect(() => {
    if (checkIfLoggedIn()) {
      push("/globalChat");
    }
  }, []);
  return (
    <>
      <section className="flex min-h-[8rem] bg-slate-200 flex-col p-4 justify-between items-center">
        <h2>Please enter a unique username to begin</h2>
        <Globalchatusernamechecker />
      </section>
    </>
  );
}
