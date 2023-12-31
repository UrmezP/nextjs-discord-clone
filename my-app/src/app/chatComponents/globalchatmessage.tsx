"use client";

type props = {
  userMessage: UserChatMessage;
  continueUser: boolean;
  isSender: boolean;
};

export default function Globalchatmessage({
  userMessage,
  continueUser,
  isSender,
}: props) {
  const content = continueUser ? (
    isSender ? (
      <article className="flex  py-1 flex-wrap px-8 justify-end items-stretch">
        <h3 className="rounded-sm  break-all bg-[rgba(0,0,0,.3)] text-white py-1 px-4 text-">
          {userMessage.message.text}
        </h3>
      </article>
    ) : (
      <article className="flex flex-row-reverse py-1 flex-wrap px-8 justify-end items-stretch">
        <h3 className="rounded-sm  break-all bg-[rgba(0,0,0,.3)] text-white py-1 px-4 text-">
          {userMessage.message.text}
        </h3>
      </article>
    )
  ) : isSender ? (
    <article className="flex py-1 gap-4 px-8 justify-end items-stretch">
      <p className="text-xs min-w-max text-right w-max h-min p-2 rounded-full text-black bg-green-400 ">
        {userMessage.username}
      </p>
      <h3 className="rounded-sm break-all bg-[rgba(0,0,0,.3)] text-white py-1 px-4 text-">
        {userMessage.message.text}
      </h3>
    </article>
  ) : (
    <article className="flex flex-row-reverse py-1 gap-4 px-8 justify-end items-stretch">
      <p className="text-xs min-w-max text-right w-max h-min p-2 rounded-full text-black  bg-slate-400">
        {userMessage.username}
      </p>
      <h3 className="rounded-sm break-all bg-[rgba(0,0,0,.3)] text-white py-1 px-4 text-">
        {userMessage.message.text}
      </h3>
    </article>
  );

  return content;
}
