// app/api/updateprofile/route.js
import { getServerSession } from "next-auth";
import User from '@/app/models/User';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req, res) {
  try {
    const { profilePhoto } = await req.json();

    // Retrieve session using getServerSession instead of useSession
    const session = await getServerSession(authOptions);

    if (!session) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Find the user and update their profile photo
    const user = await User.findById(session.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.profilePhoto = profilePhoto;
    await user.save();

    return res.status(200).json({ message: 'Profile photo updated successfully' });
  } catch (error) {
    console.error('Error updating profile photo:', error);
    return res.status(500).json({ message: 'Error updating profile photo' });
  }
}
