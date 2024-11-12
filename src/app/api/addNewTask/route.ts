import { authOptions } from "@/utils/auth/authoptions";
import { getServerSession } from "next-auth";
import User from "@/utils/models/UserModel";

export const POST  = async(request:Request) => {

    const {categoryName,newTask} = await request.json()

    const session = await getServerSession(authOptions)
    if (!session){
        return new Response(JSON.stringify({error:'Unauthorised user'}),{
            status:501,
            headers:{'contentType':'application/json'}
        })
    }

    try {
        const user = await User.findOneAndUpdate(
            {'name':session.user?.name,'todos.category':categoryName},
            {$push: {'todos.$.tasks':{'task':newTask,completed:false}}},
            {new:true}
        )

        return new Response(JSON.stringify(JSON.stringify(user.todos)),{
            status:200,
            headers:{'contentType':'application/json'}
        })

    } catch (error) {
        console.log('Database update error',error)
        return new Response(JSON.stringify({error:'internal server error'}),{
            status:500,
            headers:{'contentType':'application/json'}
        })
    }
    
}