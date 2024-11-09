// src/app/api/images/[id]/route.js
import { getBucket } from '@/lib/dbConnect';

export async function GET(req, { params }) {
  const { id } = params;
  try {
    const bucket = await getBucket();
    const downloadStream = bucket.openDownloadStreamByName(id);

    return new Response(downloadStream, {
      headers: {
        'Content-Type': 'image/jpeg',
      },
    });
  } catch (error) {
    console.error('Error retrieving image:', error);
    return new Response('Image not found', { status: 404 });
  }
}
