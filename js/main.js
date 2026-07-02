let filter = document.getElementById("filter")
let containerNode = document.querySelector(".container");

// Initialize active state
document.getElementById("all").classList.add("active");
inject("all")

filter.addEventListener("click", (e) =>{
    let trgt = e.target
    if (trgt.tagName !== 'SPAN') return;
    
    // Clear active class from all filters and set active on the clicked one
    filter.querySelectorAll("span").forEach(span => span.classList.remove("active"));
    trgt.classList.add("active");
    
    let parm = trgt.id
    containerNode.innerHTML = '';
    inject(parm);
})

// Modal logic
const applyModal = document.getElementById('apply-modal-wrapper');
const registerModal = document.getElementById('register-modal-wrapper');

containerNode.addEventListener('click', (e) => {
    const btn = e.target.closest('.apply-btn');
    if (!btn) return;

    const category = btn.getAttribute('data-category');
    const title = btn.getAttribute('data-title');

    if (category === 'Event') {
        document.getElementById('register-modal-title').innerText = `Register for ${title}`;
        document.getElementById('register-item-title').value = title;
        registerModal.style.display = 'flex';
    } else {
        document.getElementById('apply-modal-title').innerText = `Apply for ${title}`;
        document.getElementById('apply-item-title').value = title;
        applyModal.style.display = 'flex';
    }
});

// Close buttons
document.querySelectorAll('.close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const modalId = btn.getAttribute('data-modal');
        document.getElementById(modalId).style.display = 'none';
    });
});

// Close on outside click
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-wrapper')) {
        e.target.style.display = 'none';
    }
});

// UX ENHANCEMENT: Close modals gracefully when pressing the Escape key
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        applyModal.style.display = 'none';
        registerModal.style.display = 'none';
    }
});

// Form submissions
document.getElementById('apply-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const formEl = e.target;
    const submitBtn = formEl.querySelector('button[type="submit"]');
    const title = document.getElementById('apply-item-title').value;
    
    // UX ENHANCEMENT: Switched to robust selectors so updating input structure won't break data collection
    const formData = {
        id: Date.now(),
        opportunity: title,
        type: 'Application',
        date: new Date().toLocaleString(),
        name: formEl.querySelector('[name="name"]')?.value || formEl.querySelectorAll('input, textarea')[1].value, 
        email: formEl.querySelector('[name="email"]')?.value || formEl.querySelectorAll('input, textarea')[2].value,
        phone: formEl.querySelector('[name="phone"]')?.value || formEl.querySelectorAll('input, textarea')[3].value,
        education: formEl.querySelector('[name="education"]')?.value || formEl.querySelectorAll('input, textarea')[4].value,
        message: formEl.querySelector('[name="message"]')?.value || formEl.querySelectorAll('input, textarea')[5].value
    };

    const submissions = JSON.parse(localStorage.getItem('submissions') || '[]');
    submissions.push(formData);
    localStorage.setItem('submissions', JSON.stringify(submissions));

    // UX ENHANCEMENT: Used visual button feedback instead of blocking browser popups
    if (submitBtn) {
        const originalText = submitBtn.innerText;
        submitBtn.innerText = '✓ Submitted Successfully!';
        submitBtn.style.backgroundColor = '#28a745';
        submitBtn.style.color = '#ffffff';
        submitBtn.disabled = true;

        setTimeout(() => {
            applyModal.style.display = 'none';
            formEl.reset();
            // Reset button
            submitBtn.innerText = originalText;
            submitBtn.style.backgroundColor = '';
            submitBtn.style.color = '';
            submitBtn.disabled = false;
        }, 1000);
    } else {
        applyModal.style.display = 'none';
        formEl.reset();
    }
});

document.getElementById('register-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const formEl = e.target;
    const submitBtn = formEl.querySelector('button[type="submit"]');
    const title = document.getElementById('register-item-title').value;
    
    // UX ENHANCEMENT: Switched to robust selectors over static array index positioning
    const formData = {
        id: Date.now(),
        opportunity: title,
        type: 'Registration',
        date: new Date().toLocaleString(),
        name: formEl.querySelector('[name="name"]')?.value || formEl.querySelectorAll('input, select')[1].value,
        email: formEl.querySelector('[name="email"]')?.value || formEl.querySelectorAll('input, select')[2].value,
        organization: formEl.querySelector('[name="organization"]')?.value || formEl.querySelectorAll('input, select')[3].value,
        source: formEl.querySelector('[name="source"]')?.value || formEl.querySelectorAll('input, select')[4].value
    };

    const submissions = JSON.parse(localStorage.getItem('submissions') || '[]');
    submissions.push(formData);
    localStorage.setItem('submissions', JSON.stringify(submissions));

    // UX ENHANCEMENT: Used visual button feedback instead of blocking browser popups
    if (submitBtn) {
        const originalText = submitBtn.innerText;
        submitBtn.innerText = '✓ Registered!';
        submitBtn.style.backgroundColor = '#28a745';
        submitBtn.style.color = '#ffffff';
        submitBtn.disabled = true;

        setTimeout(() => {
            registerModal.style.display = 'none';
            formEl.reset();
            // Reset button
            submitBtn.innerText = originalText;
            submitBtn.style.backgroundColor = '';
            submitBtn.style.color = '';
            submitBtn.disabled = false;
        }, 1000);
    } else {
        registerModal.style.display = 'none';
        formEl.reset();
    }
});