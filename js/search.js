/* Client-side Search Functionality for DTC Eligibility Project */

// The document/term index itself lives in search-index.js (auto-generated,
// declared there as `const searchIndex = [...]`). Load search-index.js
// BEFORE this file. This file only implements the query/render/wire-up
// logic on top of that shared index — it must not redeclare `searchIndex`
// itself, or the second <script> tag throws a redeclaration error and both
// scripts fail to run.

// Perform search query
function performSearch(query) {
  if (!query || query.trim() === '') {
    return [];
  }

  const normalizedQuery = query.toLowerCase().trim();
  const results = [];

  searchIndex.forEach(doc => {
    // Search in title, description, and keywords
    const titleMatch = doc.title.toLowerCase().includes(normalizedQuery);
    const descMatch = doc.description.toLowerCase().includes(normalizedQuery);
    const keywordMatch = doc.keywords.some(keyword => 
      keyword.toLowerCase().includes(normalizedQuery)
    );

    if (titleMatch || descMatch || keywordMatch) {
      // Calculate relevance score
      let score = 0;
      if (titleMatch) score += 10;
      if (descMatch) score += 5;
      if (keywordMatch) score += 3;
      
      // Bonus for exact matches
      if (doc.title.toLowerCase() === normalizedQuery) score += 20;
      
      results.push({
        ...doc,
        score: score
      });
    }
  });

  // Sort by relevance score
  results.sort((a, b) => b.score - a.score);

  return results;
}

// Display search results
function displaySearchResults(results, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = '';

  if (results.length === 0) {
    container.innerHTML = `
      <div class="search-no-results">
        <p>No results found. Try different keywords.</p>
      </div>
    `;
    return;
  }

  const resultsList = document.createElement('div');
  resultsList.className = 'search-results-list';

  results.forEach(result => {
    const resultItem = document.createElement('div');
    resultItem.className = 'search-result-item';
    resultItem.innerHTML = `
      <h3 class="search-result-title">
        <a href="${result.url}">${result.title}</a>
      </h3>
      <p class="search-result-description">${result.description}</p>
      <div class="search-result-meta">
        <span class="search-result-keywords">${result.keywords.join(', ')}</span>
      </div>
    `;
    resultsList.appendChild(resultItem);
  });

  container.appendChild(resultsList);
}

// Setup search functionality
function setupSearch(searchInputId, resultsContainerId) {
  const searchInput = document.getElementById(searchInputId);
  if (!searchInput) return;

  let searchTimeout;

  searchInput.addEventListener('input', function(e) {
    clearTimeout(searchTimeout);
    
    const query = e.target.value;
    
    // Debounce search to improve performance
    searchTimeout = setTimeout(() => {
      const results = performSearch(query);
      displaySearchResults(results, resultsContainerId);
    }, 300);
  });

  // Clear results on escape
  searchInput.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      this.value = '';
      const container = document.getElementById(resultsContainerId);
      if (container) container.innerHTML = '';
    }
  });
}

// Initialize search when DOM is ready
function initSearchUI() {
  if (typeof searchIndex === 'undefined') {
    console.error('search.js: `searchIndex` is not defined — make sure search-index.js is included before search.js.');
    return;
  }
  setupSearch('search-input', 'search-results');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSearchUI);
} else {
  initSearchUI();
}