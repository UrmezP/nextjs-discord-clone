import { io } from "socket.io-client";

const socket = io(`${process.env.NEXT_PUBLIC_EXPRESS_SERVER_API_DEV}`);

export default socket;
