// Utility to manage custom published notices, press releases, articles, and admin security settings
const STORAGE_KEYS = {
  NOTICES: 'namdo_admin_custom_notices',
  PRESS: 'namdo_admin_custom_press',
  POSTS: 'namdo_admin_custom_posts',
  AUTH: 'namdo_admin_auth_session',
  CONFIG: 'namdo_admin_account_config'
};

const DEFAULT_CONFIG = {
  adminId: 'admin',
  adminPw: 'namdo2026!',
  adminPath: '/admin'
};

// ---------------- Admin Config & Security ----------------
export const getAdminConfig = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CONFIG);
    if (!data) return DEFAULT_CONFIG;
    const parsed = JSON.parse(data);
    return {
      adminId: parsed.adminId || DEFAULT_CONFIG.adminId,
      adminPw: parsed.adminPw || DEFAULT_CONFIG.adminPw,
      adminPath: parsed.adminPath ? (parsed.adminPath.startsWith('/') ? parsed.adminPath : `/${parsed.adminPath}`) : DEFAULT_CONFIG.adminPath
    };
  } catch (e) {
    console.error('Failed to load admin config:', e);
    return DEFAULT_CONFIG;
  }
};

export const saveAdminConfig = (newConfig) => {
  const current = getAdminConfig();
  let sanitizedPath = (newConfig.adminPath || current.adminPath).trim();
  if (!sanitizedPath.startsWith('/')) sanitizedPath = `/${sanitizedPath}`;
  sanitizedPath = sanitizedPath.replace(/\s+/g, '-').toLowerCase();

  const updated = {
    adminId: (newConfig.adminId || current.adminId).trim(),
    adminPw: (newConfig.adminPw || current.adminPw).trim(),
    adminPath: sanitizedPath || '/admin'
  };

  localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(updated));
  return updated;
};

export const resetAdminConfig = () => {
  localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(DEFAULT_CONFIG));
  return DEFAULT_CONFIG;
};

export const validateAdminLogin = (inputUsername, inputPassword) => {
  const config = getAdminConfig();
  return (
    inputUsername.trim() === config.adminId &&
    inputPassword.trim() === config.adminPw
  );
};

// ---------------- Notices Management ----------------
export const getCustomNotices = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.NOTICES);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Failed to load custom notices:', e);
    return [];
  }
};

export const saveCustomNotice = (notice) => {
  const current = getCustomNotices();
  const newNotice = {
    ...notice,
    id: notice.id || `custom-notice-${Date.now()}`,
    createdAt: new Date().toISOString()
  };
  const updated = [newNotice, ...current];
  localStorage.setItem(STORAGE_KEYS.NOTICES, JSON.stringify(updated));
  return newNotice;
};

export const deleteCustomNotice = (id) => {
  const current = getCustomNotices();
  const updated = current.filter(item => item.id !== id);
  localStorage.setItem(STORAGE_KEYS.NOTICES, JSON.stringify(updated));
  return updated;
};

// ---------------- Press Releases Management ----------------
export const getCustomPress = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PRESS);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Failed to load custom press:', e);
    return [];
  }
};

export const saveCustomPress = (press) => {
  const current = getCustomPress();
  const newPress = {
    ...press,
    id: press.id || `custom-press-${Date.now()}`,
    createdAt: new Date().toISOString()
  };
  const updated = [newPress, ...current];
  localStorage.setItem(STORAGE_KEYS.PRESS, JSON.stringify(updated));
  return newPress;
};

export const deleteCustomPress = (id) => {
  const current = getCustomPress();
  const updated = current.filter(item => item.id !== id);
  localStorage.setItem(STORAGE_KEYS.PRESS, JSON.stringify(updated));
  return updated;
};

// ---------------- Editorial Posts Management ----------------
export const getCustomPosts = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.POSTS);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Failed to load custom posts:', e);
    return [];
  }
};

export const saveCustomPost = (post) => {
  const current = getCustomPosts();
  const newPost = {
    ...post,
    id: post.id || `custom-post-${Date.now()}`,
    createdAt: new Date().toISOString()
  };
  const updated = [newPost, ...current.filter(p => p.id !== newPost.id)];
  localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(updated));
  return newPost;
};

export const deleteCustomPost = (id) => {
  const current = getCustomPosts();
  const updated = current.filter(item => item.id !== id);
  localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(updated));
  return updated;
};

// ---------------- Session Auth ----------------
export const getAdminAuth = () => {
  try {
    const auth = sessionStorage.getItem(STORAGE_KEYS.AUTH);
    return auth ? JSON.parse(auth) : null;
  } catch (e) {
    return null;
  }
};

export const setAdminAuth = (authData) => {
  sessionStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(authData));
};

export const clearAdminAuth = () => {
  sessionStorage.removeItem(STORAGE_KEYS.AUTH);
};
