import { useAuthContext } from "../../context/AuthContext";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";

const Sidebar = () => {
	const { authUser } = useAuthContext();
	return (
		<div className='border-r border-slate-500 p-2 flex flex-col'>
			<div className="bg-slate-700 backdrop-filter backdrop-blur-lg bg-opacity-15 rounded-md px-3">
			<h1 className="font-bold text-gray-300 text-center" style={{fontSize:'20px'}}>Facul<span className='text-yellow-500'>Key</span></h1>
			<div className='font-bold text-gray-300 text-center' style={{fontSize:'12px'}}><span className='text-blue-500'>{authUser.username}</span></div>
			</div>
			<div className='divider px-3' style={{marginTop:'2px', marginBottom:'2px'}}/>
			<SearchInput />
			<div className='divider px-3' style={{marginTop:'2px', marginBottom:'2px'}}/>
			
			<Conversations />
			<LogoutButton />
		</div>
	);
};
export default Sidebar;