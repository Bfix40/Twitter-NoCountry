import ProfileSection from "@/components/ProfileSection"
import { useSession } from "next-auth/react"
import Head from "next/head"
import Image from "next/image"

const ProfileMedia = () => {
  const { data: session } = useSession()

  return (
    <>
    <Head>
      <title>Perfil / Twitter</title>
    </Head>
    <ProfileSection session={session} />
    <section>
      <div className="flex flex-col items-center my-4 gap-2 mx-auto w-full max-w-xs dark:text-white">
        <Image
          src="/img/maskdoll.png"
          width={400}
          height={400}
          alt="Foto de perfil"
          unoptimized
        />
        <h2 className="text-3xl font-bold">Luz, cámara… ¡adjuntos!</h2>
        <p className="text-gray-500">Cuando envíes Tweets con fotos o videos, se mostrarán aquí.</p>
      </div>
    </section>
    </>
  )
}

export default ProfileMedia
