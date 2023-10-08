import Globalchatusernamechecker from "./chatComponents/globalchatusernamechecker";

export default function Landing() {
  return (
    <>
      <section className="flex min-h-[8rem] bg-slate-200 flex-col p-4 justify-between items-center">
        <h2>Please enter a unique username to begin</h2>
        <Globalchatusernamechecker />
      </section>
    </>
  );
}
