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
		socket?.on("newMessage", ({newMessage, senderId, senderName, profilePic}) => {
			newMessage.shouldShake = true;
			const sound = new Audio(notificationSound);
			sound.play();

			if(!selectedConversation){
				const { message } = newMessage;
				toast.custom((t) => (
					<MessageReceived t={t} message={message} senderName={senderName} profilePic={profilePic}/>
				));
			}
			else if(selectedConversation._id === senderId)
				setMessages([...messages, newMessage]);
			else{
				const { message } = newMessage;
				toast.custom((t) => (
					<MessageReceived t={t} message={message} senderName={senderName} profilePic={profilePic}/>
				));
			}
		});

		return () => socket?.off("newMessage");
	}, [socket, setMessages, messages]);
};
export default useListenMessages;