import openSocket from 'socket.io-client';
export const socket = openSocket('http://localhost:8080');


class Socket {

	sendMessage = (message) => {
		socket.emit('chat', message);
	}
	receiveMessage = (cb) => {
		socket.on('chat', data => data)
	}
}
export default new Socket();
