import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

import notificationSound from "../assets/sounds/notification.mp3";
import toast from "react-hot-toast";
import MessageReceived from "../components/toast/MessageReceived";

const useListenMessages = () => {
	const { socket } = useSocketContext();
	const { messages, setMessages, selectedConversation } = useConversation();

	useEffect(() => {
		socket?.on("newMessage", ({newMessage, conv}) => {
			newMessage.shouldShake = true;
			const sound = new Audio(notificationSound);
			sound.play();

			if(!selectedConversation){
				const { message } = newMessage;
				toast.custom((t) => (
					<MessageReceived t={t} message={message} conversation={conv}/>
				));
			}
			else if(selectedConversation._id === conv._id)
				setMessages([...messages, newMessage]);
			else{
				const { message } = newMessage;
				toast.custom((t) => (
					<MessageReceived t={t} message={message} conversation={conv}/>
				));
			}
		});

		return () => socket?.off("newMessage");
	}, [socket, setMessages, messages]);
};
export default useListenMessages;