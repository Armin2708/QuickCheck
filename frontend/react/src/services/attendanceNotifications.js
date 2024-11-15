import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

function attendanceNotifications(tag, onNewAttendance) {
    const socket = new SockJS(`${import.meta.env.VITE_API_BASE_URL}/api/ws`);
    const stompClient = new Client({
        webSocketFactory: () => socket,
        reconnectDelay: 5000,
        debug: () => {},  // Disables debug logging
    });

    stompClient.onConnect = () => {
        const destination = `/topic/attendance/${tag}`;
        stompClient.subscribe(destination, (message) => {
            try {
                const parsedMessage = JSON.parse(message.body);
                if (parsedMessage && parsedMessage.userId) {
                    onNewAttendance(parsedMessage.userId);
                }
            } catch (error) {
                // Log errors for non-JSON messages if necessary
                console.error("Received non-JSON message:", message.body);
            }
        });
    };

    stompClient.onStompError = (frame) => {
        console.error('WebSocket error:', frame.headers['message']);
    };

    stompClient.activate();

    // Cleanup function for component unmount
    return () => {
        stompClient.deactivate();
    };
}

export default attendanceNotifications;
