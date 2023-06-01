import ProfileSection from "@/components/ProfileSection"
import { useSession } from "next-auth/react"
import Head from "next/head"

const ProfileLikes = () => {
  const { data: session } = useSession()

  return (
    <>
    <Head>
      <title>Perfil / Twitter</title>
    </Head>
    <ProfileSection session={session} />
    </>
  )
}

export default ProfileLikes
