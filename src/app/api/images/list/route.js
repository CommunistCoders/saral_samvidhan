// src/app/api/images/list/route.js
import { getBucket } from '@/lib/dbConnect';

export async function GET() {
  try {
    const bucket = await getBucket();
    const images = await bucket.find().toArray();
    const imageList = images.map((img) => ({
      id: img._id,
      filename: img.filename,
    }));

    return new Response(JSON.stringify(imageList), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Error listing images:', error);
    return new Response('Failed to fetch images', { status: 500 });
  }
}
