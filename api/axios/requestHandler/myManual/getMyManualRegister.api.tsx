import { getRequest } from '../../common.apis'
import { IMyManualDatas } from './myManual.types'

export async function getMyManualRegister() {
  try {
    const response = await getRequest<IMyManualDatas>('/api/JFF/my-manual')
    if (!response) {
      throw new Error('Failed to fetch data')
    }
    return response
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}
