module.exports = {
    branches: ['main'],
    repositoryUrl: 'https://github.com/anilkumarswain140/RecipeAppReactJs.git', // Ensure this URL is correct
    plugins: [
      '@semantic-release/commit-analyzer',
      '@semantic-release/release-notes-generator',
      '@semantic-release/changelog',
      '@semantic-release/github',
      '@semantic-release/npm',
    ],
  };