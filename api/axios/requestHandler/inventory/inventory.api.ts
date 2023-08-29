import { ICharacterItems } from '@/components/shared/inventory/inventory.types'

import { getRequest } from '../../common.apis'

const getInventory = async (userType: string): Promise<ICharacterItems> => {
  const response = await getRequest<ICharacterItems>(
    `/api/${userType}/characterItems`,
  )

  return response
}

export default getInventory
