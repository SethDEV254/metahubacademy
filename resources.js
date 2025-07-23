// Resources Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const searchInput = document.querySelector('.search-input');

    // Tab switching functionality
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            
            // Remove active class from all tabs and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
            
            // Add animation
            const activeContent = document.getElementById(targetTab);
            activeContent.style.opacity = '0';
            activeContent.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                activeContent.style.opacity = '1';
                activeContent.style.transform = 'translateY(0)';
            }, 100);
        });
    });

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            searchResources(searchTerm);
        });
    }

    function searchResources(searchTerm) {
        const activeTab = document.querySelector('.tab-content.active');
        const resourceCards = activeTab.querySelectorAll('.resource-card, .tutorial-card, .doc-category, .cheatsheet-card, .community-card');
        
        resourceCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p') ? card.querySelector('p').textContent.toLowerCase() : '';
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'block';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }

    // Resource action buttons
    const resourceBtns = document.querySelectorAll('.resource-btn');
    resourceBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.textContent.toLowerCase();
            const resourceCard = this.closest('.resource-card');
            const resourceTitle = resourceCard.querySelector('h3').textContent;
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            if (action.includes('start reading')) {
                showNotification(`Opening ${resourceTitle}...`);
            } else if (action.includes('download')) {
                showNotification(`Downloading ${resourceTitle} PDF...`);
                simulateDownload();
            }
        });
    });

    // Tutorial video play buttons
    const playButtons = document.querySelectorAll('.play-button');
    playButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const tutorialCard = this.closest('.tutorial-card');
            const tutorialTitle = tutorialCard.querySelector('h3').textContent;
            
            // Add play animation
            this.style.transform = 'scale(1.2)';
            this.style.opacity = '0.7';
            
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                this.style.opacity = '1';
            }, 200);
            
            showNotification(`Playing: ${tutorialTitle}`);
        });
    });

    // Documentation links
    const docLinks = document.querySelectorAll('.doc-list a');
    docLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const docTitle = this.textContent;
            
            // Add click effect
            this.style.color = 'var(--primary-color)';
            this.style.transform = 'translateX(10px)';
            
            setTimeout(() => {
                this.style.color = '';
                this.style.transform = '';
            }, 300);
            
            showNotification(`Opening ${docTitle}...`);
        });
    });

    // Cheat sheet download buttons
    const downloadBtns = document.querySelectorAll('.download-btn');
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const cheatsheetCard = this.closest('.cheatsheet-card');
            const cheatsheetTitle = cheatsheetCard.querySelector('h3').textContent;
            
            // Add download animation
            this.style.transform = 'scale(0.95)';
            this.textContent = 'Downloading...';
            
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                this.textContent = 'Download PDF';
            }, 1500);
            
            showNotification(`Downloading ${cheatsheetTitle}...`);
            simulateDownload();
        });
    });

    // Community join buttons
    const joinBtns = document.querySelectorAll('.join-btn');
    joinBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const communityCard = this.closest('.community-card');
            const communityTitle = communityCard.querySelector('h3').textContent;
            
            // Add join animation
            this.style.transform = 'scale(0.95)';
            this.style.background = '#10b981';
            this.textContent = 'Joining...';
            
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                this.style.background = '';
                this.textContent = `Join ${communityTitle.split(' ')[0]}`;
            }, 2000);
            
            showNotification(`Redirecting to ${communityTitle}...`);
        });
    });

    function simulateDownload() {
        // Create a fake download progress
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 300px;
            height: 20px;
            background: var(--glass-bg);
            border: 1px solid var(--glass-border);
            border-radius: 10px;
            overflow: hidden;
            z-index: 10001;
        `;
        
        const progress = document.createElement('div');
        progress.style.cssText = `
            height: 100%;
            width: 0%;
            background: var(--gradient-primary);
            transition: width 0.1s ease;
        `;
        
        progressBar.appendChild(progress);
        document.body.appendChild(progressBar);
        
        let width = 0;
        const interval = setInterval(() => {
            width += Math.random() * 15;
            if (width >= 100) {
                width = 100;
                clearInterval(interval);
                setTimeout(() => {
                    document.body.removeChild(progressBar);
                }, 500);
            }
            progress.style.width = width + '%';
        }, 100);
    }

    function showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--gradient-primary);
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
            max-width: 300px;
        `;
        
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Add hover effects to resource cards
    const resourceCards = document.querySelectorAll('.resource-card, .tutorial-card, .cheatsheet-card, .community-card');
    resourceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .tab-content {
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
        
        .resource-card,
        .tutorial-card,
        .cheatsheet-card,
        .community-card {
            transition: all 0.3s ease;
        }
    `;
    document.head.appendChild(style);
});