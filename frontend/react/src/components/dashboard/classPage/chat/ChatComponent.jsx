import {Box, Button, HStack, Input, VStack, Text, useColorModeValue, Divider, Textarea} from "@chakra-ui/react";
import {useEffect, useRef, useState} from "react";
import {getChatMessages, saveChatMessage} from "../../../../services/client/message.js";
import {useAuth} from "../../../context/AuthContext.jsx";
import chatMessageNotifications from "../../../../services/chatMessageNotifications.js";
import ChatMessageCard from "./ChatMessageCard.jsx";
import {getChat} from "../../../../services/client/chat.js";
import {getChatMembers} from "../../../../services/client/users.js";

export default function ChatComponent({ chatId }) {
    const [message, setMessage] = useState(""); // State for the current input
    const [chat, setChat] = useState({});
    const [chatMembers, setChatMembers] = useState([]);
    const [chatMessages, setChatMessages] = useState([]);
    const { fullUser } = useAuth();
    const messagesContainerRef = useRef(null); // Ref for the chat messages container

    function getDate() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const seconds = String(now.getSeconds()).padStart(2, "0");
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    }

    const handleNewMessages = (newMessage) => {
        setChatMessages((prevMessages) => {
            const exists = prevMessages.some((message) => message.id === newMessage.id);
            if (!exists) {
                return [...prevMessages, newMessage];
            }
            return prevMessages;
        });
    };

    const fetchChat = () => {
        getChat(chatId)
            .then((res) => {
                setChat(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const fetchChatMembers = () => {
        getChatMembers(chatId)
            .then((res) => {
                setChatMembers(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const fetchChatMessages = () => {
        getChatMessages(chatId)
            .then((res) => {
                setChatMessages(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const sendChatMessage = (messageData) => {
        saveChatMessage(messageData)
            .then(() => {
                console.log("Message sent");
                setMessage(""); // Clear input after sending
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        fetchChat();
        fetchChatMembers();
        fetchChatMessages();

        const disconnectWebSocket = chatMessageNotifications(chatId, handleNewMessages);

        // Cleanup function to disconnect WebSocket on component unmount
        return () => {
            if (disconnectWebSocket) {
                disconnectWebSocket();
            }
        };
    }, [chatId]);

    useEffect(() => {
        // Scroll to the bottom when new messages are added
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    }, [chatMessages]);

    return (
        <Box
            maxWidth={"1270px"}
            width={"100%"}
            height="100%" // Make the Box take all available vertical space
            borderRadius={"12px"}
            padding="10px"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            background={()=>useColorModeValue("#FBFBFB","#1F1F1F")}
            boxShadow="lg"
            gap={"10px"}
        >
            <Text color={() => useColorModeValue()}>#{chat?.name}</Text>
            <Divider/>
            {/* Chat messages area */}
            <VStack
                ref={messagesContainerRef} // Attach the ref to the container
                spacing={3}
                overflowY="auto"
                height="100%"
                flexGrow={1}
                alignItems="stretch" // Ensures HStack spans the full width
                padding="10px"
                borderBottom="1px solid #ddd"
            >
                {chatMessages.length > 0 ? (
                    chatMessages.map((chatMessage) => (
                        <ChatMessageCard {...chatMessage} fullUser={fullUser} key={chatMessage.id}/>
                    ))
                ) : (
                    <Text color="gray.500" textAlign="center" width="100%">
                        No messages yet. Start the conversation!
                    </Text>
                )}
            </VStack>

            {/* Input area */}
            <HStack spacing={3} padding="10px">
                <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    flexGrow={1} // Ensure it grows to fill available space
                    borderRadius="8px"
                    resize="none" // Disable resizing (optional)
                    overflow="hidden" // Prevent awkward scrollbars (optional)
                    whiteSpace="pre-wrap" // Ensure text wraps properly
                    maxLength={700} // Set the maximum character count
                />
                <Button
                    colorScheme="green"
                    isDisabled={message.trim() === ""}
                    onClick={() => {
                        const messageData = {
                            userId: fullUser.id,
                            content: message,
                            sentDateTime: getDate(),
                            chatId: chatId,
                        };
                        sendChatMessage(messageData);
                    }}
                >
                    Send
                </Button>
            </HStack>
        </Box>
    );
}