import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useLogin from '../../hooks/useLogin';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loading, login } = useLogin();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  }
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
        <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
            <h1 className='text-3xl font-semibold text-center text-gray-300'>
                Login <span className='text-teal-500'>SocketChatApp</span>
            </h1>
            <br />
            <h3 className='font-semibold text-center text-gray-300 bg-slate-700 rounded-full'>Author: <span className='text-teal-500'>vaibhav</span><span className='text-orange-400'>M</span></h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text'>UserName</span>
                    </label>
                    <input type="text" placeholder='Enter UserName' className='w-full input input-bordered h-10'
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text'>Password</span>
                    </label>
                    <input type="password" placeholder='Enter Password' className='w-full input input-bordered h-10'
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)} 
                    />
                </div>
                <Link to="/signup" className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>
                    Don't have an account?
                </Link>
                <div>
                    <button className='btn btn-block btn-sm mt-2' disabled={loading}>
                        {loading ? <span className='loading loading-spinner'></span>: "LogIn"}
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login