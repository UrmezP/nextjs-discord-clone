"use client";
import socket from "../util/socket";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ExitIcon } from "@radix-ui/react-icons";

export default function LogoutButton() {
  const { push } = useRouter();

  function clickHandler() {
    push("/");
    socket.emit("logoutuser", sessionStorage.getItem("discord-chat-user"));
    sessionStorage.setItem("discord-chat-user", JSON.stringify(null));
  }
  //
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">
          Logout <ExitIcon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently log you out and
            remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={clickHandler}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
