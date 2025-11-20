// Tab Switching Functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    // Handle tab button clicks
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');

            // Remove active class from all tabs and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));

            // Add active class to clicked tab and corresponding panel
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // Form submission handlers
    const certificateForm = document.getElementById('certificateForm');
    const individualForm = document.getElementById('individualForm');
    const companyForm = document.getElementById('companyForm');

    if (certificateForm) {
        certificateForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleCertificateValidation();
        });
    }

    if (individualForm) {
        individualForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleIndividualSearch();
        });
    }

    if (companyForm) {
        companyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleCompanySearch();
        });
    }

    // Login button handler
    const loginBtn = document.querySelector('.login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            // Add your login logic here
            alert('Login functionality would be implemented here');
        });
    }

    // Modal event listeners
    const closeModalBtn = document.getElementById('closeModal');
    const cancelModalBtn = document.getElementById('cancelModal');
    const modal = document.getElementById('certificateModal');
    const modalOverlay = document.querySelector('.modal-overlay');
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeCertificateModal);
    }
    
    if (cancelModalBtn) {
        cancelModalBtn.addEventListener('click', closeCertificateModal);
    }
    
    // Close modal when clicking on overlay
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeCertificateModal);
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeCertificateModal();
        }
    });

    // Parse URL parameters and auto-populate form
    parseURLParameters();
});

// Parse URL Parameters and Auto-populate Form
function parseURLParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const certificateNumber = urlParams.get('certificateNumber');
    const certificateType = urlParams.get('certificateType');

    if (certificateNumber) {
        const certificateNumberInput = document.getElementById('certificateNumber');
        if (certificateNumberInput) {
            certificateNumberInput.value = certificateNumber;
        }
    }

    if (certificateType) {
        const certificateTypeSelect = document.getElementById('certificateType');
        if (certificateTypeSelect) {
            certificateTypeSelect.value = certificateType;
        }
    }

    // If both parameters are present, automatically validate
    if (certificateNumber && certificateType) {
        // Small delay to ensure form is ready
        setTimeout(() => {
            handleCertificateValidation();
        }, 100);
    }
}

// Certificate Validation Handler
function handleCertificateValidation() {
    const certificateType = document.getElementById('certificateType').value;
    const certificateNumber = document.getElementById('certificateNumber').value;

    if (!certificateType || !certificateNumber) {
        alert('Please fill in all required fields');
        return;
    }

    // Certificate database - in a real app, this would come from an API
    const certificateDatabase = {
        'NCEC/SS-C-5/8942': {
            company: 'KING & SELE GLOBAL SERVICE LIMITED',
            certificateNumber: 'NCEC/SS-C-5/8942',
            type: 'TYPE 5 (CONTRACTS BELOW $10M)',
            equipment: 'MOBILE CRANE, OVERHEAD CRANE, FORKLIFT, EXCAVATOR, SWAMPBUGGY, COMPRESSOR, TORQUE WRENCH, TRUCKS',
            usage: 'CIVIL AND MECHANICAL CONSTRUCTION, HAULAGE',
            issuedDate: '30/08/25',
            expiryDate: '29/08/26'
        },
        'NCEC/SS-C-5/8345': {
            company: '2ES Global Resources Nigeria Limited',
            certificateNumber: 'NCEC/SS-C-5/8345',
            type: 'TYPE 5 (CONTRACTS BELOW $10M)',
            equipment: 'MOBILE CRANE, OVERHEAD CRANE, FORKLIFT, EXCAVATOR, SWAMPBUGGY, COMPRESSOR, TORQUE WRENCH, TRUCKS',
            usage: 'CIVIL AND MECHANICAL CONSTRUCTION, HAULAGE',
            issuedDate: '30/08/25',
            expiryDate: '29/08/26'
        }
    };

    // Check if the certificate number exists in the database
    if (certificateDatabase[certificateNumber]) {
        // Show certificate details in modal
        showCertificateDetails(certificateDatabase[certificateNumber]);
    } else {
        // For other certificate numbers, you would make an API call
        console.log('Validating certificate:', {
            type: certificateType,
            number: certificateNumber
        });
        
        // In a real application, you would use fetch() or axios to call your backend API
        // For now, show a message
        alert(`Certificate validation request:\nType: ${certificateType}\nNumber: ${certificateNumber}\n\nThis would connect to the backend API in a real implementation.`);
    }
}

// Show Certificate Details Modal
function showCertificateDetails(details) {
    // Populate modal with certificate details
    document.getElementById('detailCompany').textContent = details.company;
    document.getElementById('detailCertificateNumber').textContent = details.certificateNumber;
    document.getElementById('detailType').textContent = details.type;
    document.getElementById('detailEquipment').textContent = details.equipment;
    document.getElementById('detailUsage').textContent = details.usage;
    document.getElementById('detailIssuedDate').textContent = details.issuedDate;
    document.getElementById('detailExpiryDate').textContent = details.expiryDate;
    
    // Show the modal
    const modal = document.getElementById('certificateModal');
    modal.classList.add('active');
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

// Close Certificate Details Modal
function closeCertificateModal() {
    const modal = document.getElementById('certificateModal');
    modal.classList.remove('active');
    
    // Restore body scroll
    document.body.style.overflow = '';
}

// Individual Competency Search Handler
function handleIndividualSearch() {
    const name = document.getElementById('individualName').value;
    const id = document.getElementById('individualId').value;

    if (!name && !id) {
        alert('Please enter at least one search criteria');
        return;
    }

    console.log('Searching individual competency:', {
        name: name,
        id: id
    });

    alert(`Individual search request:\nName: ${name || 'N/A'}\nID: ${id || 'N/A'}\n\nThis would connect to the backend API in a real implementation.`);
}

// Company Competency Search Handler
function handleCompanySearch() {
    const companyName = document.getElementById('companyName').value;
    const regNumber = document.getElementById('companyReg').value;

    if (!companyName && !regNumber) {
        alert('Please enter at least one search criteria');
        return;
    }

    console.log('Searching company competency:', {
        name: companyName,
        registration: regNumber
    });

    alert(`Company search request:\nName: ${companyName || 'N/A'}\nRegistration: ${regNumber || 'N/A'}\n\nThis would connect to the backend API in a real implementation.`);
}

// Optional: Add barcode scanning functionality
// This would require additional libraries like QuaggaJS or ZXing
function initBarcodeScanner() {
    // Barcode scanner implementation would go here
    // This is a placeholder for future implementation
    console.log('Barcode scanner would be initialized here');
}

