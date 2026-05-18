#!/bin/bash

# Exit on error
set -e

echo "Running tests..."
npm test

echo "Building project..."
npm run build

echo "Updating version..."
# npm version patch # Uncomment to automatically bump version

echo "Pushing to GitHub..."
git push origin main --tags

echo "Publishing to npm..."
# npm publish # Uncomment to actually publish

echo "Done!"
