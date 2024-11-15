import {Box, Button, HStack, Input, VStack,Text} from "@chakra-ui/react";
import {useState} from "react";

export default function ChatComponent({}){
    const [messages, setMessages] = useState([]); // State to store messages
    const [message, setMessage] = useState(""); // State for the current input

    // Handle message submission
    const sendMessage = () => {
        if (message.trim() !== "") {
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: message, sender: "You" },
            ]);
            setMessage(""); // Clear input field
        }
    };

    return (
        <Box
            width="400px"
            height="500px"
            border="1px solid #ccc"
            borderRadius="10px"
            padding="10px"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            backgroundColor="white"
            boxShadow="lg"
        >
            {/* Chat messages area */}
            <VStack
                spacing={3}
                overflowY="auto"
                height="100%"
                flexGrow={1}
                alignItems="stretch" // Ensures HStack spans the full width
                padding="10px"
                borderBottom="1px solid #ddd"
            >
                {messages.length > 0 ? (
                    messages.map((msg, index) => (
                        <HStack
                            key={index}
                            justifyContent={msg.sender === "You" ? "flex-end" : "flex-start"}
                            width="100%" // Ensure HStack spans the full width
                        >
                            <Box
                                backgroundColor={msg.sender === "You" ? "green.100" : "blue.100"}
                                padding="6px"
                                borderRadius="8px"
                                maxWidth="75%" // Limit message width to avoid overflow
                                wordBreak="break-word" // Handle long text wrapping
                            >
                                <Text fontSize="sm" fontWeight="bold" textAlign={"right"}>
                                    {msg.sender}
                                </Text>
                                <Text>{msg.text}</Text>
                            </Box>
                        </HStack>
                    ))
                ) : (
                    <Text color="gray.500" textAlign="center" width="100%">
                        No messages yet. Start the conversation!
                    </Text>
                )}
            </VStack>


            {/* Input area */}
            <HStack spacing={3} padding="10px">
                <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    flexGrow={1}
                    borderRadius="8px"
                />
                <Button colorScheme="green" onClick={sendMessage}>
                    Send
                </Button>
            </HStack>
        </Box>
    );
}