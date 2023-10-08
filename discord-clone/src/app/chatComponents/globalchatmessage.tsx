"use client";

type props = {
  userMessage: UserChatMessage;
  continueUser: boolean;
};

export default function Globalchatmessage({
  userMessage,
  continueUser,
}: props) {
  const content = !continueUser ? (
    <article className="flex py-4 gap-2 flex-wrap px-8 justify-between items-center">
      <p className="text-sm text-left w-24 max-w-[6rem]">
        User : {userMessage.userId}
      </p>
      <h3 className="rounded-full break-all bg-[rgba(0,0,0,.3)] text-white py-1 px-4 text-">
        {userMessage.message.text}
      </h3>
    </article>
  ) : (
    <article className="flex py-4 gap-2 flex-wrap px-8 justify-end items-center">
      <h3 className="rounded-full break-all bg-[rgba(0,0,0,.3)] text-white py-1 px-4 text-">
        {userMessage.message.text}
      </h3>
    </article>
  );

  return content;
}
