import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

function chatMessageNotifications(chatId, onNewMessage) {
    const socket = new SockJS(`${import.meta.env.VITE_API_BASE_URL}/api/ws`);
    const stompClient = new Client({
        webSocketFactory: () => socket,
        reconnectDelay: 5000,
        debug: () => {},  // Disables debug logging
    });

    stompClient.onConnect = () => {
        const destination = `/topic/message/chat/${chatId}`;
        stompClient.subscribe(destination, (message) => {
            try {
                const parsedMessage = JSON.parse(message.body);
                if (parsedMessage && parsedMessage.id && parsedMessage.userId && parsedMessage.content && parsedMessage.dateTime && parsedMessage.chatId) {
                    onNewMessage(parsedMessage);
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

export default chatMessageNotifications;
