// Данные контактов (заполнены лорем текстом)
let contacts = [
    {
        id: 1,
        name: "Lorem Ipsum",
        phone: "+7 (123) 456-78-90",
        email: "lorem.ipsum@example.com",
        address: "Lorem Street, 123, Ipsum City"
    },
    {
        id: 2,
        name: "Dolor Sit",
        phone: "+7 (234) 567-89-01",
        email: "dolor.sit@example.com",
        address: "Amet Avenue, 456, Consectetur Town"
    },
    {
        id: 3,
        name: "Adipiscing Elit",
        phone: "+7 (345) 678-90-12",
        email: "adipiscing.elit@example.com",
        address: "Sed Street, 789, Do City"
    },
    {
        id: 4,
        name: "Sed Do Eiusmod",
        phone: "+7 (456) 789-01-23",
        email: "sed.do@example.com",
        address: "Tempor Lane, 321, Incididunt Village"
    },
    {
        id: 5,
        name: "Tempor Incididunt",
        phone: "+7 (567) 890-12-34",
        email: "tempor.incididunt@example.com",
        address: "Ut Street, 654, Labore City"
    },
    {
        id: 6,
        name: "Ut Labore",
        phone: "+7 (678) 901-23-45",
        email: "ut.labore@example.com",
        address: "Dolore Avenue, 987, Magna Town"
    },
    {
        id: 7,
        name: "Dolore Magna",
        phone: "+7 (789) 012-34-56",
        email: "dolore.magna@example.com",
        address: "Aliqua Street, 147, Ipsum City"
    },
    {
        id: 8,
        name: "Aliqua Ipsum",
        phone: "+7 (890) 123-45-67",
        email: "aliqua.ipsum@example.com",
        address: "Quis Lane, 258, Nostrud Village"
    },
    {
        id: 9,
        name: "Quis Nostrud",
        phone: "+7 (901) 234-56-78",
        email: "quis.nostrud@example.com",
        address: "Exercitation Street, 369, Ullamco Town"
    },
    {
        id: 10,
        name: "Exercitation Ullamco",
        phone: "+7 (012) 345-67-89",
        email: "exercitation.ullamco@example.com",
        address: "Laboris Avenue, 741, Nisi City"
    }
];


document.addEventListener('DOMContentLoaded', function() {
    
    const currentPage = window.location.pathname.split('/').pop();
    
   
    if (currentPage === 'contacts.html' || !currentPage || currentPage === 'home.html') {
        displayContacts(contacts);
    }
    
    setupEventListeners();
    
    
    highlightActiveMenuItem();
});


function highlightActiveMenuItem() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || 
            (currentPage === '' && href === 'home.html') || 
            (currentPage === 'index.html' && href === 'home.html')) {
            link.style.backgroundColor = 'rgba(255,255,255,0.3)';
            link.style.fontWeight = 'bold';
        }
    });
}


function setupEventListeners() {
    
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', addContact);
    }

   
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            if (query.length > 0) {
                searchContacts();
            } else {
                displayContacts(contacts);
            }
        });
    }
}


function displayContacts(contactsToShow) {
    const contactsGrid = document.getElementById('contactsGrid');
    if (!contactsGrid) return;

    if (contactsToShow.length === 0) {
        contactsGrid.innerHTML = '<p style="text-align: center; grid-column: 1/-1; color: #666;">Контакты не найдены</p>';
        return;
    }

   
    const searchInput = document.getElementById('searchInput');
    const isSearching = searchInput && searchInput.value.trim().length > 0;
    
    let headerHtml = '';
    if (isSearching) {
        headerHtml = `<div style="grid-column: 1/-1; text-align: center; margin-bottom: 20px; color: #666; font-size: 1.1rem;">
            Найдено контактов: ${contactsToShow.length}
        </div>`;
    }

    contactsGrid.innerHTML = headerHtml + contactsToShow.map(contact => `
        <div class="contact-card">
            <div class="contact-name">${contact.name}</div>
            <div class="contact-phone">📞 ${contact.phone}</div>
            <div class="contact-email">✉️ ${contact.email}</div>
            <div class="contact-address">📍 ${contact.address}</div>
        </div>
    `).join('');
}


function searchContacts() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.toLowerCase();
    
    if (query.length === 0) {
        displayContacts(contacts);
        return;
    }

    const filteredContacts = contacts.filter(contact => 
        contact.name.toLowerCase().includes(query) ||
        contact.phone.includes(query) ||
        contact.email.toLowerCase().includes(query) ||
        contact.address.toLowerCase().includes(query)
    );

    displayContacts(filteredContacts);
}


function addContact(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const newContact = {
        id: contacts.length + 1,
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email') || 'Не указан',
        address: formData.get('address') || 'Не указан'
    };

   
    if (!newContact.name || !newContact.phone) {
        alert('Пожалуйста, заполните обязательные поля (Имя и Телефон)');
        return;
    }

  
    const isDuplicate = contacts.some(contact => 
        contact.phone === newContact.phone || 
        (contact.email !== 'Не указан' && contact.email === newContact.email)
    );

    if (isDuplicate) {
        alert('Контакт с таким телефоном или email уже существует');
        return;
    }

    
    contacts.push(newContact);
    displayContacts(contacts);
    
    
    event.target.reset();
    
    
    showNotification('Контакт успешно добавлен!', 'success');
    
    
    scrollToSection('contacts');
}


function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}


function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}


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
`;
document.head.appendChild(style);


document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
       
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
       
    });
});


window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});


window.searchContacts = searchContacts;
window.scrollToSection = scrollToSection;

