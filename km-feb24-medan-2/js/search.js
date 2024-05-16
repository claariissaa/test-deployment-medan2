const form = document.querySelector('form');
const filter = document.getElementById('searchInput');
const items = document.querySelectorAll('h2, h5, p'); // Add selectors for the sections you want to include in the search

form.addEventListener('submit', (e) => {
  e.preventDefault(); 
  filterData(filter.value);
});

function filterData(search) {
  items.forEach((item) => {
    if (item.innerText.toLowerCase().includes(search.toLowerCase())) {
      item.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}
