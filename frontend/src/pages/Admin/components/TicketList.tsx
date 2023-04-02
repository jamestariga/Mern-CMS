import { ICreateProduct, ITicket, Tickets } from '@/types/types'
import { useQuery } from '@tanstack/react-query'

const TicketList = (props: ICreateProduct) => {
  const { axiosPrivate } = props

  const getTickets = async () => {
    const response = await axiosPrivate.get('/ticket')
    console.log(response)

    return response.data
  }

  const { data: ticketsData } = useQuery<Tickets, Error>(['ticket'], () =>
    getTickets()
  )

  const { data: ticketData } = ticketsData || {}

  console.log(ticketData)

  return (
    <>
      <div className='flex flex-col items-center justify-center pt-10'>
        <h1 className='text-2xl font-bold py-6'>Ticket List</h1>
        <div className='flex flex-col items-center justify-center'>
          {ticketData?.map((ticket: ITicket) => (
            <div
              key={ticket._id}
              className='flex flex-col items-center justify-center gap-4'
            >
              <h1 className='text-xl font-bold'>{ticket.title}</h1>
              <p className='text-lg'>{ticket.description}</p>
              <p className='text-lg'>{ticket.status}</p>
              <p className='text-lg'>{ticket.priority}</p>
              <p className='text-lg'>{ticket.type}</p>
              <button
                className='w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600'
                type='submit'
              >
                Resolve
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default TicketList
