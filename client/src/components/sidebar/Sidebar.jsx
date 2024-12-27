import { useAuthContext } from "../../context/AuthContext";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";

const Sidebar = () => {
	const { authUser } = useAuthContext();
	return (
		<div className='border-r border-slate-500 p-4 flex flex-col'>
			<SearchInput />
			<div className='divider px-3'/>
			<h3 className='font-semibold text-center text-gray-300 bg-slate-700 backdrop-filter backdrop-blur-lg bg-opacity-15 rounded-md px-3'>LoggedIn As: <span className='text-orange-400'>{authUser.fullName}</span></h3>
			<div className='divider px-3'/>
			<Conversations />
			<LogoutButton />
		</div>
	);
};
export default Sidebar;