// DOM Elements
const assetForm = document.getElementById('asset-form');
const assetList = document.getElementById('asset-list');

// Load assets from LocalStorage on startup (or default to empty array)
let assets = JSON.parse(localStorage.getItem('assets')) || [];

// Function to render assets dynamically into the HTML table
function displayAssets() {
    assetList.innerHTML = ''; // Clear existing table rows
    
    assets.forEach((asset, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${asset.name}</strong></td>
            <td>${asset.type}</td>
            <td>${asset.location}</td>
            <td>${asset.user || '<em>Unassigned</em>'}</td>
            <td><button class="delete-btn" onclick="deleteAsset(${index})">Remove</button></td>
        `;
        assetList.appendChild(row);
    });
}

// Function to handle form submission
assetForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevents page from refreshing on form submit

    // Extract values matching the corrected HTML input IDs
    const newAsset = {
        name: document.getElementById('asset-name').value,
        type: document.getElementById('asset-type').value,
        location: document.getElementById('asset-location').value,
        user: document.getElementById('asset-user').value
    };

    assets.push(newAsset);
    localStorage.setItem('assets', JSON.stringify(assets)); // Save array to browser memory
    
    displayAssets(); // Refresh table view
    assetForm.reset(); // Clear the form input blocks for next entry
});

// Function to delete an asset from inventory
window.deleteAsset = function(index) {
    assets.splice(index, 1); // Remove item from array
    localStorage.setItem('assets', JSON.stringify(assets)); // Update browser memory
    displayAssets(); // Refresh table view
};

// Run rendering function immediately when page loads
displayAssets();