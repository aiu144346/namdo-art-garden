// Utility to manage custom published notices, press releases, and articles
const STORAGE_KEYS = {
  NOTICES: 'namdo_admin_custom_notices',
  PRESS: 'namdo_admin_custom_press',
  POSTS: 'namdo_admin_custom_posts',
  AUTH: 'namdo_admin_auth_session'
};

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
    id: `custom-notice-${Date.now()}`,
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
    id: `custom-press-${Date.now()}`,
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
