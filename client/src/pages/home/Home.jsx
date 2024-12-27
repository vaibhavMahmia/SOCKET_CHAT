import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";

const Home = () => {
  return (
    <div>
    <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
			<Sidebar />
			<MessageContainer />
		</div>
    <h3 className='font-semibold text-center text-gray-300 bg-slate-700 backdrop-filter backdrop-blur-lg bg-opacity-10 rounded-md'>Author: <span className='text-teal-500'>vaibhav</span><span className='text-orange-400'>M</span></h3>
    </div>
  )
}

export default Home