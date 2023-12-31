import { getRequest } from '../../common.apis'
import { IMyManualDatas, IRequestOptions } from './myManual.types'

export async function getMyManualRegister(token?: string) {
  try {
    const IrequestOptions: IRequestOptions = {}

    if (token) {
      IrequestOptions.headers = {
        Authorization: `${token}`,
      }
    }

    const response = await getRequest<IMyManualDatas>(
      '/api/jff/my-manual',
      IrequestOptions,
    )

    if (!response) {
      throw new Error('Failed to fetch data')
    }

    return response
  } catch (error) {
    throw error
  }
}
