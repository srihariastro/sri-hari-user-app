import { io } from 'socket.io-client';
import { base_url } from '../config/constants';
import { resetToScreen } from '../navigations/NavigationServices';
import { showToastMessage } from './services';
import * as ChatActions from '../redux/actions/ChatActions'
// const SOCKET_URL = 'http://localhost:4000/';
// const SOCKET_URL = "https://api.srihariastro.com/" ;//base_url;
const SOCKET_URL = "ws://145.223.22.200:5000"; 

class socketServices {

  static initializeSocket = async (dispatch) => {
    try {
      this.socket = io(SOCKET_URL, {
        transports: ["websocket"],
        forceNew: true,
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        timeout: 20000,
        autoConnect: true, // Ensure auto connection
        rejectUnauthorized: false, // Bypass SSL issues (not recommended for production)
      });

      this.socket.on('connect', () => {
        console.log('Socket Connected:', this.socket.id);
        // this.emit('reconnect');
      });

      this.socket.on('connect_error', (err) => {
        console.log('Socket Connection Error:', err);
    });

      this.socket.on('disconnect', reason => {
        console.log('Socket Disconnected:', reason);
        if (reason === 'io server disconnect') {
          // The disconnection was initiated by the server, you need to reconnect manually
          this.socket.connect();
        }
      });

      // this.socket.on('reconnect', (attemptNumber) => {
      //   console.log(`Socket Reconnected after ${attemptNumber} attempts`);
      //   // Handle post-reconnection logic here
      // });

      this.socket.on('reconnect_attempt', () => {
        console.log('Attempting to reconnect...');
      });

      this.socket.on('reconnect_error', (error) => {
        console.log('Reconnection error:', error);
      });

      this.socket.on('reconnect_failed', () => {
        console.log('Reconnection failed');
        // this.handleReconnectionFailed(dispatch);
      });

      this.socket.on('new_customer_login', data => {
        // dispatch(UserActions.checkCustomerLoginSession(data))
      })

      this.socket.on('new_astrologer_login', data => {
        // dispatch(AstroActions.check_astrologer_login_session(data))
      })

      // this.socket.on('startChatAstro',(data) => {
      //   console.log('Message ::::::', data,data.profileId?.customerId);
      //   if(data.message && data.profileId?.customerId) {
          
      //     dispatch(ChatActions.onChatRequestSend());
      //   } else {
      //     showToastMessage({ message: "chat astrologer exists."})
      //   }
      // });

      this.socket.on('onChatReject', data => {
        // dispatch(ChatActions.setCountDownValue(data));
        resetToScreen('home')
        showToastMessage({ message: 'Chat not conected' })
      });

      this.socket.on('updateChatTimer', data => {
        console.log("datadata>>", data);
        
        dispatch(ChatActions.setChatTimerCountdown(data));
      });

      this.socket.on('timerStopped', data => {
        console.log('runne......................')
        dispatch(ChatActions.onCloseChat());
      });

      this.socket.on('chatEnded', data => {
        console.log('not runne......................')
        dispatch(ChatActions.onCloseChat());
      });

      this.socket.on('walletAlert', data => {
        // dispatch(ChatActions.setChatWalletAlert(data))
      })

      this.socket.on('error', data => {
        console.log('Socket Error', data);
      });
    } catch (e) {
      console.log('socket is not initilized', e);
    }
  };

  static emit(event, data = {}) {
    console.log(data);
    this.socket.emit(event, data);
  }

  static removeListener(listenerName) {
    this.socket.removeAllListeners(listenerName);
  }
}

export default socketServices;
