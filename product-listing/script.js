const products = [
  {
    title: "T-Shirt",
    category: "Clothing",
    price: 19.99,
    rating: 4.5,
    image: "tshirt.jpg"
  },
  {
    title: "Laptop",
    category: "Electronics",
    price: 799.99,
    rating: 4.8,
    image: "laptop.jpg"
  },
  {
    title: "Novel",
    category: "Books",
    price: 12.99,
    rating: 4.2,
    image: "novels.jpg"
  },
  {
    title: "Watch",
    category: "Accessories",
    price: 49.99,
    rating: 4.6,
    image: "watch.jpg"
  },
  {
    title: "Chair",
    category: "Furniture",
    price: 89.99,
    rating: 4.3,
    image: "chair.jpg"
  },
  {
    title: "Protein Powder",
    category: "Fitness",
    price: 39.99,
    rating: 4.1,
    image: "protien powder.jpg"
  },
  {
    title: "Notebook",
    category: "Books",
    price: 7.99,
    rating: 4.0,
    image: "notebooks.jpg"
  },
  {
    title: "Apples",
    category: "Groceries",
    price: 3.49,
    rating: 4.4,
    image: "apples.jpg"
  },
  {
    title: "Tablet",
    category: "Electronics",
    price: 299.99,
    rating: 4.6,
    image: "tablet.jpg"
  },
  {
    title: "Sweater",
    category: "Clothing",
    price: 29.99,
    rating: 4.3,
    image: "sweater.jpg"
  }
];

const list = document.getElementById('product-list');
const search = document.getElementById('search');
const filter = document.getElementById('category-filter');
const sort = document.getElementById('sort-options');
const themeToggle = document.getElementById('theme-toggle');

document.addEventListener('DOMContentLoaded', () => {
  loadTheme();
  renderProducts(products);
});

search.addEventListener('input', updateDisplay);
filter.addEventListener('change', updateDisplay);
sort.addEventListener('change', updateDisplay);

function updateDisplay() {
  let filtered = [...products];
  const keyword = search.value.toLowerCase();

  if (keyword) {
    filtered = filtered.filter(p =>
      p.title.toLowerCase().includes(keyword)
    );
  }

  const category = filter.value;
  if (category !== "All") {
    filtered = filtered.filter(p => p.category === category);
  }

  const sortType = sort.value;
  if (sortType === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortType === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortType === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  renderProducts(filtered);
}

function renderProducts(productArray) {
  list.innerHTML = "";
  productArray.forEach(product => {
    const card = document.createElement('div');
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}" class="product-image">
      <div class="product-title">${product.title}</div>
      <div class="product-info">${product.category}</div>
      <div class="product-price">₹${product.price.toFixed(2)}</div>
      <div class="rating">⭐ ${product.rating}</div>
    `;

    list.appendChild(card);
  });
}

// Theme toggle
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  themeToggle.textContent = isDark ? '☀' : '🌙';
});

function loadTheme() {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    document.body.classList.add('dark');
    themeToggle.textContent = '☀';
  } else {
    themeToggle.textContent = '🌙';
  }
}
