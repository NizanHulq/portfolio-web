import formidable from 'formidable';
import fs from 'fs';
import { uploadImage } from '@/lib/supabase';

// Disable body parser for file upload
export const config = {
  api: {
    bodyParser: false,
  },
};

// Verify admin token
function verifyToken(token) {
  try {
    if (!token) return false;
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString());
    return decoded.authenticated && decoded.exp > Date.now();
  } catch {
    return false;
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Verify authentication
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!verifyToken(token)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Parse the form data with temp directory
    const form = formidable({
      keepExtensions: true,
      maxFileSize: 5 * 1024 * 1024, // 5MB limit
    });

    const [fields, files] = await form.parse(req);
    
    const file = files.image?.[0];
    if (!file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.mimetype)) {
      // Delete temp file
      fs.unlinkSync(file.filepath);
      return res.status(400).json({ error: 'Invalid file type. Only JPEG, PNG, GIF, WEBP allowed.' });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const originalName = file.originalFilename || 'image';
    const safeName = originalName
      .replace(/\s+/g, '-')
      .replace(/[^a-zA-Z0-9.-]/g, '')
      .toLowerCase();
    const filename = `${timestamp}-${safeName}`;

    // Read file as buffer
    const fileBuffer = fs.readFileSync(file.filepath);

    // Upload to Supabase Storage
    const publicUrl = await uploadImage(fileBuffer, filename, file.mimetype);

    // Delete temp file
    fs.unlinkSync(file.filepath);

    return res.status(200).json({
      success: true,
      filename: filename,
      imageUrl: publicUrl,
      message: 'Image uploaded successfully'
    });

  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ error: error.message || 'Failed to upload image' });
  }
}
