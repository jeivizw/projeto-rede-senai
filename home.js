// home.js - Lógica específica do Feed
function switchTab(tabId) {
    document.querySelectorAll('.section-content').forEach(sec => sec.classList.remove('active'));
    const targetSection = document.getElementById('content-' + tabId);
    if(targetSection) targetSection.classList.add('active');

    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.getElementById('btn-' + tabId);
    if(activeBtn) activeBtn.classList.add('active');
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMobileMenu() {
    const sidebar = document.getElementById('sidebar-menu');
    const overlay = document.getElementById('mobile-menu-overlay');
    
    if (sidebar) sidebar.classList.toggle('open');
    
    if (sidebar && sidebar.classList.contains('open')) {
        if (overlay) {
            overlay.style.display = 'block';
            setTimeout(() => overlay.style.opacity = '1', 10);
        }
    } else {
        if (overlay) {
            overlay.style.opacity = '0';
            setTimeout(() => overlay.style.display = 'none', 300);
        }
    }
}

function showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #22c55e;"></i> <span>${message}</span>`;
    
    container.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function publishPost() {
    const textarea = document.getElementById('post-textarea');
    if (!textarea || textarea.value.trim() === "") return;

    // Vai buscar a imagem de perfil atual que está no botão do cabeçalho
    const userProfileImage = document.querySelector('.user-profile-btn img').src;

    const newPost = document.createElement('article');
    newPost.className = 'card';
    newPost.innerHTML = `
        <div class="post-header">
            <img src="${userProfileImage}" alt="Você">
            <div>
                <h4 class="post-author">João Silva</h4>
                <p class="post-time">Agora mesmo</p>
            </div>
        </div>
        <p class="post-body">${textarea.value.replace(/\n/g, '<br>')}</p>
    `;

    const feedContainer = document.getElementById('feed-container');
    if (feedContainer) {
        feedContainer.insertBefore(newPost, feedContainer.firstChild);
        textarea.value = '';
        showToast("Publicação enviada!");
    }
}