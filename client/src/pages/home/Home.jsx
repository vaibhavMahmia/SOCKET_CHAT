import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";

const Home = () => {
  return (
    
      <div className='flex w-full h-full min-h-[70vh] p-6 rounded-lg overflow-hidden bg-gray-800 bg-clip-padding backdrop-filter backdrop-blur-lg'>
        <Sidebar/>
        <MessageContainer/>
      </div>
    
  )
}

export default Home