import { useQuery } from '@tanstack/react-query'
import { Population } from '../../types/types'
import { getPopulation } from '../../api/populationApi'

const Populations = () => {
  const { data, isLoading, isError } = useQuery<Population, Error>(
    ['population'],
    () => getPopulation()
  )

  const { data: populationData } = data || {}

  return (
    <>
      <div className='flex flex-col justify-center items-center gap-10 bg-red-200 w-screen h-screen'>
        {populationData?.map((population, i) => (
          <div key={i}>
            <p>{population.Nation}</p>
            <p>{population.Year}</p>
            <p>{population.Population}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default Populations
