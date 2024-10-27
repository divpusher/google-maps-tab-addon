(function() {
  // Wait for the page to fully load
  window.addEventListener('load', function() {
    // Fetch translations
    fetch(chrome.runtime.getURL('translations.json'))
      .then(response => {
        return response.json();
      })
      .then(translations => {
        // Get the language from the HTML element
        const lang = document.documentElement.lang || 'en';
        const mapText = translations[lang] || translations['en'];
            
        // Find the tab bar element
        const tabBar = document.querySelector('div[role="list"]');

        if (tabBar) {
          const mapsTab = document.createElement('div');
          mapsTab.role = 'listitem';

          const link = document.createElement('a');
          link.href = `https://www.google.com/maps/search/${encodeURIComponent(document.querySelector('input[name="q"]').value)}`;

          // Copy class names from the next list item "a" element
          const nextListItem = tabBar.children[1];
          if (nextListItem) {
            const nextLink = nextListItem.querySelector('a');
            if (nextLink) {
              link.className = nextLink.className;
            }
          }

          const textDiv = document.createElement('div');
          textDiv.textContent = mapText;

          // Copy class names from the next list item "a > div" element
          if (nextListItem) {
            const nextDiv = nextListItem.querySelector('a > div');
            if (nextDiv) {
              textDiv.className = nextDiv.className;
            }
          }

          link.appendChild(textDiv);
          mapsTab.appendChild(link);

          // Insert the Maps tab as the second item in the list
          if (tabBar.children.length > 1) {
            tabBar.insertBefore(mapsTab, tabBar.children[1]);
          } else {
            tabBar.appendChild(mapsTab);
          }
        }
      });
    });
})();
