import SocketIOClient from 'socket.io-client';
import config from '../../config';

class WSService {
    initializeSocket = userToken => {
        try {
            console.log('initializing socket', userToken);
            if (!userToken) {
                console.log('Skipping socket initialization.', 'userToken not found');
                return;
            }
            this.socket = SocketIOClient(config.BASE_URL, {
                transports: ['websocket']
            });
            this.socket.on('connect', () => {
                console.log('Socekt connect')
            });
            this.socket.on('disconnect', () => {
                console.log('socket disconnected');
            });

            this.socket.on('connect_error', err => {
                //console.log('socket connection error: ', err);
                console.log('socket connection error: ', JSON.stringify(err));
            });

            this.socket.on('error', err => {
                // console.log('socket error: ', err);
                console.log('socket error: ', JSON.stringify(err));
            });
        } catch (error) {
            console.log('initialize token error: ', error);
        }
    };
    emit(event, data = {}, acknowldge) {
        console.log('event', event, data)
        this.socket.emit(event, data, acknowldge);
    }
    on(event, cb) {
        if (this.socket) {
            this.socket.on(event, cb);

        }
    }
    removeListener(listenerName) {
        this.socket.removeListener(listenerName);
    }
    sendMessage(event, data = {}, acknowldge) {
        console.log(event, data, "event")
        this.socket.emit(event, data, acknowldge);
    }
    messageFromServer(event, cb) {
        this.socket.on(event, cb);
    }
}

const socketServices = new WSService();

export default socketServices;
