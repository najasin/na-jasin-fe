import classNames from 'classnames/bind'

import MyDescriptionCard from '@/components/descriptionCard/myDescriptionCard'
import EditBtn from '@/components/editBtn/editBtn'
import { IManualBoxProps } from '@/components/manualLayout/manualBox.types'

import OthersDescriptionCard from '../descriptionCard/othersDescriptionCard'
import styles from './myManualLayout.module.scss'

const cx = classNames.bind(styles)

export default function ManualBox({
  myDatas,
  othersDatas,
  type,
  nickname,
  onClickMyTypeBtn,
  onClickOthersTypeBtn,
}: IManualBoxProps) {
  const answers = othersDatas.map((data) => {
    const dividedQ = data.question.split('---')
    const answer = dividedQ[0] + data.answer + dividedQ[1]
    const { id } = data
    return { id, answer }
  })

  return (
    <>
      <div className={cx('typeBtns')}>
        <div
          className={cx(
            'typeBtn',
            type === 'MY' ? 'typeBtnSelected' : 'typeBtnUnselected',
          )}
          onClick={onClickMyTypeBtn}
        >
          기본
        </div>
        <div
          className={cx(
            'typeBtn',
            type === 'OTHERS' ? 'typeBtnSelected' : 'typeBtnUnselected',
          )}
          onClick={onClickOthersTypeBtn}
        >
          꿀팁
        </div>
      </div>
      <div className={cx('manual')}>
        <div className={cx('header')}>
          <p>자시니는 이렇게 사용해요</p>
          <EditBtn />
        </div>
        <div className={cx('answers')}>
          {type === 'MY' ? (
            myDatas.map((data) => (
              <MyDescriptionCard
                key={data.question.id}
                question={data.question}
                answer={data.answer}
                defaultValue={data.defaultValue}
              />
            ))
          ) : (
            <OthersDescriptionCard answers={answers} nickname={nickname} />
          )}
        </div>
      </div>
    </>
  )
}
