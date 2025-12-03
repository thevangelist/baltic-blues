# Baltic Blues

A stealth-based strategy game where you navigate the Baltic Sea on a covert mission to disrupt undersea communication cables while avoiding detection by patrol vessels.

## Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## Deployment

This project is automatically deployed to GitHub Pages when you push to the `master` branch.

### Automatic Deployment (Recommended)
The GitHub Actions workflow (`.github/workflows/deploy.yml`) automatically:
1. Builds the project on every push to `master`
2. Deploys the `dist` folder to GitHub Pages
3. Makes the game available at `https://<username>.github.io/baltic-blues`

### Manual Deployment
If you need to deploy manually:

```bash
# Build the project
npm run build

# Deploy to gh-pages branch
npm run deploy
```

**Note:** Manual deployment requires committing the `dist` folder temporarily or using the `gh-pages` package which handles this automatically.

## GitHub Pages Setup

To enable GitHub Pages for this repository:
1. Go to repository Settings → Pages
2. Under "Build and deployment" → Source, select "GitHub Actions"
3. The workflow will automatically deploy on the next push to `master`

