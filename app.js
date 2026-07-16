const sections = [
  {
    id: 'inventory-list',
    title: 'Inventory List',
    description: 'Browse every bike component and accessory with live search and filters.',
    buttonLabel: 'Run Application'
  },
  {
    id: 'maintain-products',
    title: 'Maintain Products',
    description: 'Add new SKUs or update stock details without leaving the dashboard.',
    buttonLabel: 'Run Application'
  },
  {
    id: 'vendors',
    title: 'Manage Vendors',
    description: 'Keep supplier records, pricing, and fulfillment details in view.',
    buttonLabel: 'Run Application'
  },
  {
    id: 'po-list',
    title: 'PO List',
    description: 'Track purchase orders from draft to delivery in one place.',
    buttonLabel: 'Run Application'
  },
  {
    id: 'customers',
    title: 'Maintain Customers',
    description: 'Track customer accounts and service notes with ease.',
    buttonLabel: 'Run Application'
  },
  {
    id: 'sales',
    title: 'Manage Sales',
    description: 'Review order activity and sales status in a single view.',
    buttonLabel: 'Run Application'
  }
];

const maintainProductCatalog = [
  {
    itemId: 'PROD-001',
    itemName: 'Cosmograph Daytona',
    category: 'Rolex',
    stockQuantity: 5,
    unitPrice: 949000,
    supplierName: 'Rolex Boutique',
    photo: './Pictures/1. Rolex/Cosmograph Daytona.JPG'
  },
  {
    itemId: 'PROD-002',
    itemName: 'Submariner Date',
    category: 'Rolex',
    stockQuantity: 8,
    unitPrice: 645000,
    supplierName: 'Rolex Boutique',
    photo: './Pictures/1. Rolex/Submariner Date.jpg'
  },
  {
    itemId: 'PROD-003',
    itemName: 'Datejust 41',
    category: 'Rolex',
    stockQuantity: 6,
    unitPrice: 666500,
    supplierName: 'Rolex Boutique',
    photo: './Pictures/1. Rolex/Datejust 41.jpg'
  },
  {
    itemId: 'PROD-004',
    itemName: 'GMT-Master II',
    category: 'Rolex',
    stockQuantity: 4,
    unitPrice: 682000,
    supplierName: 'Rolex Boutique',
    photo: './Pictures/1. Rolex/GMT-Master II.jpg'
  },
  {
    itemId: 'PROD-005',
    itemName: 'Day-Date 40',
    category: 'Rolex',
    stockQuantity: 3,
    unitPrice: 3810000,
    supplierName: 'Rolex Boutique',
    photo: './Pictures/1. Rolex/Day-Date 40.jpg'
  },
  {
    itemId: 'PROD-006',
    itemName: 'Nautilus',
    category: 'Patek Philippe',
    stockQuantity: 2,
    unitPrice: 7680000,
    supplierName: 'Patek Philippe House',
    photo: './Pictures/2. Patek Philippe/Nautilus.jpg'
  },
  {
    itemId: 'PROD-007',
    itemName: 'Aquanaut',
    category: 'Patek Philippe',
    stockQuantity: 3,
    unitPrice: 1502000,
    supplierName: 'Patek Philippe House',
    photo: './Pictures/2. Patek Philippe/Aquanaut.jpg'
  },
  {
    itemId: 'PROD-008',
    itemName: 'Calatrava',
    category: 'Patek Philippe',
    stockQuantity: 2,
    unitPrice: 1200000,
    supplierName: 'Patek Philippe House',
    photo: './Pictures/2. Patek Philippe/Calatrava.jpg'
  },
  {
    itemId: 'PROD-009',
    itemName: 'Grand Complications Perpetual Calendar',
    category: 'Patek Philippe',
    stockQuantity: 1,
    unitPrice: 4300000,
    supplierName: 'Patek Philippe House',
    photo: './Pictures/2. Patek Philippe/Grand Complications Perpetual Calendar.jpg'
  },
  {
    itemId: 'PROD-010',
    itemName: 'RM 055',
    category: 'Richard Mille',
    stockQuantity: 1,
    unitPrice: 9500000,
    supplierName: 'Richard Mille Atelier',
    photo: './Pictures/3. Richard Mill/RM 055.jpg'
  },
  {
    itemId: 'PROD-011',
    itemName: 'RM 11-03',
    category: 'Richard Mille',
    stockQuantity: 1,
    unitPrice: 7800000,
    supplierName: 'Richard Mille Atelier',
    photo: './Pictures/3. Richard Mill/RM 11-03.jpg'
  },
  {
    itemId: 'PROD-012',
    itemName: 'RM 27-02',
    category: 'Richard Mille',
    stockQuantity: 1,
    unitPrice: 7000000,
    supplierName: 'Richard Mille Atelier',
    photo: './Pictures/3. Richard Mill/RM 27-02.jpg'
  }
];

const inventoryItems = [];

const state = {
  activeView: 'dashboard',
  editingId: null,
  searchTerm: '',
  categoryFilter: 'all'
};

function formatCurrency(value) {
  return `₱${Number(value).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function createPlaceholderSvg(title, accent, bg) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400">
      <rect width="600" height="400" rx="28" fill="${bg}"/>
      <circle cx="180" cy="220" r="90" fill="${accent}" opacity="0.16"/>
      <path d="M150 280h310" stroke="${accent}" stroke-width="18" stroke-linecap="round"/>
      <path d="M200 160h180" stroke="${accent}" stroke-width="18" stroke-linecap="round"/>
      <path d="M240 120l40 60 70-80" stroke="${accent}" stroke-width="16" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <rect x="92" y="90" width="420" height="220" rx="24" fill="none" stroke="${accent}" stroke-opacity="0.3" stroke-width="3"/>
      <text x="50%" y="340" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="24" fill="${accent}">${title}</text>
    </svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function init() {
  if (!document.getElementById('quick-launch-grid') && !document.getElementById('inventory-table-body')) {
    return;
  }

  inventoryItems.length = 0;
  state.searchTerm = '';
  state.categoryFilter = 'all';
  state.editingId = null;

  renderQuickLaunchCards();
  populateCategoryFilter();
  populateItemSelector();
  attachListeners();
  updateStockCount();
  renderInventoryList();
  resetForm();
  switchView('dashboard');
}

function attachListeners() {
  const homeButton = document.getElementById('home-btn');
  const signoffButton = document.getElementById('signoff-btn');
  const inventorySearch = document.getElementById('inventory-search');
  const inventoryCategory = document.getElementById('inventory-category');
  const productForm = document.getElementById('product-form');
  const resetFormButton = document.getElementById('reset-form-btn');
  const inventoryTableBody = document.getElementById('inventory-table-body');
  const productId = document.getElementById('product-id');
  const productName = document.getElementById('product-name');
  const productCategory = document.getElementById('product-category');
  const productStock = document.getElementById('product-stock');
  const productPrice = document.getElementById('product-price');
  const productSupplier = document.getElementById('product-supplier');
  const productPhoto = document.getElementById('product-photo');

  document.querySelectorAll('.nav-link').forEach((button) => {
    button.addEventListener('click', () => switchView(button.dataset.view));
  });

  document.querySelectorAll('[data-view]').forEach((element) => {
    if (element.classList.contains('nav-link')) return;

    element.addEventListener('click', () => {
      if (element.dataset.view) switchView(element.dataset.view);
    });
  });

  if (homeButton) {
    homeButton.addEventListener('click', () => switchView('dashboard'));
  }

  if (signoffButton) {
    signoffButton.addEventListener('click', () => {
      localStorage.removeItem('watchInventoryAuth');
      localStorage.removeItem('watchInventoryUser');
      window.location.href = 'login.html';
    });
  }

  if (inventorySearch) {
    inventorySearch.addEventListener('input', (event) => {
      state.searchTerm = event.target.value.trim().toLowerCase();
      renderInventoryList();
    });
  }

  if (inventoryCategory) {
    inventoryCategory.addEventListener('change', (event) => {
      state.categoryFilter = event.target.value;
      renderInventoryList();
    });
  }

  if (productForm) {
    productForm.addEventListener('submit', handleProductSubmit);
  }

  if (resetFormButton) {
    resetFormButton.addEventListener('click', resetForm);
  }

  if (inventoryTableBody) {
    inventoryTableBody.addEventListener('click', handleInventoryAction);
  }

  if (productId) {
    productId.addEventListener('change', () => {
      const selectedOption = productId.selectedOptions[0];
      if (!selectedOption || !selectedOption.value) return;

      document.getElementById('product-name').value = selectedOption.dataset.name || '';
      document.getElementById('product-category').value = selectedOption.dataset.category || '';
      document.getElementById('product-stock').value = selectedOption.dataset.stock || '';
      document.getElementById('product-price').value = selectedOption.dataset.price || '';
      document.getElementById('product-supplier').value = selectedOption.dataset.supplier || '';
      document.getElementById('product-photo').value = selectedOption.dataset.photo || '';
      syncPreview();
    });
  }
  if (productName) productName.addEventListener('input', syncPreview);
  if (productCategory) productCategory.addEventListener('change', syncPreview);
  if (productStock) productStock.addEventListener('input', syncPreview);
  if (productPrice) productPrice.addEventListener('input', syncPreview);
  if (productSupplier) productSupplier.addEventListener('input', syncPreview);
  if (productPhoto) productPhoto.addEventListener('input', syncPreview);
}

function renderQuickLaunchCards() {
  const grid = document.getElementById('quick-launch-grid');
  if (!grid) return;
  grid.innerHTML = sections.map((section) => `
    <article class="launch-card">
      <p class="eyebrow">Quick Launch</p>
      <h4>${section.title}</h4>
      <p>${section.description}</p>
      <button class="btn btn-primary" data-view="${section.id}">${section.buttonLabel}</button>
    </article>
  `).join('');
}

function populateCategoryFilter() {
  const select = document.getElementById('inventory-category');
  if (!select) return;
  const categories = ['all', ...new Set([...inventoryItems, ...maintainProductCatalog].map((item) => item.category))];
  select.innerHTML = categories.map((category) => `<option value="${category}">${category === 'all' ? 'All Categories' : category}</option>`).join('');
}

function populateItemSelector() {
  const select = document.getElementById('product-id');
  if (!select) return;

  select.innerHTML = '<option value="">Select an item</option>' + maintainProductCatalog.map((item) => `
    <option value="${item.itemId}" data-name="${item.itemName}" data-category="${item.category}" data-stock="${item.stockQuantity}" data-price="${item.unitPrice}" data-supplier="${item.supplierName}" data-photo="${item.photo}">${item.itemId} — ${item.itemName}</option>
  `).join('');
}

function switchView(viewName) {
  state.activeView = viewName;

  const activeViews = document.querySelectorAll('.view');
  if (activeViews.length) {
    activeViews.forEach((view) => view.classList.remove('active'));
    document.getElementById(`${viewName}-view`)?.classList.add('active');
  }

  document.querySelectorAll('.nav-link').forEach((link) => {
    link.classList.toggle('active', link.dataset.view === viewName);
  });

  if (viewName === 'maintain-products') {
    syncPreview();
  }

  if (viewName === 'inventory-list') {
    renderInventoryList();
  }
}

function renderInventoryList() {
  const tableBody = document.getElementById('inventory-table-body');
  if (!tableBody) return;
  const filteredItems = inventoryItems.filter((item) => {
    const matchesSearch = [item.itemId, item.itemName].some((value) => value.toLowerCase().includes(state.searchTerm));
    const matchesCategory = state.categoryFilter === 'all' || item.category === state.categoryFilter;
    return matchesSearch && matchesCategory;
  });

  if (!filteredItems.length) {
    tableBody.innerHTML = `<tr><td colspan="7">No items match the current filter.</td></tr>`;
    return;
  }

  tableBody.innerHTML = filteredItems.map((item) => `
    <tr>
      <td>${item.itemId}</td>
      <td>${item.itemName}</td>
      <td><span class="badge">${item.category}</span></td>
      <td>${item.stockQuantity}</td>
      <td>${formatCurrency(item.unitPrice)}</td>
      <td>${item.supplierName}</td>
      <td><img class="inventory-thumb" src="${item.photo}" alt="${item.itemName}" /></td>
      <td>
        <button class="action-btn" data-action="edit" data-id="${item.itemId}">Edit</button>
        <button class="action-btn danger" data-action="delete" data-id="${item.itemId}">Delete</button>
      </td>
    </tr>
  `).join('');
}

function handleInventoryAction(event) {
  const actionButton = event.target.closest('button[data-action]');
  if (!actionButton) return;

  const { action, id } = actionButton.dataset;
  const item = inventoryItems.find((entry) => entry.itemId === id);

  if (!item) return;

  if (action === 'edit') {
    state.editingId = item.itemId;
    populateProductForm(item);
    switchView('maintain-products');
  }

  if (action === 'delete') {
    const index = inventoryItems.findIndex((entry) => entry.itemId === id);
    if (index >= 0) {
      inventoryItems.splice(index, 1);
      if (state.editingId === id) {
        resetForm();
      }
      populateCategoryFilter();
      updateStockCount();
      renderInventoryList();
    }
  }
}

function handleProductSubmit(event) {
  event.preventDefault();

  const payload = {
    itemId: document.getElementById('product-id').value.trim(),
    itemName: document.getElementById('product-name').value.trim(),
    category: document.getElementById('product-category').value,
    stockQuantity: Number(document.getElementById('product-stock').value),
    unitPrice: Number(document.getElementById('product-price').value),
    supplierName: document.getElementById('product-supplier').value.trim(),
    photo: document.getElementById('product-photo').value.trim() || createPlaceholderSvg(document.getElementById('product-name').value.trim() || 'New Product', '#2d6cdf', '#eef4ff')
  };

  if (!payload.itemId || !payload.itemName || !payload.category || !payload.supplierName) {
    alert('Please complete the required fields before saving.');
    return;
  }

  if (state.editingId) {
    const existingIndex = inventoryItems.findIndex((item) => item.itemId === state.editingId);
    if (existingIndex >= 0) {
      inventoryItems[existingIndex] = { ...inventoryItems[existingIndex], ...payload };
    }
  } else {
    inventoryItems.unshift(payload);
  }

  state.editingId = null;
  populateCategoryFilter();
  updateStockCount();
  renderInventoryList();
  switchView('inventory-list');
}

function populateProductForm(item) {
  document.getElementById('item-id').value = item.itemId;
  document.getElementById('product-id').value = item.itemId;
  document.getElementById('product-name').value = item.itemName;
  document.getElementById('product-category').value = item.category;
  document.getElementById('product-stock').value = item.stockQuantity;
  document.getElementById('product-price').value = item.unitPrice;
  document.getElementById('product-supplier').value = item.supplierName;
  document.getElementById('product-photo').value = item.photo.includes('data:image') ? '' : item.photo;
  document.getElementById('product-form-title').textContent = 'Edit Product';
  syncPreview();
}

function resetForm() {
  document.getElementById('product-form').reset();
  document.getElementById('item-id').value = '';
  document.getElementById('product-form-title').textContent = 'Maintain Products';
  state.editingId = null;
  syncPreview();
}

function syncPreview() {
  const nameInput = document.getElementById('product-name');
  const categoryInput = document.getElementById('product-category');
  const stockInput = document.getElementById('product-stock');
  const priceInput = document.getElementById('product-price');
  const supplierInput = document.getElementById('product-supplier');
  const photoInput = document.getElementById('product-photo');
  const previewName = document.getElementById('preview-name');
  const previewMeta = document.getElementById('preview-meta');
  const previewImage = document.getElementById('preview-image');

  if (!nameInput || !categoryInput || !stockInput || !priceInput || !supplierInput || !previewName || !previewMeta || !previewImage) {
    return;
  }

  const name = nameInput.value.trim() || 'Choose an item';
  const category = categoryInput.value || 'Catalog';
  const stock = stockInput.value || '0';
  const price = priceInput.value || '0';
  const supplier = supplierInput.value.trim() || 'Supplier';
  const photoValue = photoInput.value.trim();

  previewName.textContent = name;
  previewMeta.innerHTML = `<strong>${category}</strong><br/>Stock: ${stock}<br/>Price: ${formatCurrency(price)}<br/>Supplier: ${supplier}`;

  if (photoValue) {
    const safePhotoUrl = encodeURI(photoValue);
    previewImage.style.backgroundImage = `url('${safePhotoUrl}')`;
    previewImage.style.backgroundSize = 'contain';
    previewImage.style.backgroundPosition = 'center';
    previewImage.style.backgroundRepeat = 'no-repeat';
    previewImage.textContent = '';
  } else {
    previewImage.style.backgroundImage = 'none';
    previewImage.textContent = 'Preview Image';
  }
}

function updateStockCount() {
  const totalStock = inventoryItems.reduce((sum, item) => sum + item.stockQuantity, 0);
  document.getElementById('stock-count').textContent = totalStock;
}

window.inventoryItems = inventoryItems;
window.addEventListener('DOMContentLoaded', init);
