/**
 *
 * @param shareURL 공유할 url (타적나사 + userId 조합으로 된 링크)
 */
const handleClickShareFacebook = (shareURL: string) => {
  window.open(
    // `http://www.facebook.com/sharer.php?u=${window.location.href}`,
    `http://www.facebook.com/sharer.php?u=${shareURL}`,
    '_blank',
    'noopener,noreferrer',
  )
}

export default handleClickShareFacebook
