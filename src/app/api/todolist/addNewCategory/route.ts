import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth/authoptions'; 
import { connectDB } from '@/utils/database/connectDB';
import User from '@/utils/models/UserModel';

export const POST = async (request: Request) => {
  const session = await getServerSession(authOptions);
  const {category,tasks} = await request.json()
  console.log(category,tasks)

  if (!session) {
    return new Response(JSON.stringify({ error: 'User is unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    await connectDB();

    
    const updatedUser = await User.findOneAndUpdate(
      { name: session.user?.name},
      { $push: {'todos':{category:category ? category : 'new category...',tasks: tasks ? tasks : []}}},
      { new: true} // Ensure the updated document is returned and validators are run
    );

    // Return the updated todos
    return new Response(JSON.stringify(updatedUser.todos), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ error: 'Internal Server Error : Count not add a new category in todos' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
