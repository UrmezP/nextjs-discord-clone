"use client";

import { FormEvent, useMemo, useState } from "react";

export default function Globalchatusernamechecker() {
  const [username, setUsername] = useState("");

  const uniqueUsername = useMemo(() => {}, [username]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const userSignedIn = await fetch("http://localhost:3001/signIn", {
        method: "POST",
        headers: {
          content: "application/json",
        },
        body: JSON.stringify({ username }),
      });
      const userData = await userSignedIn.json();
      alert(JSON.stringify(userData));
    } catch (e) {}
  };
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input
        className="border border-black"
        type="text"
        name="username"
        id="username"
      />
      <input type="submit" value="Submit" />
      <span></span>
    </form>
  );
}
