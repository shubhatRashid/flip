import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth/authoptions'; 
import { connectDB } from '@/utils/database/connectDB';
import User from '@/utils/models/UserModel';

export const PUT = async (request: Request) => {
  const session = await getServerSession(authOptions);

  // Parse the request body
  const { categoryName,id,newTask} = await request.json();
 
  if (!session) {
    return new Response(JSON.stringify({ error: 'User is unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    await connectDB();

    // Update the user's todos
    const updatedUser = await User.findOneAndUpdate(
      { name: session.user?.name,'todos.category':categoryName,'todos.tasks._id':id},
      { $set: { 'todos.$.tasks.$[task].task': newTask }},
      {arrayFilters: [{ 'task._id': id }],  new:true}
    );

    // Return the updated todos
    return new Response(JSON.stringify(updatedUser.todos), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Database update error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};