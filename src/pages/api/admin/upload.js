import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

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
    // Ensure upload directory exists
    const uploadDir = path.join(process.cwd(), 'public', 'images', 'projects');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Parse the form data
    const form = formidable({
      uploadDir: uploadDir,
      keepExtensions: true,
      maxFileSize: 5 * 1024 * 1024, // 5MB limit
      filename: (name, ext, part) => {
        // Generate unique filename
        const timestamp = Date.now();
        const safeName = part.originalFilename
          .replace(/\s+/g, '-')
          .replace(/[^a-zA-Z0-9.-]/g, '')
          .toLowerCase();
        return `${timestamp}-${safeName}`;
      },
    });

    const [fields, files] = await form.parse(req);
    
    const file = files.image?.[0];
    if (!file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.mimetype)) {
      // Delete the uploaded file
      fs.unlinkSync(file.filepath);
      return res.status(400).json({ error: 'Invalid file type. Only JPEG, PNG, GIF, WEBP allowed.' });
    }

    // Get the relative path for the database
    const filename = path.basename(file.filepath);
    const imageUrl = filename; // Just the filename, the component adds the path

    return res.status(200).json({
      success: true,
      filename: filename,
      imageUrl: imageUrl,
      message: 'Image uploaded successfully'
    });

  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ error: 'Failed to upload image' });
  }
}
