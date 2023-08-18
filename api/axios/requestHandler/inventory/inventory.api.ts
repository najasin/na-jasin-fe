import { getRequest } from '../../common.apis'

const getInventory = async (userType: string) => {
  try {
    const response = await getRequest(`/api/${userType}/characterItems`)

    return response
  } catch (error) {
    return error as Error
  }
}

export default getInventory
