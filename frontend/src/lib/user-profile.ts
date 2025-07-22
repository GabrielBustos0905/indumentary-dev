export async function getUserProfile() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
      credentials: 'include',
    })

    if (!res.ok) return null

    const data = await res.json()
    return data.user
  } catch (err) {
    console.log(err)
    return null
  }
}
