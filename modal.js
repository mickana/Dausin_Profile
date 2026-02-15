// Resume Modal Functions
function openResumeModal() {
    document.getElementById('resumeModal').style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
}

function closeResumeModal() {
    document.getElementById('resumeModal').style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('resumeModal');
    if (event.target === modal) {
        closeResumeModal();
    }
} 


// Download Resume Function
function downloadResume() {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = 'img/RESUME.png'; // Path to your resume image
    link.download = 'Micka_Dausin_Resume.png'; // Downloaded file name
    
    // Trigger the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}


// Certificate Modal Functions
let currentCertId = '';

const certData = {
    cert1: {
        title: 'IT Customer Support Basics',
        image: 'img/basics.jpg',
        filename: 'IT_Customer_Support_Basics_Certificate.jpg'
    },
    cert2: {
        title: 'Python Essentials 1',
        image: 'img/python.jpg',
        filename: 'Python_Essentials_1_Certificate.jpg'
    }
};

function openCertModal(certId) {
    currentCertId = certId;
    const cert = certData[certId];
    
    document.getElementById('certModal').style.display = 'block';
    document.getElementById('certModalTitle').textContent = cert.title;
    document.getElementById('certModalImage').src = cert.image;
    document.body.style.overflow = 'hidden';
}

function closeCertModal() {
    document.getElementById('certModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    currentCertId = '';
}

function downloadCert(certId) {
    const cert = certData[certId];
    const link = document.createElement('a');
    link.href = cert.image;
    link.download = cert.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function downloadCurrentCert() {
    if (currentCertId) {
        downloadCert(currentCertId);
    }
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const certModal = document.getElementById('certModal');
    if (event.target === certModal) {
        closeCertModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeCertModal();
    }
});
