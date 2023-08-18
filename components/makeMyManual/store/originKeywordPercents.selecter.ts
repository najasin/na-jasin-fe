import { selector } from 'recoil'

// eslint-disable-next-line import/no-cycle
import { selectedKeywordsState } from './makeMyManual.atom'

export const originKeywordPercentsSelector = selector({
  key: 'originKeywordPercentsSelector',
  get: ({ get }) => {
    const selectedKeywords = get(selectedKeywordsState)
    const originKeywordPercents = selectedKeywords.reduce(
      (acc, keyword) => ({
        ...acc,
        [keyword]: 2.6,
      }),
      {},
    )
    return originKeywordPercents
  },
})
