import { RiLogoutBoxLine } from "react-icons/ri";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
  const { loading, logout } = useLogout();
  return (
    <div className='mt-auto w-full'>
      {
        !loading ? (
          <div className="flex items-center gap-2 cursor-pointer font-bold" onClick={logout}>
            <RiLogoutBoxLine className="w-6 h-6 text-red-500" />
            <span>Logout</span>
          </div>
        ) : (
          <span className="loading loading-spinner"></span>
        )
      }
    </div>
  )
}

export default LogoutButton