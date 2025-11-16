# Deployment Guide

## Quick Start

The Classroom is a static web application that can be deployed anywhere that serves HTML files.

## Local Development

### Option 1: Python HTTP Server
```bash
python3 -m http.server 8080
# Open http://localhost:8080/index.html
```

### Option 2: Node.js HTTP Server
```bash
npx http-server -p 8080
# Open http://localhost:8080/index.html
```

### Option 3: PHP Built-in Server
```bash
php -S localhost:8080
# Open http://localhost:8080/index.html
```

## Static Hosting Platforms

### GitHub Pages
1. Push your code to a GitHub repository
2. Go to Settings > Pages
3. Select the branch to deploy from
4. Your site will be available at `https://username.github.io/repository-name/`

### Netlify
1. Sign up at https://netlify.com
2. Drag and drop your project folder
3. Your site will be live instantly with a unique URL

### Vercel
1. Sign up at https://vercel.com
2. Import your GitHub repository
3. Deploy with zero configuration

### AWS S3 + CloudFront
1. Create an S3 bucket
2. Enable static website hosting
3. Upload all files (index.html, styles.css, app.js, README.md)
4. Configure CloudFront for CDN delivery

### Google Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

### Azure Static Web Apps
1. Sign in to Azure Portal
2. Create a Static Web App
3. Connect your GitHub repository
4. Configure build settings (no build needed for this project)

## Web Server Configuration

### Apache (.htaccess)
```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</IfModule>
```

### Nginx
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/the-classroom;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## Requirements

- No server-side processing required
- No database needed
- No external dependencies
- Works with any modern web browser
- Fully client-side application

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## File Upload Limits

The application uses the browser's FileReader API which has these considerations:
- File size is limited by browser memory
- Recommended maximum file size: 10MB per file
- Multiple files can be uploaded simultaneously
- Files are processed client-side only (never sent to a server)

## Security Considerations

- All file processing happens in the browser
- No data is sent to external servers
- No cookies or tracking
- No personal data collection
- Safe for sensitive study materials

## Performance Tips

1. **For best performance:**
   - Use files under 5MB
   - Prefer plain text over PDFs
   - Use structured content with headers

2. **Optimization:**
   - Files are already minified (single-file architecture)
   - No build step required
   - Fast loading times

## Troubleshooting

### Files not uploading?
- Check browser console for errors
- Ensure file types are supported (.txt, .md, .pdf, images)
- Try with smaller files

### Learning plan not generating?
- Ensure you've selected a learning method
- Verify file contains text content
- Check that upload completed successfully

### Browser compatibility issues?
- Update to the latest browser version
- Try a different modern browser
- Disable browser extensions temporarily

## Customization

To customize the classroom theme:
1. Edit `styles.css` for colors and styling
2. Modify `app.js` for behavior changes
3. Update `index.html` for structure changes

No build process required - changes are immediate!
