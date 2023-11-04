"use client";
import { useRouter } from "next/navigation";
import Globalchatusernamechecker from "./chatComponents/globalchatusernamechecker";
import { useEffect } from "react";
import { Ribeye } from "next/font/google";
import Image from "next/image";
import Chat from "../../public/assets/Chat.png";
import LandingLeft from "../../public/assets/landing_left.png";
import LandingRight from "../../public/assets/landing_right.png";

const ribeye = Ribeye({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

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
      <section className="md:grid overflow-hidden relative md:grid-cols-2 flex flex-col-reverse justify-end p-8 h-screen md:pt-32 bg-gradient-to-b from-[#AC8EFF] to-[#B2EDFF]">
        <div></div>
        <div className="flex flex-col justify-start items-start">
          <h1
            className={`text-3xl flex gap-2 pb-4 text-[#1D1D1D] justify-center items-center text-center ${ribeye.className}`}
          >
            GlobalChat
            <Image
              src={Chat}
              alt="LogoChatIcon"
              className="w-[60px] h-[60px]"
            />
          </h1>
          <h2>Enter a unique username to start chatting!</h2>
          <Globalchatusernamechecker />
        </div>
        <Image
          src={LandingLeft}
          alt="Doodle of person chatting on phone"
          className="absolute md:-left-12 xl:left-0 md:-top-60 -left-12 -top-12"
        />
        <Image
          width={220}
          src={LandingRight}
          alt="ChatApp on phone"
          className="absolute md:right-0 md:bottom-0 md:top-auto -right-24 -top-12"
        />
      </section>
    </>
  );
}
