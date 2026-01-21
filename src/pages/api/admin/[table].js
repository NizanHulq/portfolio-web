import { supabase } from '@/lib/supabase';

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
  // Verify authentication
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!verifyToken(token)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { table } = req.query;
  const allowedTables = ['projects', 'experiences', 'skills', 'settings', 'ai_context'];
  
  if (!allowedTables.includes(table)) {
    return res.status(400).json({ error: 'Invalid table' });
  }

  try {
    switch (req.method) {
      case 'GET':
        // Fetch all records - order by appropriate column
        const orderColumn = (table === 'settings' || table === 'ai_context') ? 'key' : 'id';
        const { data: getData, error: getError } = await supabase
          .from(table)
          .select('*')
          .order(orderColumn, { ascending: true });
        
        if (getError) throw getError;
        return res.status(200).json({ data: getData });

      case 'POST':
        // Create new record
        const { data: postData, error: postError } = await supabase
          .from(table)
          .insert(req.body)
          .select();
        
        if (postError) throw postError;
        return res.status(201).json({ data: postData });

      case 'PUT':
        // Update record
        const { id, ...updateData } = req.body;
        
        // Handle tables with different primary keys
        let updateQuery;
        if (table === 'settings' || table === 'ai_context') {
          updateQuery = supabase
            .from(table)
            .update(updateData)
            .eq('key', req.body.key)
            .select();
        } else {
          updateQuery = supabase
            .from(table)
            .update(updateData)
            .eq('id', id)
            .select();
        }
        
        const { data: putData, error: putError } = await updateQuery;
        if (putError) throw putError;
        return res.status(200).json({ data: putData });

      case 'DELETE':
        // Delete record
        let deleteQuery;
        if (table === 'settings' || table === 'ai_context') {
          deleteQuery = supabase
            .from(table)
            .delete()
            .eq('key', req.body.key);
        } else {
          deleteQuery = supabase
            .from(table)
            .delete()
            .eq('id', req.body.id);
        }
        
        const { error: deleteError } = await deleteQuery;
        if (deleteError) throw deleteError;
        return res.status(200).json({ success: true });

      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error(`Admin ${req.method} error on ${table}:`, error);
    return res.status(500).json({ error: error.message });
  }
}
