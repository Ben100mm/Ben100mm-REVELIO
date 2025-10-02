const API_BASE = '/api';

// Utility functions
function showMessage(message, type = 'success') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `${type}-message`;
    messageDiv.textContent = message;
    messageDiv.style.animation = 'fadeIn 0.3s ease-out';
    
    const section = document.querySelector('.section');
    section.insertBefore(messageDiv, section.firstChild);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// Load stats
async function loadStats() {
    try {
        const response = await fetch(`${API_BASE}/stats`);
        const stats = await response.json();
        
        document.getElementById('totalCreators').textContent = stats.totalCreators;
        document.getElementById('totalProducts').textContent = stats.totalProducts;
        document.getElementById('totalTransactions').textContent = stats.totalTransactions;
        document.getElementById('totalRevenue').textContent = `$${stats.totalRevenue.toFixed(2)}`;
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

// Load creators
async function loadCreators() {
    try {
        const response = await fetch(`${API_BASE}/creators`);
        const creators = await response.json();
        
        const creatorsList = document.getElementById('creatorsList');
        const creatorSelect = document.getElementById('productCreator');
        
        creatorsList.innerHTML = '';
        creatorSelect.innerHTML = '<option value="">Select Creator</option>';
        
        creators.forEach(creator => {
            // Add to list
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <h3>${creator.name}</h3>
                <p><strong>Email:</strong> ${creator.email}</p>
                <p><strong>Bio:</strong> ${creator.bio || 'No bio provided'}</p>
                <p><strong>Products:</strong> ${creator.products.length}</p>
                <div class="impact-score">Impact Score: ${creator.impactScore.toFixed(2)}</div>
                <p class="earnings">Total Earnings: $${creator.totalEarnings.toFixed(2)}</p>
            `;
            creatorsList.appendChild(card);
            
            // Add to select
            const option = document.createElement('option');
            option.value = creator.id;
            option.textContent = creator.name;
            creatorSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading creators:', error);
    }
}

// Load products
async function loadProducts() {
    try {
        const response = await fetch(`${API_BASE}/products`);
        const products = await response.json();
        
        const productsList = document.getElementById('productsList');
        productsList.innerHTML = '';
        
        if (products.length === 0) {
            productsList.innerHTML = '<p>No products available yet.</p>';
            return;
        }
        
        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <h3>${product.title}</h3>
                <p>${product.description || 'No description'}</p>
                <div class="price">$${product.price.toFixed(2)}</div>
                <p><strong>Views:</strong> ${product.views} | <strong>Sales:</strong> ${product.sales}</p>
                <p><strong>Rating:</strong> ${product.rating.toFixed(1)} ⭐</p>
                <button class="btn btn-buy" onclick="buyProduct('${product.id}', ${product.price})">
                    Buy Now
                </button>
            `;
            productsList.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

// Buy product
async function buyProduct(productId, price) {
    const buyerId = prompt('Enter your user ID (or any identifier):');
    if (!buyerId) return;
    
    try {
        const response = await fetch(`${API_BASE}/transactions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId, buyerId })
        });
        
        if (response.ok) {
            showMessage(`Purchase successful! You bought this product for $${price.toFixed(2)}`, 'success');
            await loadProducts();
            await loadStats();
        } else {
            const error = await response.json();
            showMessage(`Purchase failed: ${error.error}`, 'error');
        }
    } catch (error) {
        console.error('Error buying product:', error);
        showMessage('Purchase failed. Please try again.', 'error');
    }
}

// Register creator
document.getElementById('creatorForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('creatorName').value;
    const email = document.getElementById('creatorEmail').value;
    const bio = document.getElementById('creatorBio').value;
    
    try {
        const response = await fetch(`${API_BASE}/creators`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, bio })
        });
        
        if (response.ok) {
            showMessage('Creator registered successfully!', 'success');
            e.target.reset();
            await loadCreators();
            await loadStats();
        } else {
            const error = await response.json();
            showMessage(`Registration failed: ${error.error}`, 'error');
        }
    } catch (error) {
        console.error('Error registering creator:', error);
        showMessage('Registration failed. Please try again.', 'error');
    }
});

// Create product
document.getElementById('productForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const creatorId = document.getElementById('productCreator').value;
    const title = document.getElementById('productTitle').value;
    const description = document.getElementById('productDescription').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    
    if (!creatorId) {
        showMessage('Please select a creator', 'error');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE}/products`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description, price, creatorId })
        });
        
        if (response.ok) {
            showMessage('Product created successfully!', 'success');
            e.target.reset();
            await loadProducts();
            await loadCreators();
            await loadStats();
        } else {
            const error = await response.json();
            showMessage(`Product creation failed: ${error.error}`, 'error');
        }
    } catch (error) {
        console.error('Error creating product:', error);
        showMessage('Product creation failed. Please try again.', 'error');
    }
});

// Distribute payments
document.getElementById('distributeBtn').addEventListener('click', async () => {
    try {
        const response = await fetch(`${API_BASE}/payments/distribute`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        
        const result = await response.json();
        
        if (result.success) {
            const resultsDiv = document.getElementById('distributionResults');
            resultsDiv.innerHTML = `
                <h3>Payment Distribution Complete</h3>
                <p><strong>Total Distributed:</strong> $${result.totalDistributed.toFixed(2)}</p>
                ${result.distributions.map(d => `
                    <div class="distribution-item">
                        <strong>${d.creatorName}</strong><br>
                        <span class="amount">$${d.amount.toFixed(2)}</span> 
                        (${d.transactionCount} transactions, 
                        Impact Score: ${d.impactScore.toFixed(2)})
                    </div>
                `).join('')}
            `;
            
            await loadCreators();
            await loadStats();
        }
    } catch (error) {
        console.error('Error distributing payments:', error);
        showMessage('Payment distribution failed. Please try again.', 'error');
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadStats();
    loadCreators();
    loadProducts();
    
    // Refresh data every 30 seconds
    setInterval(() => {
        loadStats();
        loadCreators();
        loadProducts();
    }, 30000);
});
