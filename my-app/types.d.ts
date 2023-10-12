type ChatMessage = {
    text: string;
    socketId: string;
};
type ChatUser= {
  userId : string,
}
type UserChatMessage = {
  userId: string,
  message: ChatMessage
}