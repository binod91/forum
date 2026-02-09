const forumLatest =
  'https://cdn.freecodecamp.org/curriculum/forum-latest/latest.json';
const forumTopicUrl = 'https://forum.freecodecamp.org/t/';
const forumCategoryUrl = 'https://forum.freecodecamp.org/c/';
const avatarUrl = 'https://cdn.freecodecamp.org/curriculum/forum-latest';

const allCategories = {
  299: { category: 'Career Advice', className: 'career' },
  409: { category: 'Project Feedback', className: 'feedback' },
  417: { category: 'freeCodeCamp Support', className: 'support' },
  421: { category: 'JavaScript', className: 'javascript' },
  423: { category: 'HTML - CSS', className: 'html-css' },
  424: { category: 'Python', className: 'python' },
  432: { category: 'You Can Do This!', className: 'motivation' },
  560: { category: 'Backend Development', className: 'backend' }
};


const timeAgo = (isoString) => {
  const pastDate = new Date(isoString);
  const now = new Date();
  const msElapsed = now - pastDate;

  const minutes = Math.floor(msElapsed / 60000);
  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours}h ago`;
  }

  const days = Math.floor(hours / 24);
  return `${days}d ago`;
};

// view count

const viewCount = (int) => {
  const n = Number(int) || 0;
  if (n >= 1000) return `${Math.floor(n / 1000)}k`;
  return String(n);
};

// Build joined avatar <img> elements from posters and users arrays
const avatars = (posters = [], users = []) => {
  return posters
    .map((p) => {
      const user = users.find((u) => u.id === p.user_id);
      if (!user) return '';

      let template = user.avatar_template || '';
      // replace {size} with 30 when present
      if (template.includes('{size}')) template = template.replace(/\{size\}/g, '30');

      // If template is a relative path (doesn't start with http or //), prefix with avatarUrl
      const isAbsolute = /^(https?:)?\/\//i.test(template);
      const src = isAbsolute ? template : `${avatarUrl}/${template.replace(/^\/+/, '')}`;

      const alt = user.name || '';
      return `<img src="${src}" alt="${escapeHtml(alt)}">`;
    })
    .join('');
};

// small helper to escape HTML in alt text
const escapeHtml = (str) => String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

const forumCategory = (id) => {
  // Check if the id exists in allCategories
  if (allCategories.hasOwnProperty(id)) {
    const { category, className } = allCategories[id];
    return `<a class="category ${className}" href="${forumCategoryUrl}${className}/${id}">${category}</a>`;
  }

  // Fallback: If the id is NOT found, use these "General" defaults
  const category = "General";
  const className = "general";
  
  return `<a class="category ${className}" href="${forumCategoryUrl}${className}/${id}">${category}</a>`;
};


