import { useState, useEffect } from 'react';
import Head from 'next/head';

// Table configurations
const TABLE_CONFIGS = {
  projects: {
    label: 'Projects',
    fields: [
      { key: 'id', label: 'ID', type: 'number', readOnly: true },
      { key: 'title', label: 'Title', type: 'text', required: true },
      { key: 'type', label: 'Type', type: 'text' },
      { key: 'category', label: 'Category', type: 'select', options: ['web2', 'web3'] },
      { key: 'summary', label: 'Summary', type: 'textarea' },
      { key: 'tools', label: 'Tools', type: 'text' },
      { key: 'image_url', label: 'Project Image', type: 'image' },
      { key: 'link', label: 'Project Link', type: 'text' },
      { key: 'github_url', label: 'GitHub URL', type: 'text' },
      { key: 'is_featured', label: 'Featured', type: 'checkbox' },
      { key: 'order_index', label: 'Order', type: 'number' },
    ],
  },
  experiences: {
    label: 'Experiences',
    fields: [
      { key: 'id', label: 'ID', type: 'number', readOnly: true },
      { key: 'position', label: 'Position', type: 'text', required: true },
      { key: 'company', label: 'Company', type: 'text', required: true },
      { key: 'company_link', label: 'Company Link', type: 'text' },
      { key: 'time_period', label: 'Time Period', type: 'text' },
      { key: 'address', label: 'Address', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'order_index', label: 'Order', type: 'number' },
    ],
  },
  skills: {
    label: 'Skills',
    fields: [
      { key: 'id', label: 'ID', type: 'number', readOnly: true },
      { key: 'name', label: 'Name', type: 'text', required: true },
      { key: 'category', label: 'Category', type: 'select', options: ['frontend', 'backend', 'database', 'devops', 'web3', 'general'] },
      { key: 'x_position', label: 'X Position', type: 'text' },
      { key: 'y_position', label: 'Y Position', type: 'text' },
      { key: 'proficiency', label: 'Proficiency (1-5)', type: 'number' },
      { key: 'order_index', label: 'Order', type: 'number' },
    ],
  },
  settings: {
    label: 'Settings',
    primaryKey: 'key',
    fields: [
      { key: 'key', label: 'Key', type: 'text', required: true },
      { key: 'value', label: 'Value', type: 'textarea', required: true },
    ],
  },
  ai_context: {
    label: 'AI Context',
    primaryKey: 'key',
    fields: [
      { key: 'key', label: 'Key', type: 'text', required: true },
      { key: 'value', label: 'Value', type: 'textarea', required: true },
      { key: 'category', label: 'Category', type: 'select', options: ['about', 'personality', 'behavior', 'instructions'] },
    ],
  },
};

// Login Component
const LoginForm = ({ onLogin, error }) => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onLogin(password);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">🔐 Admin Access</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-green-500 focus:outline-none mb-4"
            autoFocus
          />
          {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-400 text-dark font-bold rounded-lg hover:opacity-90 disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

// Data Table Component
const DataTable = ({ table, config, token, onRefresh }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState({ type: '', text: '' });
  const [uploading, setUploading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/${table}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await res.json();
      if (res.ok) {
        setData(result.data || []);
      } else {
        showMessage('error', result.error);
      }
    } catch (err) {
      showMessage('error', 'Failed to fetch data');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [table]);

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({ ...item });
  };

  const handleNew = () => {
    setEditingItem({});
    const initial = {};
    config.fields.forEach(f => {
      if (!f.readOnly) initial[f.key] = f.type === 'checkbox' ? false : '';
    });
    setFormData(initial);
  };

  const handleSave = async () => {
    try {
      const isNew = !formData.id && !formData.key;
      const method = isNew ? 'POST' : 'PUT';
      
      const res = await fetch(`/api/admin/${table}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        showMessage('success', `${isNew ? 'Created' : 'Updated'} successfully!`);
        setEditingItem(null);
        fetchData();
        if (onRefresh) onRefresh();
      } else {
        const err = await res.json();
        showMessage('error', err.error);
      }
    } catch (err) {
      showMessage('error', 'Failed to save');
    }
  };

  const handleDelete = async (item) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    try {
      const res = await fetch(`/api/admin/${table}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: item.id, key: item.key }),
      });

      if (res.ok) {
        showMessage('success', 'Deleted successfully!');
        fetchData();
        if (onRefresh) onRefresh();
      } else {
        const err = await res.json();
        showMessage('error', err.error);
      }
    } catch (err) {
      showMessage('error', 'Failed to delete');
    }
  };

  const renderField = (field) => {
    const value = formData[field.key] ?? '';

    if (field.readOnly) {
      return <span className="text-gray-400">{value || 'Auto-generated'}</span>;
    }

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
            className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-green-500 focus:outline-none"
            rows={3}
          />
        );
      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
            className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-green-500 focus:outline-none"
          >
            <option value="">Select...</option>
            {field.options?.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        );
      case 'checkbox':
        return (
          <input
            type="checkbox"
            checked={!!value}
            onChange={(e) => setFormData({ ...formData, [field.key]: e.target.checked })}
            className="w-5 h-5 rounded bg-gray-700 border-gray-600"
          />
        );
      case 'number':
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => setFormData({ ...formData, [field.key]: parseInt(e.target.value) || 0 })}
            className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-green-500 focus:outline-none"
          />
        );
      case 'image':
        const handleImageUpload = async (e) => {
          const file = e.target.files?.[0];
          if (!file) return;

          setUploading(true);
          try {
            const uploadData = new FormData();
            uploadData.append('image', file);

            const res = await fetch('/api/admin/upload', {
              method: 'POST',
              headers: { Authorization: `Bearer ${token}` },
              body: uploadData,
            });

            const result = await res.json();
            if (res.ok && result.success) {
              setFormData({ ...formData, [field.key]: result.filename });
              showMessage('success', 'Image uploaded!');
            } else {
              showMessage('error', result.error || 'Upload failed');
            }
          } catch (err) {
            showMessage('error', 'Failed to upload image');
          }
          setUploading(false);
        };

        return (
          <div className="space-y-2">
            {/* Current image preview */}
            {value && (
              <div className="flex items-center gap-3">
                <img
                  src={value.startsWith('http') ? value : `/images/projects/${value}`}
                  alt="Preview"
                  className="w-20 h-20 object-cover rounded border border-gray-600"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <span className="text-sm text-gray-400 break-all max-w-xs">
                  {value.startsWith('http') ? 'Supabase Storage' : value}
                </span>
              </div>
            )}
            {/* Upload button */}
            <div className="flex gap-2">
              <label className="flex-1 cursor-pointer">
                <div className={`px-4 py-2 rounded text-center ${uploading ? 'bg-gray-600' : 'bg-blue-600 hover:bg-blue-500'} text-white text-sm`}>
                  {uploading ? 'Uploading...' : '📷 Choose Image'}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="hidden"
                />
              </label>
            </div>
            {/* Manual URL input */}
            <input
              type="text"
              value={value}
              onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
              placeholder="Image URL (auto-filled after upload)"
              className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-green-500 focus:outline-none text-sm"
            />
          </div>
        );
      default:
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
            className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-green-500 focus:outline-none"
          />
        );
    }
  };

  if (loading) {
    return <div className="text-center py-8 text-gray-400">Loading...</div>;
  }

  return (
    <div>
      {/* Message */}
      {message.text && (
        <div className={`mb-4 p-3 rounded ${message.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
          {message.text}
        </div>
      )}

      {/* Edit Modal */}
      {editingItem !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-white mb-4">
              {formData.id || formData.key ? 'Edit' : 'New'} {config.label.slice(0, -1)}
            </h3>
            <div className="space-y-4">
              {config.fields.map((field) => (
                <div key={field.key}>
                  <label className="block text-sm text-gray-400 mb-1">
                    {field.label} {field.required && <span className="text-red-400">*</span>}
                  </label>
                  {renderField(field)}
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSave}
                className="flex-1 py-2 bg-green-500 text-dark font-bold rounded-lg hover:bg-green-400"
              >
                Save
              </button>
              <button
                onClick={() => setEditingItem(null)}
                className="flex-1 py-2 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Button */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-400">{data.length} items</span>
        <button
          onClick={handleNew}
          className="px-4 py-2 bg-green-500 text-dark font-bold rounded-lg hover:bg-green-400"
        >
          + Add New
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-700">
              {config.fields.slice(0, 4).map((field) => (
                <th key={field.key} className="px-4 py-3 text-left text-gray-400 font-medium">
                  {field.label}
                </th>
              ))}
              <th className="px-4 py-3 text-right text-gray-400 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={item.id || item.key || idx} className="border-b border-gray-700/50 hover:bg-gray-800/50">
                {config.fields.slice(0, 4).map((field) => (
                  <td key={field.key} className="px-4 py-3 text-white">
                    {field.type === 'checkbox' 
                      ? (item[field.key] ? '✓' : '✗')
                      : String(item[field.key] || '-').slice(0, 50)}
                    {String(item[field.key] || '').length > 50 && '...'}
                  </td>
                ))}
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => handleEdit(item)}
                    className="px-3 py-1 text-sm bg-blue-500/20 text-blue-400 rounded mr-2 hover:bg-blue-500/30"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
                    className="px-3 py-1 text-sm bg-red-500/20 text-red-400 rounded hover:bg-red-500/30"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.length === 0 && (
        <div className="text-center py-8 text-gray-500">No data found</div>
      )}
    </div>
  );
};

// Main Admin Page
export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTable, setActiveTable] = useState('projects');

  // Check for existing token on mount
  useEffect(() => {
    const savedToken = sessionStorage.getItem('admin_token');
    if (savedToken) {
      try {
        const decoded = JSON.parse(Buffer.from(savedToken, 'base64').toString());
        if (decoded.authenticated && decoded.exp > Date.now()) {
          setToken(savedToken);
          setIsAuthenticated(true);
        }
      } catch {
        sessionStorage.removeItem('admin_token');
      }
    }
  }, []);

  const handleLogin = async (password) => {
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setToken(data.token);
        setIsAuthenticated(true);
        sessionStorage.setItem('admin_token', data.token);
        setAuthError('');
      } else {
        setAuthError(data.error || 'Invalid password');
      }
    } catch (err) {
      setAuthError('Connection error');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setToken('');
    sessionStorage.removeItem('admin_token');
  };

  if (!isAuthenticated) {
    return (
      <>
        <Head>
          <title>Admin Login</title>
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        <LoginForm onLogin={handleLogin} error={authError} />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Admin Dashboard</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="min-h-screen bg-gray-900">
        {/* Header */}
        <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
          <div className="flex justify-between items-center max-w-7xl mx-auto">
            <h1 className="text-xl font-bold text-white">📊 Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30"
            >
              Logout
            </button>
          </div>
        </header>

        <div className="max-w-7xl mx-auto p-6">
          {/* Tabs */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {Object.entries(TABLE_CONFIGS).map(([key, config]) => (
              <button
                key={key}
                onClick={() => setActiveTable(key)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTable === key
                    ? 'bg-green-500 text-dark'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {config.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-4">
              {TABLE_CONFIGS[activeTable].label}
            </h2>
            <DataTable
              key={activeTable}
              table={activeTable}
              config={TABLE_CONFIGS[activeTable]}
              token={token}
            />
          </div>
        </div>
      </div>
    </>
  );
}
