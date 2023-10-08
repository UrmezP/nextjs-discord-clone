type ChatMessage = {
    text: string;
    socketId: string;
};
type UserChatMessage = {
  userId: string,
  message: ChatMessage
}