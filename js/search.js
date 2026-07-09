/* Client-side Search Functionality for DTC Eligibility Project */

// Search index - will be populated with content from all documents
let searchIndex = [];

// Initialize search index with document content
function initializeSearchIndex() {
  // Define the documents and their content
  const documents = [
    {
      id: 'index',
      title: 'DTC Documents Collection',
      url: 'index.html',
      description: 'Main navigation and document collection index',
      keywords: ['dtc', 'depository trust company', 'documents', 'index', 'navigation', 'teaching materials', 'forms', 'guides']
    },
    {
      id: 'dtc-guide',
      title: 'Securities Ownership Wizard — DTC Teaching Guide',
      url: 'guides/dtc-guide.html',
      description: 'Comprehensive teaching guide for DTC, DTCC & Cede & Co. securities infrastructure with interactive concept maps',
      keywords: ['dtc', 'dtcc', 'cede & co', 'securities', 'ownership', 'clearing', 'settlement', 'broker', 'participant', 'nominee', 'book-entry', 'concept map', 'concept maps', 'euroclear', 't2s', 'nscc', 'ficc', 'ownership stack', 'street name', 'drs', 'collateral bridge']
    },
    {
      id: 'sf28-guide',
      title: 'SF 28 — Affidavit of Individual Surety Teaching Guide',
      url: 'guides/sf28-teaching-guide.html',
      description: 'Enhanced teaching guide for SF 28 Affidavit of Individual Surety form',
      keywords: ['sf 28', 'affidavit', 'individual surety', 'bond', 'guarantee', 'teaching guide', 'form']
    },
    {
      id: 'questionnaire',
      title: 'DTC Eligibility Questionnaire',
      url: 'forms/dtc-eligibility-questionnaire.html',
      description: 'Interactive eligibility assessment tool for DTC requirements with eligibility path concept map',
      keywords: ['questionnaire', 'eligibility', 'assessment', 'requirements', 'operational arrangements', 'quiz', 'concept map', 'fast', 'transfer agent', 'letter of representations']
    },
    {
      id: 'treasury',
      title: 'Treasury International Bill of Exchange',
      url: 'docs/treasury-international_bill_of_exchange.html',
      description: 'Technical documentation for international bill of exchange transactions',
      keywords: ['treasury', 'bill of exchange', 'international', 'trade finance', 'documentary collection', 'payment']
    },
    {
      id: 'biblical',
      title: 'DTC Biblical Exegesis',
      url: 'docs/dtc-biblical-exegesis.html',
      description: 'Theological analysis of DTC documents through Hebrew gematria and biblical typology',
      keywords: ['biblical', 'exegesis', 'theology', 'hebrew', 'gematria', 'typology', 'sacred architecture', 'religious analysis']
    }
  ];

  searchIndex = documents;
}

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
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    initializeSearchIndex();
    setupSearch('search-input', 'search-results');
  });
} else {
  initializeSearchIndex();
  setupSearch('search-input', 'search-results');
}