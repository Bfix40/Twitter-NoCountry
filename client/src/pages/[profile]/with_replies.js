import ProfileSection from "@/components/ProfileSection"
import { useSession } from "next-auth/react"
import Head from "next/head"
import { useRouter } from "next/router"
import { useGetUserByIdQuery } from "@/redux/services/usersApi"

const ProfileReplies = () => {
  const { data: session, loading } = useSession()
  let profile = {}
  const { query } = useRouter()
  const { data } = useGetUserByIdQuery({ userId: query?.profile, token: session?.token })

  if (loading) {
    <p className="dark:text-white">Cargando</p>
  }

  if (!query.profile) {
    <p className="dark:text-white">Cargando</p>
  } else {
    if (query.profile !== session?.data?.username) {
      profile.user = data
    } else {
      profile = session
    }
  }

  return (
    <>
    <Head>
      <title>@{profile?.user?.username} / Twitter</title>
    </Head>
    <ProfileSection session={session} profile={profile} />
    </>
  )
}

export default ProfileReplies
