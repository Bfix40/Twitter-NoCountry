import ProfileSection from "@/components/ProfileSection"
import { useSession, signIn } from "next-auth/react"
import Head from "next/head"

export default function Profile () {
  const { data: session, status } = useSession()

  return (
    <>
    <Head>
      <title>Perfil / Twitter</title>
    </Head>

    <ProfileSection session={session} />

    <section className="w-[95%] mx-auto my-4">
      <h2 className="text-xl font-bold">A quién seguir</h2>
      <p>PPADLPSAPLDASPD</p>
      <p>PPADLPSAPLDASPD</p>
      <p>PPADLPSAPLDASPD</p>
      <p>PPADLPSAPLDASPD</p>
      <p>PPADLPSAPLDASPD</p>
      <p>PPADLPSAPLDASPD</p>
      <p>PPADLPSAPLDASPD</p>
      <p>PPADLPSAPLDASPD</p>
      <p>PPADLPSAPLDASPD</p>
      <p>PPADLPSAPLDASPD</p>
      <p>PPADLPSAPLDASPD</p>
      <p>PPADLPSAPLDASPD</p>
      <p>PPADLPSAPLDASPD</p>
      <p>PPADLPSAPLDASPD</p>
      <p>PPADLPSAPLDASPD</p>
      <p>PPADLPSAPLDASPD</p>
      <p>PPADLPSAPLDASPD</p>
      <p>PPADLPSAPLDASPD</p>
      <p>PPADLPSAPLDASPD</p>
      <p>PPADLPSAPLDASPD</p>
      <p>PPADLPSAPLDASPD</p>
      <p>PPADLPSAPLDASPD</p>
      <p>PPADLPSAPLDASPD</p>
      <p>PPADLPSAPLDASPD</p>
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
