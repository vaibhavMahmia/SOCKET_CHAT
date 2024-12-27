import { RiLogoutBoxLine } from "react-icons/ri";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
  const { loading, logout } = useLogout();
  return (
    <div className='mt-auto'>
      {
        !loading ? <RiLogoutBoxLine className="w-6 h-6 text-red-500 cursor-pointer" onClick={logout}/> : <span className="loading loading-spinner"></span>
      }
      
    </div>
  )
}

export default LogoutButton