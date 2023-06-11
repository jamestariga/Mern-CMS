import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { ITicket } from '@/types/types'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'

enum priority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
}

enum status {
  Open = 'Open',
  Progress = 'Progress',
  Closed = 'Closed',
}

const Ticket = () => {
  const [ticket, setTicket] = useState<ITicket>({
    title: '',
    description: '',
    priority: priority.Low,
    status: status.Open,
    type: '',
  })
  const [successMessage, setSuccessMessage] = useState<string>('')

  const axiosPrivate = useAxiosPrivate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value })
  }

  const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value })
  }

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.name === 'priority') {
      setTicket({ ...ticket, priority: e.target.value as priority })
    } else if (e.target.name === 'status') {
      setTicket({ ...ticket, status: e.target.value as status })
    }
  }

  const postTicket = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await axiosPrivate.post('/ticket', ticket, {
        withCredentials: true,
      })

      setSuccessMessage('Ticket created successfully!')
    } catch (error: any) {
      console.log(error.response.data.message)
    }
  }

  const createTicketMutation = useMutation(postTicket)

  return (
    <>
      <header className='flex flex-col items-center justify-center'>
        <h1 className='text-2xl font-bold py-6'>Create Ticket</h1>
        {successMessage && (
          <p className='text-green-500 font-bold text-xl'>{successMessage}</p>
        )}
        <form
          onSubmit={createTicketMutation.mutate}
          className='flex flex-col w-full px-6 md:w-2/3'
        >
          <div className='flex flex-col items-center justify-center w-full mt-4'>
            <div className='flex flex-col items-center justify-center w-full'>
              <label htmlFor='name'>Title</label>
              <input
                className='w-full px-2 py-1 mt-1 border border-gray-300 rounded focus:outline-none focus:border-blue-300'
                type='text'
                name='title'
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='flex flex-col items-center justify-center w-full mt-4'>
            <div className='flex flex-col items-center justify-center w-full'>
              <label htmlFor='description'>Description</label>
              <textarea
                className='w-full px-2 py-1 mt-1 h-72 resize-none bg-white border border-gray-300 rounded focus:outline-none focus:border-blue-300'
                name='description'
                onChange={handleChangeTextArea}
              />
            </div>
          </div>
          <div className='flex flex-col items-center justify-center w-full mt-4'>
            <div className='flex flex-col items-center justify-center w-full'>
              <label htmlFor='priority'>Priority</label>
              <select
                className='w-full px-2 py-1 mt-1 bg-white border border-gray-300 rounded focus:outline-none focus:border-blue-300'
                name='priority'
                value={ticket.priority}
                onChange={handleChangeSelect}
              >
                <option value={priority.Low}>Low</option>
                <option value={priority.Medium}>Medium</option>
                <option value={priority.High}>High</option>
              </select>
            </div>
          </div>
          <div className='flex flex-col items-center justify-center w-full mt-4'>
            <div className='flex flex-col items-center justify-center w-full'>
              <label htmlFor='status'>Status</label>
              <select
                className='w-full px-2 py-1 mt-1 bg-white border border-gray-300 rounded focus:outline-none focus:border-blue-300'
                name='status'
                value={ticket.status}
                onChange={handleChangeSelect}
              >
                <option value={status.Open}>Open</option>
                <option value={status.Progress}>In Progress</option>
                <option value={status.Closed}>Closed</option>
              </select>
            </div>
          </div>
          <div className='flex flex-col items-center justify-center w-full mt-4'>
            <div className='flex flex-col items-center justify-center w-full'>
              <label htmlFor='type'>Type</label>
              <input
                className='w-full px-2 py-1 mt-1 border border-gray-300 rounded focus:outline-none focus:border-blue-300'
                type='text'
                name='type'
                onChange={handleChange}
              />
            </div>
          </div>
          <button
            className='w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600'
            type='submit'
          >
            Submit
          </button>
        </form>
      </header>
    </>
  )
}

export default Ticket
