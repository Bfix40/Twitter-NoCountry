import ProfileSection from "@/components/ProfileSection"
import { useSession } from "next-auth/react"
import Head from "next/head"
import { useRouter } from "next/router"
import { useGetUserByIdQuery } from "@/redux/services/usersApi"
import QuienSeguir from "@/components/layoutComponents/QuienSeguir"

const ProfileReplies = () => {
  const { data: session, loading } = useSession()
  let profile = {}
  const { query } = useRouter()
  const { data } = useGetUserByIdQuery({ userId: query?.profile, token: session?.token })

  console.log(session);

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

    <section className="w-[95%] mx-auto my-4 dark:text-white">
      <QuienSeguir expand={true} />
    </section>
    </>
  )
}

export default ProfileReplies
