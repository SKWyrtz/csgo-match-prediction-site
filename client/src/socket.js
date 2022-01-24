import socketIOClient from 'socket.io-client';
const ENDPOINT = 'http://localhost:5000/'; // Hardcoded

const socket = socketIOClient(ENDPOINT);

export default socket;
