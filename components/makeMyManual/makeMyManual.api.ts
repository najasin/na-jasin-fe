// 추후 instance로 변경
export async function fetchMyProfileRegisterData() {
  try {
    const response = await fetch('http://localhost:3000//api/jff/my-manual')
    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }
    const data = await response.json()
    // console.log('Fetched data:', data)
    return data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}
