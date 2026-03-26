if (!sessionStorage.getItem('adminLoggedIn')) {
    window.location.href = 'login.html';
}

const form = document.getElementById('addForm');
const itemsList = document.getElementById('itemsList');
const addBtn = document.getElementById('addBtn');
const cancelBtn = document.getElementById('cancelBtn');
const formSection = document.getElementById('formSection');
const logoutBtn = document.getElementById('logoutBtn');

// Navigation Tabs
const viewOpps = document.getElementById('viewOpps');
const viewSubs = document.getElementById('viewSubmissions');
const oppSection = document.getElementById('opportunitiesSection');
const subSection = document.getElementById('submissionsSection');
const submissionsList = document.getElementById('submissionsList');
const clearSubsBtn = document.getElementById('clearSubmissions');

let data = [];
const saved = localStorage.getItem('opportunities');
if (saved) {
    data = JSON.parse(saved);
}

// Tab Switching logic
viewOpps.addEventListener('click', () => {
    viewOpps.classList.add('active');
    viewSubs.classList.remove('active');
    oppSection.classList.remove('hidden');
    subSection.classList.add('hidden');
});

viewSubs.addEventListener('click', () => {
    viewSubs.classList.add('active');
    viewOpps.classList.remove('active');
    subSection.classList.remove('hidden');
    oppSection.classList.add('hidden');
    renderSubmissions();
});

addBtn.addEventListener('click', () => {
    formSection.classList.toggle('hidden');
});

cancelBtn.addEventListener('click', () => {
    formSection.classList.add('hidden');
    form.reset();
});

logoutBtn.addEventListener('click', () => {
    sessionStorage.removeItem('adminLoggedIn');
    window.location.href = 'login.html';
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const newItem = {
        id: Date.now().toString(),
        title: document.getElementById('title').value,
        category: document.getElementById('category').value,
        organization: document.getElementById('organization').value,
        description: document.getElementById('description').value,
        deadline: document.getElementById('deadline').value,
        location: document.getElementById('location').value,
        time: '',
        fee: document.getElementById('fee').value,
        payment: document.getElementById('payment').value,
        imagePath: '',
        link: document.getElementById('link').value,
    };

    data.push(newItem);
    localStorage.setItem('opportunities', JSON.stringify(data));
    form.reset();
    formSection.classList.add('hidden');
    renderItems();
});

function renderItems() {
    if (data.length === 0) {
        itemsList.innerHTML = '<div class="empty-message">No items yet</div>';
        return;
    }

    itemsList.innerHTML = data.map(item => `
        <div class="item-card">
            <h3>${item.title}</h3>
            <div class="item-info"><strong>Category:</strong> ${item.category}</div>
            <div class="item-info"><strong>Organization:</strong> ${item.organization}</div>
            <div class="item-info"><strong>Deadline:</strong> ${item.deadline}</div>
            <div class="item-info"><strong>Location:</strong> ${item.location}</div>
            <div class="item-actions">
                <button class="delete-btn" onclick="deleteItem('${item.id}')">Delete</button>
            </div>
        </div>
    `).join('');
}

function deleteItem(id) {
    if (confirm('Delete this item?')) {
        data = data.filter(item => item.id !== id);
        localStorage.setItem('opportunities', JSON.stringify(data));
        renderItems();
    }
}

// Submissions Rendering Logic
function renderSubmissions() {
    const subs = JSON.parse(localStorage.getItem('submissions') || '[]');
    
    if (subs.length === 0) {
        submissionsList.innerHTML = '<div class="empty-message">No responses yet</div>';
        return;
    }

    submissionsList.innerHTML = subs.reverse().map(sub => `
        <div class="submission-card ${sub.type.toLowerCase()}">
            <div class="sub-header">
                <div>
                    <span class="sub-type-badge">${sub.type}</span>
                    <h3>${sub.opportunity}</h3>
                </div>
                <span class="sub-date">${sub.date}</span>
            </div>
            <div class="sub-body">
                <div class="sub-info"><strong>Name:</strong> ${sub.name}</div>
                <div class="sub-info"><strong>Email:</strong> ${sub.email}</div>
                ${sub.type === 'Application' ? `
                    <div class="sub-info"><strong>Phone:</strong> ${sub.phone}</div>
                    <div class="sub-info"><strong>Education:</strong> ${sub.education}</div>
                    <div class="sub-message"><strong>Statement:</strong> ${sub.message}</div>
                ` : `
                    <div class="sub-info"><strong>Organization:</strong> ${sub.organization}</div>
                    <div class="sub-info"><strong>Source:</strong> ${sub.source}</div>
                `}
            </div>
        </div>
    `).join('');
}

clearSubsBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear ALL form submissions?')) {
        localStorage.removeItem('submissions');
        renderSubmissions();
    }
});

renderItems();
renderSubmissions();
                                                                                                                                                                                                                            renderSubmissions();
renderSubmissions();