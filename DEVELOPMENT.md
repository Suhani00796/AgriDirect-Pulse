# AgriDirect Pulse - Development Guide

## Environment Setup

### Prerequisites
```bash
Node.js 16+
npm 7+
```

### Initial Setup
```bash
# Clone repository
git clone https://github.com/yourusername/AgriDirect-Pulse.git
cd AgriDirect-Pulse/agridirect-pulse

# Install dependencies
npm install --legacy-peer-deps

# Start dev server
npm run dev
```

## Connecting to Backend API

### Update API Base URL

Edit `src/api/axiosInstance.js`:

```javascript
const axiosInstance = axios.create({
  baseURL: 'https://your-api.com', // Change this
  timeout: 10000,
});
```

### Environment Variables

Create `.env.local`:

```
VITE_API_URL=http://localhost:8080
VITE_APP_NAME=AgriDirect Pulse
VITE_ENABLE_ANALYTICS=false
```

Use in code:

```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

## Mock Backend for Development

### Using json-server

```bash
npm install -D json-server

# Create db.json
cat > db.json << 'EOF'
{
  "prices": [
    { "id": 1, "crop": "Wheat", "price": 2450, "district": "Punjab", "change": 2.5 },
    { "id": 2, "crop": "Rice", "price": 3200, "district": "Bihar", "change": -1.0 }
  ],
  "listings": [
    { "id": 1, "crop": "Tomato", "location": "Mumbai", "price": 45, "quantity": 50, "unit": "kg" }
  ]
}
EOF

# Start server
npx json-server --watch db.json --port 8080
```

### Mock Authentication

Update `src/api/axiosInstance.js`:

```javascript
// Mock login response
export const mockLogin = (phone) => {
  const mockToken = 'mock-jwt-' + phone;
  setJWT(mockToken);
  return mockToken;
};
```

## Component Development

### Creating a New Component

```javascript
// src/components/NewComponent.jsx
export const NewComponent = ({ prop1, prop2 }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h1 className="text-xl font-bold">{prop1}</h1>
      <p className="text-gray-600">{prop2}</p>
    </div>
  );
};
```

### Using Tailwind Classes

```javascript
// Mobile-first approach
<div className="
  p-4                    // padding
  sm:p-6                 // tablet+
  md:p-8                 // desktop+
  bg-white               // background
  rounded-lg             // border-radius
  shadow-md              // box-shadow
  hover:shadow-lg        // hover state
  transition             // smooth animation
">
```

## Adding New Pages

1. Create file: `src/pages/NewPage.jsx`
2. Export component
3. Add route in `src/App.jsx`:

```javascript
import { NewPage } from './pages/NewPage';

<Route path="/new-page" element={<NewPage />} />
```

## State Management

### Using React Query

```javascript
import { useQuery, useMutation } from 'react-query';

// Fetching data
const { data, isLoading, error } = useQuery(
  'key',
  async () => {
    const res = await axiosInstance.get('/api/data');
    return res.data;
  }
);

// Mutations (POST, PUT, DELETE)
const { mutate, isLoading } = useMutation(
  async (data) => {
    return await axiosInstance.post('/api/data', data);
  },
  {
    onSuccess: () => alert('Success!'),
    onError: () => alert('Error!'),
  }
);
```

### Offline State

```javascript
import { useOfflineQueue } from './hooks/useOfflineQueue';

const { queueCount } = useOfflineQueue();

// Show pending posts
{queueCount > 0 && <Badge>{queueCount} pending</Badge>}
```

## Debugging

### React DevTools
```bash
# Install Chrome Extension
# Open DevTools -> React tab
# Inspect component state and props
```

### Network Tab
1. Open DevTools → Network
2. Filter by XHR/API
3. Check request/response
4. Monitor caching behavior

### Service Worker
1. DevTools → Application → Service Workers
2. Check registration status
3. View cache storage
4. Test offline functionality

## Testing Offline Features

### Method 1: DevTools
1. F12 → Network
2. Check "Offline"
3. Try posting listing
4. Check IndexedDB: Application → IndexedDB → offline-queue

### Method 2: Chrome DevTools Throttling
1. Network → Slow 3G
2. Simulate real-world conditions
3. Test service worker behavior

## Build and Deployment

### Production Build
```bash
npm run build

# Output in dist/
# ~50KB main bundle (with compression)
```

### Preview Locally
```bash
npm run preview

# Visit http://localhost:4173
```

### Deploy to Vercel
```bash
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### Deploy to Netlify
```bash
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod --dir=dist
```

## Performance Optimization

### Lighthouse Audit
1. DevTools → Lighthouse
2. Generate report
3. Fix issues:
   - Images: Use WebP
   - Fonts: System fonts
   - Code: Tree-shaking enabled

### Bundle Analysis
```bash
npm install -D rollup-plugin-visualizer

# Check vite.config.js for config
npm run build

# Open dist/stats.html
```

## Common Issues & Solutions

### Issue: npm install fails
```bash
# Use legacy peer deps
npm install --legacy-peer-deps
```

### Issue: Vite HMR not working
Update `vite.config.js`:
```javascript
export default {
  server: {
    middlewareMode: true,
  }
}
```

### Issue: Service Worker not updating
```bash
# In browser
navigator.serviceWorker.getRegistrations().then(regs => {
  regs.forEach(reg => reg.unregister());
});

# Hard refresh: Ctrl+Shift+R
```

### Issue: IndexedDB data not syncing
Check:
1. Browser is online (not offline)
2. API endpoint is correct
3. JWT token is valid
4. Check browser console for errors

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes
git add .
git commit -m "Add new feature"

# Push to GitHub
git push origin feature/new-feature

# Create Pull Request on GitHub

# After merge
git checkout main
git pull origin main
```

## IDE Setup

### VS Code Extensions
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- Prettier - Code formatter
- ESLint
- REST Client

### Settings (`.vscode/settings.json`)
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

## Resources

- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [React Query](https://tanstack.com/query/latest)
- [PWA Docs](https://web.dev/progressive-web-apps)
