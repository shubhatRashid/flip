import User from "@/utils/models/UserModel"
import { getServerSession } from "next-auth"
import { connectDB } from "@/utils/database/connectDB"
import { authOptions } from "@/utils/auth/authoptions"

export const PUT = async (request:Request) => {
    const session = await getServerSession(authOptions)
    
    if (!session) {
        return new Response(JSON.stringify({ error: 'User is unauthorized' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    
    const {category_id,note_id,updatedNote} = await request.json()
    try {
        await connectDB()
        const updatedUser = await User.findOneAndUpdate(
            { name: session.user?.name, 'stickynotes._id': category_id, 'stickynotes.notes._id': note_id },
            { $set: { 'stickynotes.$[].notes.$[note]': updatedNote }}, 
            {
              new: true,
              arrayFilters: [{ 'note._id': note_id }] 
            }
          );

        return new Response(JSON.stringify(updatedUser.stickynotes),{
            status:200,
            headers:{'Content-Type':'application/json'}
        })


    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({error:'Internal Server Error : Could not add a new note'}),{
            status:500,
            headers:{'Content-Type':'application/json'}
        })
    }
}