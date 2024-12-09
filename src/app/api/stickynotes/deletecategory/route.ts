import { authOptions } from "@/utils/auth/authoptions"
import { getServerSession } from "next-auth"
import { connectDB } from "@/utils/database/connectDB"
import User from "@/utils/models/UserModel"

export const POST = async (request:Request) => {
    const session = await getServerSession(authOptions)
    const {categoryId} = await request.json()

    if (!session){
        return new Response(
            JSON.stringify({error: 'unauthorised access'}),
            {status:401,headers:{'Content-Type' : 'application/json'}})
    }

    await connectDB()

    try {
        const updatedUser = await User.findOneAndUpdate(
            {name:session.user?.name},
            {$pull:{'stickynotes':{_id:categoryId}}},
            {new:true}
        )
        return new Response(
            JSON.stringify(updatedUser.stickynotes),
            {
                status:200,
                headers : {'Content-Type':'application/json'}
            }
        )
    } catch (error) {
        console.error('Database update error:', error);
        return new Response(
            JSON.stringify({
                error : 'Internal Server Error : Could not delete the category'
            }),
            {
                status:500,
                headers : {'Content-Type':'application/json'}
            }
        )
    }
}