import User from "@/utils/models/UserModel"
import { getServerSession } from "next-auth"
import { connectDB } from "@/utils/database/connectDB"
import { authOptions } from "@/utils/auth/authoptions"

export const GET = async (request:Request) => {
    const session = await getServerSession(authOptions)
    
    if (!session) {
        return new Response(JSON.stringify({ error: 'User is unauthorized' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    await connectDB()

    try {
        const updatedUser = await User.findOneAndUpdate(
            {name:session.user?.name},
            {$push:{'notes':{category:'new category...',notes:[]}}},
            {new:true}
        )

        return new Response(JSON.stringify(updatedUser.notes),{
            status:200,
            headers:{'Content-Type':'application/json'}
        })


    } catch (error) {
        return new Response(JSON.stringify({error:'Internal Server Error : Could not add a new category'}),{
            status:500,
            headers:{'Content-Type':'application/json'}
        })
    }
}