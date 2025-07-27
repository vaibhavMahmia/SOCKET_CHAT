import { useAuthContext } from "../../context/AuthContext";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";

const Sidebar = () => {
	const { authUser } = useAuthContext();
	return (
		<div className='border-r border-slate-500 p-2 flex flex-col items-center content-center justify-center text-center w-1/4'>
			<div className="bg-slate-500 backdrop-filter backdrop-blur-lg bg-opacity-20 rounded-md px-3 py-3 w-full">
				<h1 className="font-bold text-gray-300 text-center" style={{ fontSize: '20px' }}>Socket<span className='text-teal-600'>Chat</span></h1>
				<div className='font-bold text-gray-300 text-center underline' style={{ fontSize: '12px' }}>{authUser.username}</div>
			</div>
			<br />
			<div className="bg-slate-500 backdrop-filter backdrop-blur-lg bg-opacity-20 rounded-md px-3 py-3 w-full">
				<SearchInput />
			</div>
			<br />
			<Conversations />
			<LogoutButton />
		</div>
	);
};
export default Sidebar;