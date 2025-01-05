import React, { useState } from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import useConversation from '../../zustand/useConversation';
import useGetConversations from '../../hooks/useGetConversations';
import toast from 'react-hot-toast';

const SearchInput = () => {
	const [search, setSearch] = useState("");
	const { setSelectedConversation } = useConversation();
	const { conversations } = useGetConversations();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!search) return;
		if (search.length < 3) {
			return toast.error("Search term must be at least 3 characters long");
		}

		const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()) || c.username.toLowerCase().includes(search.toLowerCase()));

		if (conversation) {
			setSelectedConversation(conversation);
			setSearch("");
		} else toast.error("No such user found!");
	};
	return (
		<form onSubmit={handleSubmit} className='flex items-center gap-2'>
			<input
				type='text'
				placeholder='Search…'
				className='input rounded-full input-bordered py-1 h-6 backdrop-filter backdrop-blur-lg bg-opacity-15'
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				style={{fontSize:'12px'}}
			/>
			<button type='submit' className='bg-teal-400 text-white py-1 px-6 rounded-full'>
				<IoSearchSharp className='w-4 outline-none' />
			</button>
		</form>
	)
}

export default SearchInput