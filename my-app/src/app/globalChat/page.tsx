import Globalchatwindow from "../chatComponents/globalchatwindow";
import LogoutButton from "../chatComponents/logout";

export default function globalChat() {
  return (
    <>
      <p className="mb-8">
        Chat with anyone globally! Just enter your message and send!
      </p>
      <Globalchatwindow />
      <div className="absolute top-0 right-0">
        <LogoutButton />
      </div>
    </>
  );
}
