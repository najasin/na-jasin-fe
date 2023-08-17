import classNames from 'classnames/bind'

import MyDescriptionCard from '@/components/descriptionCard/myDescriptionCard'
import OthersDescriptionCard from '@/components/descriptionCard/othersDescriptionCard'
import EditBtn from '@/components/editBtn/editBtn'
import { IManualBoxProps } from '@/components/manualBox/manualBox.types'

import styles from './manualBox.module.scss'

const cx = classNames.bind(styles)

export default function ManualBox({
  myDatas,
  othersDatas,
  type,
  onClickMyTypeBtn,
  onClickOthersTypeBtn,
}: IManualBoxProps) {
  const answers = othersDatas.map((data) => {
    const { nickname, qas } = data
    const datas = qas.map((qa) => {
      const { id } = qa
      const dividedQ = qa.question.split('---')
      const answer = dividedQ[0] + qa.answer + dividedQ[1]
      const res = { id, answer }
      return res
    })
    return { nickname, datas }
  })

  return (
    <div className={cx('manualBox')}>
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
            <OthersDescriptionCard cardDatas={answers} />
          )}
        </div>
      </div>
    </div>
  )
}
