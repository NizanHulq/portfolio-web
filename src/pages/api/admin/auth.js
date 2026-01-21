import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { password } = req.body;
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

    // Debug: Log hash info (remove in production)
    console.log('Hash loaded:', adminPasswordHash ? `${adminPasswordHash.substring(0, 10)}...` : 'NOT SET');
    console.log('Password received:', password ? 'YES' : 'NO');

    if (!adminPasswordHash) {
      console.error('ADMIN_PASSWORD_HASH not configured');
      return res.status(500).json({ error: 'Admin not configured' });
    }

    const isValid = await bcrypt.compare(password, adminPasswordHash);

    if (isValid) {
      // Generate a simple session token (valid for 24 hours)
      const token = Buffer.from(
        JSON.stringify({
          authenticated: true,
          exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
        })
      ).toString('base64');

      return res.status(200).json({ 
        success: true, 
        token,
        message: 'Authentication successful' 
      });
    } else {
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid password' 
      });
    }
  } catch (error) {
    console.error('Auth error:', error);
    return res.status(500).json({ error: 'Authentication failed' });
  }
}
