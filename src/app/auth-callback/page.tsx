import { useRouter, useSearchParams } from "next/navigation"
import { trpc } from "../_trpc/client"

const Page = () => {
    const router = useRouter()
    const searchParams = useSearchParams()

    const {data, isLoading} = trpc.authCallback.useQuery()
}

export default Page