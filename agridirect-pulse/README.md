# AgriDirect Pulse - Production-Ready React 18 PWA

A comprehensive Progressive Web App (PWA) for agricultural direct marketplace, built with React 18, Vite, Tailwind CSS, and offline capabilities using IndexedDB.

## ✨ Features

### Core Features
- **Real-time Price Updates**: Live market prices updated every minute
- **Marketplace Listings**: Browse and post agricultural products
- **Logistics Calculator**: Calculate transportation costs instantly
- **User Authentication**: Phone number + OTP login system
- **Mobile-First Design**: Fully responsive across all devices

### PWA Features
- **Offline Support**: Post listings offline, sync automatically when online
- **Service Worker**: Intelligent caching with CacheFirst for prices and NetworkFirst for listings
- **Install to Home Screen**: Add to home screen like a native app
- **Works Offline**: Critical functionality works without internet
- **Fast Load Times**: Optimized bundles and code splitting

### Security Features
- **JWT Authentication**: Memory-based token storage (not localStorage)
- **Request Interceptors**: Automatic token attachment and 401 redirect handling
- **Encrypted Communication**: Ready for HTTPS in production

## 📋 Prerequisites

- Node.js 16+ and npm 7+
- Modern browser with PWA support (Chrome, Firefox, Safari, Edge)

Visit `http://localhost:5173` in your browser.

## 📁 Project Structure

```
src/
├── api/
│   └── axiosInstance.js       # Axios with JWT interceptor
├── components/
│   ├── Navbar.jsx             # Navigation bar
│   ├── PriceCard.jsx          # Price display card
│   ├── ListingCard.jsx        # Marketplace listing card
│   └── LogisticsForm.jsx      # Cost calculator form
├── pages/
│   ├── Home.jsx               # Hero & stats dashboard
│   ├── Prices.jsx             # Market prices page
│   ├── Marketplace.jsx        # Listings grid
│   ├── Calculator.jsx         # Logistics calculator
│   └── Login.jsx              # Phone + OTP auth
├── hooks/
│   ├── usePrices.js           # React Query hook for prices
│   ├── useListings.js         # React Query hook for listings
│   └── useOfflineQueue.js     # Offline sync hook
├── utils/
│   └── offlineQueue.js        # IndexedDB queue management
├── App.jsx                    # Main router
├── main.jsx                   # Entry point
├── index.css                  # Tailwind + globals
└── index.html                 # PWA metadata

public/
├── icon-192x192.png           # App icon (small)
├── icon-512x512.png           # App icon (large)
├── icon-192x192-maskable.png # Adaptive icon
├── screenshot1.png            # Mobile screenshot
└── screenshot2.png            # Desktop screenshot
```
### Axios Instance
- Base URL: `http://localhost:8080`
- Timeout: 10 seconds
- JWT auto-attached via interceptor
- Response error handling

## 🔍 Performance Optimizations

1. **Code Splitting**: React, Routing, and Query in separate chunks
2. **Service Worker**: Intelligent caching strategy
3. **React Query**: Request deduplication and caching
4. **Image Optimization**: Placeholder service for demo
5. **CSS Purging**: Tailwind removes unused styles

## 🚨 Security Considerations

1. **JWT Storage**: Memory-only to prevent XSS attacks
2. **HTTPS Required**: In production (enforced by PWA)
3. **API Validation**: Server should validate all inputs
4. **CORS**: Configure in backend as needed
5. **CSP Headers**: Add in production deployment

## 📈 Scalability

### Recommended Backend Stack
- Node.js + Express or similar
- PostgreSQL for persistence
- Redis for caching
- Docker for deployment
- AWS/Azure for hosting

### Production Checklist
- [ ] Update API base URL from localhost:8080
- [ ] Generate real app icons (192x192, 512x512)
- [ ] Add real screenshots
- [ ] Enable HTTPS
- [ ] Configure CORS properly
- [ ] Set up error tracking (Sentry)
- [ ] Add analytics
- [ ] Test on real devices
- [ ] Submit to Google Play Store / App Store

## 🎯 Roadmap

- [ ] Real payment integration
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Video streaming for products
- [ ] Blockchain for transparency
- [ ] AI-powered price predictions
- [ ] Farmer network features
- [ ] Export to CSV/PDF

---

**Built with ❤️ for farmers and agricultural communities**
