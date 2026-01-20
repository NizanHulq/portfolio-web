import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Fetch all experiences ordered by order_index
 */
export async function getExperiences() {
  const { data, error } = await supabase
    .from('experiences')
    .select('*')
    .order('order_index', { ascending: true });
  
  if (error) {
    console.error('Error fetching experiences:', error);
    return [];
  }
  return data;
}

/**
 * Fetch all projects with optional category filter
 * @param {string|null} category - 'web2', 'web3', or null for all
 */
export async function getProjects(category = null) {
  let query = supabase
    .from('projects')
    .select('*')
    .order('order_index', { ascending: true });
  
  if (category) {
    query = query.eq('category', category);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
  return data;
}

/**
 * Fetch featured projects only
 */
export async function getFeaturedProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('is_featured', true)
    .order('order_index', { ascending: true });
  
  if (error) {
    console.error('Error fetching featured projects:', error);
    return [];
  }
  return data;
}

/**
 * Get a setting value by key
 * @param {string} key - Setting key (e.g., 'cv_link', 'whatsapp_number')
 */
export async function getSetting(key) {
  const { data, error } = await supabase
    .from('settings')
    .select('value')
    .eq('key', key)
    .single();
  
  if (error) {
    console.error(`Error fetching setting ${key}:`, error);
    return null;
  }
  return data?.value;
}

/**
 * Get multiple settings at once
 * @param {string[]} keys - Array of setting keys
 */
export async function getSettings(keys) {
  const { data, error } = await supabase
    .from('settings')
    .select('key, value')
    .in('key', keys);
  
  if (error) {
    console.error('Error fetching settings:', error);
    return {};
  }
  
  // Convert array to object { key: value }
  return data.reduce((acc, item) => {
    acc[item.key] = item.value;
    return acc;
  }, {});
}

/**
 * Fetch all skills ordered by order_index
 */
export async function getSkills() {
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .order('order_index', { ascending: true });
  
  if (error) {
    console.error('Error fetching skills:', error);
    return [];
  }
  return data;
}

/**
 * Get AI context by category
 * @param {string|null} category - 'about', 'personality', 'behavior', 'instructions', or null for all
 */
export async function getAIContext(category = null) {
  let query = supabase
    .from('ai_context')
    .select('*');
  
  if (category) {
    query = query.eq('category', category);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching AI context:', error);
    return [];
  }
  return data;
}

/**
 * Get all AI context as a key-value object
 */
export async function getAllAIContext() {
  const { data, error } = await supabase
    .from('ai_context')
    .select('key, value, category');
  
  if (error) {
    console.error('Error fetching AI context:', error);
    return {};
  }
  
  // Convert to nested object by category
  const result = {};
  data.forEach(item => {
    if (!result[item.category]) {
      result[item.category] = {};
    }
    result[item.category][item.key] = item.value;
  });
  
  return result;
}
