"use client";

import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

export function ButtonReady() {
  return (
    <Button className="bg-[#6633FF] hover:bg-[#35276f]">
      Check availability
    </Button>
  );
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

  // const uniqueUsername = useMemo(() => {}, [username]);

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    return setUsername(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (username) {
      setIsSubmitting(true);

      try {
        const userSignedIn = await fetch(
          `${process.env.NEXT_PUBLIC_EXPRESS_SERVER_API_PROD}/checkUserExists`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username }),
          }
        );
        if (!userSignedIn.ok) {
          const userData: { message: string } = await userSignedIn.json();
          throw new Error(userData.message);
        }
        sessionStorage.setItem(
          "discord-chat-user",
          JSON.stringify({ username: username })
        );
        setTimeout(() => {
          setIsSubmitting(false);
          push("/globalChat");
        }, 1000);
      } catch (error) {
        setIsSubmitting(false);
        alert(error);
      }
    } else {
      alert("Please enter a unique username first");
    }
  };
  return (
    <form
      className="flex flex-col gap-2 justify-start pt-2 items-start"
      onSubmit={(e) => handleSubmit(e)}
    >
      <Input
        type="text"
        name="username"
        id="username"
        placeholder="Username"
        className="md:w-[420px] w-[300px] bg-white"
        onChange={(e) => {
          handleUsernameChange(e);
        }}
      />
      {isSubmitting ? <ButtonLoading /> : <ButtonReady />}
    </form>
  );
}
