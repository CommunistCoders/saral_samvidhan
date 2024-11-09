// app/api/updateprofile/route.js
import User from '@/app/models/User';

export async function POST(req) {
  try {
    const { profilePhoto, userId } = await req.json(); // Destructure `userId`

    // Validate `userId`
    if (!userId) {
      return new Response(JSON.stringify({ message: 'User ID is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Find the user and update their profile photo
    const user = await User.findById(userId);
    if (!user) {
      return new Response(JSON.stringify({ message: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    user.profilePhoto = profilePhoto;
    await user.save();

    return new Response(JSON.stringify({ message: 'Profile photo updated successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error updating profile photo:', error);
    return new Response(JSON.stringify({ message: 'Error updating profile photo' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
