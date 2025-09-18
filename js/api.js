// ATNT API Client
class ATNTApi {
    constructor() {
        this.baseURL = window.location.origin;
        this.token = localStorage.getItem('atnt_token');
        this.user = JSON.parse(localStorage.getItem('atnt_user') || 'null');
    }

    // Helper method for making API requests
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}/api${endpoint}`;
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };

        if (this.token) {
            headers.Authorization = `Bearer ${this.token}`;
        }

        try {
            const response = await fetch(url, {
                ...options,
                headers
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'API request failed');
            }

            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // Authentication methods
    async register(userData) {
        try {
            const response = await this.request('/auth/register', {
                method: 'POST',
                body: JSON.stringify(userData)
            });

            this.token = response.accessToken;
            this.user = response.user;
            
            localStorage.setItem('atnt_token', this.token);
            localStorage.setItem('atnt_user', JSON.stringify(this.user));

            return response;
        } catch (error) {
            throw error;
        }
    }

    async login(credentials) {
        try {
            const response = await this.request('/auth/login', {
                method: 'POST',
                body: JSON.stringify(credentials)
            });

            this.token = response.accessToken;
            this.user = response.user;
            
            localStorage.setItem('atnt_token', this.token);
            localStorage.setItem('atnt_user', JSON.stringify(this.user));

            return response;
        } catch (error) {
            throw error;
        }
    }

    logout() {
        this.token = null;
        this.user = null;
        localStorage.removeItem('atnt_token');
        localStorage.removeItem('atnt_user');
    }

    isAuthenticated() {
        return !!this.token && !!this.user;
    }

    getCurrentUser() {
        return this.user;
    }

    // Company methods
    async getCompanies(filters = {}) {
        const params = new URLSearchParams(filters);
        return await this.request(`/companies?${params}`);
    }

    async getCompany(symbol) {
        return await this.request(`/companies/${symbol}`);
    }

    // Search methods
    async search(query, type = null) {
        const params = new URLSearchParams({ q: query });
        if (type) params.append('type', type);
        return await this.request(`/search?${params}`);
    }
}

// Global API instance
window.api = new ATNTApi();

// Utility functions
window.ATNTUtils = {
    showSuccess(message) {
        this.showNotification(message, 'success');
    },

    showError(message) {
        this.showNotification(message, 'error');
    },

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'error' ? '#ef4444' : type === 'success' ? '#10b981' : '#3b82f6'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 10000;
            font-weight: 500;
            max-width: 400px;
        `;
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 5000);
    },

    requireAuth() {
        if (!window.api.isAuthenticated()) {
            window.location.href = '/pages/login.html';
            return false;
        }
        return true;
    }
};

console.log('🚀 ATNT API Client loaded');