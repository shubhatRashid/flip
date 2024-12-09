import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth/authoptions'; 
import { connectDB } from '@/utils/database/connectDB';
import User from '@/utils/models/UserModel';

export const GET = async (request: Request) => {
  const session = await getServerSession(authOptions)

  if (!session){
    return new Response(JSON.stringify({error: 'User is unauthorised'}), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    await connectDB()
    let user = await User.findOne({name:session.user?.name})
    if (!user){
        const newUser = new User({
            name : session.user?.name,
            email : session.user?.email,
            todos : [],
            stickynotes : []
        })
    
        await newUser.save()
    }

    let data = await User.findOne({name:session.user?.name})
     
    return new Response(JSON.stringify(JSON.stringify(data)), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
};

