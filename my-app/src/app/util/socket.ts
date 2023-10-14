import { io } from "socket.io-client";

const socket = io(`${process.env.NEXT_PUBLIC_EXPRESS_SERVER_API_PROD}`);

export default socket;
