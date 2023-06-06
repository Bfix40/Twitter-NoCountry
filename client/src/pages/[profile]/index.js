import ProfileSection from "@/components/ProfileSection"
import { useSession, signIn } from "next-auth/react"
import Head from "next/head"
import { useRouter } from "next/router"
import { useGetUserByIdQuery } from "@/redux/services/usersApi"

export default function Profile () {
  const { data: session, loading, status } = useSession()
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

    <section className="w-[95%] mx-auto my-4 dark:text-white">
      <h2 className="text-xl font-bold">A quién seguir</h2>
    </section>

    <div>
      {status === "unauthenticated"
        ? (
        <div className="flex flex-col items-center justify-center gap-5">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-xl"
            onClick={() => signIn("google")}
          >
            Login con google
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-xl"
            onClick={() => signIn("github")}
          >
            Login con github
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-xl"
            onClick={() => signIn("facebook")}
          >
            Login con facebook
          </button>
        </div>
          )
        : null
      }
    </div>
    </>
  )
}
