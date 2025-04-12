import generateTasks from '@/utils/taskGenerator/taskGenerator'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/utils/auth/authoptions'

export const POST = async (request: Request) => {
    const session = getServerSession(authOptions)
    if (!session){
        return new Response(JSON.stringify({error: 'User is unauthorised'}), {
            status: 401,
            headers: { 'Content-Type': 'application/json' }
          });
        }
        
    try {
        const { prompt } = await request.json()
        const tasks = await generateTasks(prompt)
        
        return new Response(JSON.stringify({ tasks }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        })
    } catch (error) {
        return new Response(
        JSON.stringify({ error: 'Internal Server Error' }),
        { status: 500 }
        )
    }
}
