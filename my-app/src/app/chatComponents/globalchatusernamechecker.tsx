"use client";

import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function ButtonReady() {
  return <Button>Check availability</Button>;
}
export function ButtonLoading() {
  return (
    <Button disabled>
      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
      Please wait
    </Button>
  );
}

export default function Globalchatusernamechecker() {
  const [username, setUsername] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { push } = useRouter();

  const uniqueUsername = useMemo(() => {}, [username]);

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    return setUsername(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (username) {
      setIsSubmitting(true);
      try {
        const userSignedIn = await fetch(
          `${process.env.NEXT_PUBLIC_EXPRESS_SERVER_API}/checkUserExists`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username }),
          }
        );
        if (!userSignedIn.ok) {
          throw new Error("Username already taken (from server)");
        }
        const userData: { message: string } = await userSignedIn.json();
        sessionStorage.setItem(
          "discord-chat-user",
          JSON.stringify({ userId: username })
        );
        setIsSubmitting(false);
        push("/globalChat");
      } catch (error) {
        setIsSubmitting(false);
        alert(error);
      }
    } else {
      alert("Please enter a username firstaaa");
    }
  };
  return (
    <form
      className="flex flex-col gap-4 justify-center items-center"
      onSubmit={(e) => handleSubmit(e)}
    >
      <input
        className="border border-black"
        type="text"
        name="username"
        id="username"
        onChange={(e) => {
          handleUsernameChange(e);
        }}
      />
      {isSubmitting ? <ButtonLoading /> : <ButtonReady />}
    </form>
  );
}
