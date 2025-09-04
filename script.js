// Sample library resources data
const libraryResources = [
    {
        id: 1,
        title: "The Art of Knowledge Discovery",
        author: "Dr. Sarah Chen",
        type: "books",
        category: "Research",
        available: true,
        description: "A comprehensive guide to research methodologies and knowledge exploration."
    },
    {
        id: 2,
        title: "Digital Learning Today",
        author: "Mark Johnson",
        type: "magazines",
        category: "Technology",
        available: true,
        description: "Monthly publication covering the latest in educational technology."
    },
    {
        id: 3,
        title: "Historical Archives Database",
        author: "City Historical Society",
        type: "digital",
        category: "History",
        available: true,
        description: "Comprehensive digital collection of historical documents and photos."
    },
    {
        id: 4,
        title: "Modern Philosophy Quarterly",
        author: "Academic Press",
        type: "magazines",
        category: "Philosophy",
        available: true,
        description: "Scholarly articles on contemporary philosophical thought."
    },
    {
        id: 5,
        title: "Programming Fundamentals",
        author: "Lisa Rodriguez",
        type: "books",
        category: "Technology",
        available: false,
        description: "Learn the basics of programming with practical examples."
    },
    {
        id: 6,
        title: "Scientific Journal Database",
        author: "Research Institute",
        type: "digital",
        category: "Science",
        available: true,
        description: "Access to thousands of peer-reviewed scientific articles."
    },
    {
        id: 7,
        title: "Community Stories",
        author: "Local Writers Guild",
        type: "books",
        category: "Literature",
        available: true,
        description: "Collection of short stories by local community authors."
    },
    {
        id: 8,
        title: "Nature & Environment Weekly",
        author: "Green Publishing",
        type: "magazines",
        category: "Environment",
        available: true,
        description: "Weekly magazine focusing on environmental issues and sustainability."
    }
];

// Global variables
let currentFilter = 'all';
let searchQuery = '';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    displayResources();
    initializeNavigation();
    initializeInteractivity();
});

// Display resources based on current filter and search
function displayResources() {
    const catalogResults = document.getElementById('catalog-results');
    if (!catalogResults) return;
    
    let filteredResources = libraryResources;
    
    // Apply type filter
    if (currentFilter !== 'all') {
        filteredResources = filteredResources.filter(resource => resource.type === currentFilter);
    }
    
    // Apply search filter
    if (searchQuery) {
        filteredResources = filteredResources.filter(resource => 
            resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            resource.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
            resource.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            resource.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }
    
    // Create HTML for resources
    catalogResults.innerHTML = filteredResources.map(resource => `
        <div class="resource-item" data-type="${resource.type}">
            <h3>${resource.title}</h3>
            <p><strong>By:</strong> ${resource.author}</p>
            <p><strong>Category:</strong> ${resource.category}</p>
            <p><strong>Type:</strong> ${capitalizeFirst(resource.type)}</p>
            <p class="description">${resource.description}</p>
            <div class="resource-status">
                <span class="availability ${resource.available ? 'available' : 'occupied'}">
                    ${resource.available ? 'Available' : 'Checked Out'}
                </span>
                ${resource.available ? '<button class="reserve-btn" onclick="checkoutResource(' + resource.id + ')">Check Out</button>' : ''}
            </div>
        </div>
    `).join('');
    
    // Show message if no resources found
    if (filteredResources.length === 0) {
        catalogResults.innerHTML = '<div class="no-results"><h3>No resources found</h3><p>Try adjusting your search or filter criteria.</p></div>';
    }
}

// Filter resources by type
function filterResources(type) {
    currentFilter = type;
    
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    displayResources();
}

// Search resources
function searchResources() {
    const searchInput = document.getElementById('search-input');
    searchQuery = searchInput.value.trim();
    displayResources();
}

// Check out a resource
function checkoutResource(resourceId) {
    const resource = libraryResources.find(r => r.id === resourceId);
    if (resource) {
        resource.available = false;
        displayResources();
        showNotification(`"${resource.title}" has been checked out successfully!`);
    }
}

// Reserve a study room
function reserveRoom(roomId) {
    const button = event.target;
    if (button.classList.contains('reserved')) return;
    
    button.textContent = 'Reserved';
    button.classList.add('reserved');
    button.disabled = true;
    
    showNotification(`Study Room ${roomId} has been reserved!`);
}

// Initialize smooth navigation
function initializeNavigation() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize interactive features
function initializeInteractivity() {
    // Search on Enter key press
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchResources();
            }
        });
    }
    
    // Update seating availability randomly every 30 seconds (simulation)
    setInterval(updateSeatingAvailability, 30000);
    
    // Add loading animation for resource cards
    setTimeout(() => {
        document.querySelectorAll('.resource-item').forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
            item.classList.add('fade-in');
        });
    }, 100);
}

// Simulate seating availability changes
function updateSeatingAvailability() {
    const seatingAreas = document.querySelectorAll('.seating-area .availability');
    seatingAreas.forEach(status => {
        // 20% chance to change status
        if (Math.random() < 0.2) {
            if (status.classList.contains('available')) {
                status.classList.remove('available');
                status.classList.add('occupied');
                status.textContent = 'Occupied';
            } else {
                status.classList.remove('occupied');
                status.classList.add('available');
                status.textContent = 'Available';
            }
        }
    });
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: '#27ae60',
        color: 'white',
        padding: '1rem 2rem',
        borderRadius: '4px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: '10000',
        animation: 'slideInRight 0.3s ease-out'
    });
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // Add to document
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Utility function to capitalize first letter
function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Enhanced search with real-time filtering
function enhancedSearch() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            searchQuery = this.value.trim();
            displayResources();
        });
    }
}

// Initialize enhanced search when DOM is ready
document.addEventListener('DOMContentLoaded', enhancedSearch);

// Library statistics and insights
function getLibraryStats() {
    const totalResources = libraryResources.length;
    const availableResources = libraryResources.filter(r => r.available).length;
    const bookCount = libraryResources.filter(r => r.type === 'books').length;
    const magazineCount = libraryResources.filter(r => r.type === 'magazines').length;
    const digitalCount = libraryResources.filter(r => r.type === 'digital').length;
    
    return {
        total: totalResources,
        available: availableResources,
        books: bookCount,
        magazines: magazineCount,
        digital: digitalCount
    };
}

// Export functions for potential testing
window.libraryApp = {
    filterResources,
    searchResources,
    checkoutResource,
    reserveRoom,
    getLibraryStats
};