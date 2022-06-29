import socketIOClient from 'socket.io-client';
const ENDPOINT = 'http://localhost:5000/'; // TODO: Hardcoded

const socket = socketIOClient(ENDPOINT);

export default socket;
