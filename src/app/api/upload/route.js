//api/upload/route.js
import { getBucket } from '@/lib/dbConnect';
import { Readable } from 'stream';
import { finished } from 'stream';

export async function POST(req) {
  try {
    const form = await req.formData();
    const file = form.get('file');
    
    if (!file) {
      return new Response('No file uploaded', { status: 400 });
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return new Response('Unsupported file type', { status: 400 });
    }

    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB limit
    if (file.size > MAX_FILE_SIZE) {
      return new Response('File is too large', { status: 400 });
    }

    const buffer = await file.arrayBuffer();
    const readableStream = Readable.from(Buffer.from(buffer));

    const bucket = await getBucket();
    const uploadStream = bucket.openUploadStream(file.name);

    readableStream.pipe(uploadStream);

    // Use 'finished' to wait for the stream to complete or fail
    return new Promise((resolve, reject) => {
      finished(uploadStream, (err) => {
        if (err) {
          console.error('Error uploading file:', err);
          reject(new Response('Error uploading file', { status: 500 }));
        } else {
          const fileUrl = `https://your-cloud-storage.com/${file.name}`; // Update with actual URL
          resolve(new Response(JSON.stringify({ message: 'Image uploaded successfully', url: fileUrl }), { status: 201 }));
        }
      });
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    return new Response(JSON.stringify({ message: 'Error uploading image' }), { status: 500 });
  }
}
