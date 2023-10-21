"use client";

type props = {
  UserList?: ChatUser[];
};

export default function GlobalChatSidebar({ UserList }: props) {
  return (
    <>
      {UserList ? (
        <section className="bg-slate-200 ">
          <h2 className="text-center">All Online Users</h2>
          <ul className=" w-[150px] h-max my-4 p-4 flex flex-col justify-center items-center">
            {UserList.map((user, index) => {
              return <li key={`Sidebar#user#${index}`}>{user.username}</li>;
            })}
          </ul>
        </section>
      ) : (
        <section>Loaddinnggg....</section>
      )}
    </>
  );
}
