import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";
import useGetConversations from "./useGetConversations";
import notificationSound from "../assets/sounds/notification.mp3";
import toast from "react-hot-toast";
import useSideBarUser from "../zustand/useSideBarUser";


const useListenNewUsers = () => {
	const { socket } = useSocketContext();
	const { conversations, setConversations } = useSideBarUser();

	useEffect(() => {
		socket?.on("newUser", (emitUser) => {
			emitUser.shouldShake = true;
            const sound = new Audio(notificationSound);
			sound.play();
            toast.success(`${emitUser.fullName} just created an account !`);
			setConversations([...conversations, emitUser]);
            console.log('conversationsUpdated: ',conversations);
		});

		return () => socket?.off("newUser");
	}, [socket, conversations, setConversations]);
};
export default useListenNewUsers;