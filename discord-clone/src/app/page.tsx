import Globalchatwindow from "./chatComponents/globalchatwindow";

export default function Landing() {
  return (
    <main className="md:px-4 md:py-4">
      <h1 className="text-4xl">GlobalChat</h1>
      <br />
      <p className="mb-8">
        Chat with anyone globally! Just enter your name and message and send!
      </p>
      <Globalchatwindow />
    </main>
  );
}
