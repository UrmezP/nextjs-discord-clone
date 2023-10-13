type ChatMessage = {
    text: string;
    socketId: string;
};
type ChatUser= {
  username : string,
}
type UserChatMessage = {
  username: string,
  message: ChatMessage
}