import { useState } from 'react';
import { BsSend } from 'react-icons/bs';
import useSendMessage from '../../hooks/useSendMessage';

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [rows, setRows] = useState(1);
  const { loading, sendMessage } = useSendMessage();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!message)
      return;
    await sendMessage(message);
    setMessage("");
    setRows(1);
  }

  const handleChange = (e) => {
    setMessage(e.target.value);
    const lines = e.target.value.split("\n").length;
    setRows(lines < 1 ? 1 : lines > 5 ? 5 : lines);
  }
  return (
    <form className="px-4 my-3" onSubmit={ handleSubmit }>
      <div className="w-full flex items-end gap-2">
        <textarea
          rows={rows}
          className="border text-sm rounded-lg block w-full p-2 bg-gray-800 bg-clip-padding backdrop-filter backdrop-blur-lg border-orange-400 text-white resize-none overflow-y-auto"
          placeholder='Send A Message...'
          value={message}
          onChange={handleChange}
          style={{maxHeight: '160px'}} // approx 5 rows
        />
        <button type="submit" className="flex items-center">
          {loading ? (
            <div className='loading loading-spinner'></div>
          ) : (
            <div className='bg-orange-400 p-3 rounded-full'>
              <BsSend className='text-white font-bold'/>
            </div>
          )}
        </button>
      </div>
    </form>
  )
}

export default MessageInput