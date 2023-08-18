const handleClickShareFacebook = () => {
  window.open(
    `http://www.facebook.com/sharer.php?u=${window.location.href}`,
    '_blank',
    'noopener,noreferrer',
  )
}

export default handleClickShareFacebook
