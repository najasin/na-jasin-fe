import { getRequest } from '@/api/axios/common.apis'

const getRadarData = async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const response = await getRequest<any>('/api/mock-radar')
  return response.data
}

export { getRadarData }
