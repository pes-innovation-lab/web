import { cookies } from 'next/headers'

const gon_uuid = '3495132164723033'

async function GetAnswer() {
    const cookieStore = cookies()
    if (cookieStore.has('jwt')) {
        const token = cookieStore.get('jwt')!.value
        console.log(token)
        const res = await fetch(
            `https://gamekeeper.theinnovationlab.in/questions/${gon_uuid}/answer`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                credentials: 'include',
            }
        )
        const data = await res.json()

        if (res.status == 200) {
            return data.answer
        } else {
            return 'Not Authorized'
        }
    } else {
        return "Not LOL'ed in"
    }
}

async function Home() {
    const output = await GetAnswer()

    return (
        <a
            href={output}
            className="bg-black h-screen text-white flex items-center justify-center text-4xl font-unifont"
        >
            Click me!
        </a>
    )
}

export default Home
