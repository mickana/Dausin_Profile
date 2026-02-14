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
