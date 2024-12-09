import User from "@/utils/models/UserModel"
import { getServerSession } from "next-auth"
import { authOptions } from "@/utils/auth/authoptions"
import { connectDB } from "@/utils/database/connectDB"

export const PUT = async (request:Request) => {
    const session = await getServerSession(authOptions)
    if (!session){
        return new Response(
            JSON.stringify({error : 'unauthorised access'}),
            {status:401,headers:{'Content-Type':'application/json'}}
        )
    }

    const {categoryId,newCategoryName} = await request.json()
    console.log(categoryId,newCategoryName)
    try {
        await connectDB()

        const updatedUser = await User.findOneAndUpdate(
            {name : session.user?.name,'stickynotes._id':categoryId},
            {$set : {'stickynotes.$.category' : newCategoryName}},
            {new:true}
        )

        return new Response(
            JSON.stringify(updatedUser.stickynotes),
            {status:200,headers:{'Content-Type':'application/json'}}
        )
    } catch (error) {
        console.log(error)
        return new Response(
            JSON.stringify({error : 'Internal server error : could not rename category'}),
            {status:500,headers:{'Content-Type':'application/json'}}
        )

    }
}