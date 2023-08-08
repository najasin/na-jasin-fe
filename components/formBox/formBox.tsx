import styles from './formBox.module.scss'
import { FormBoxProps } from './formBox.types'
import CommonBtn from '../commonBtn/commonBtn'
import { ButtonStyle } from '../commonBtn/commonBtn.types'

export default function FormBox({
  title,
  children,
  isActive = false,
  buttonContents,
}: FormBoxProps) {
  return (
    <>
      <div className={styles.titleWrapper}>
        <h2 className={styles.title}>{title}</h2>
      </div>
      <div className={styles.itemWrapper}>
        {children}
        <CommonBtn
          type="submit"
          style={isActive ? ButtonStyle.ACTIVE : ButtonStyle.DEACTIVE}
        >
          {buttonContents}
        </CommonBtn>
      </div>
    </>
  )
}
