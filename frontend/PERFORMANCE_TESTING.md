# Quick Performance Testing Guide

## How to Test the Optimizations

### 1. Build and Run
```bash
cd frontend
npm run build
npm run preview
```

### 2. Mobile Testing (Chrome DevTools)
1. Open Chrome DevTools (F12)
2. Click the device toolbar icon (Ctrl+Shift+M)
3. Select a mobile device (e.g., iPhone 12 Pro)
4. Enable CPU throttling: Performance tab → CPU: 4x slowdown
5. Navigate through the site and observe smoothness

### 3. Performance Profiling
1. Open DevTools → Performance tab
2. Click Record (Ctrl+E)
3. Scroll through the homepage
4. Stop recording after 5-10 seconds
5. Look for:
   - **FPS**: Should be consistently at 60fps
   - **Main thread**: Should have minimal long tasks (yellow blocks)
   - **Rendering**: Should show efficient paint/composite operations

### 4. Network Testing
1. DevTools → Network tab
2. Enable "Disable cache"
3. Set throttling to "Slow 3G"
4. Reload page
5. Check:
   - **Initial load time**: Should be < 3s on Slow 3G
   - **Largest Contentful Paint (LCP)**: Should be < 2.5s
   - **First Input Delay (FID)**: Should be < 100ms
   - **Cumulative Layout Shift (CLS)**: Should be < 0.1

### 5. Lighthouse Audit
1. Open DevTools → Lighthouse tab
2. Select "Mobile" device
3. Select "Performance" category
4. Click "Generate report"
5. Target scores:
   - **Performance**: > 90
   - **Accessibility**: > 95
   - **Best Practices**: > 90

### 6. Real Device Testing
Test on actual devices for the most accurate results:
- **Android**: Chrome on Samsung/Pixel devices
- **iOS**: Safari on iPhone
- Test with both WiFi and mobile data

### 7. Compare Before/After
Key metrics to compare:
- **Particle count**: 40 → 10-20 (50-75% reduction)
- **Smooth scroll**: Disabled on mobile (100% overhead removed)
- **Animation complexity**: Simplified on mobile
- **Bundle size**: Reduced through code splitting
- **Initial load time**: Should be 30-40% faster
- **Scroll FPS**: Should maintain 60fps

### 8. Accessibility Testing
1. Enable "Reduce Motion" in your OS
2. Verify animations are simplified or disabled
3. Test keyboard navigation
4. Test screen reader compatibility

## Expected Results
- ✅ Smooth 60fps scrolling on mobile
- ✅ No lag during animations
- ✅ Fast initial page load
- ✅ Responsive interactions
- ✅ No layout shifts
- ✅ Proper reduced motion support

## If Issues Persist
1. Clear browser cache
2. Hard reload (Ctrl+Shift+R)
3. Check console for errors
4. Verify all dependencies are installed
5. Test in incognito mode
6. Try different browsers
