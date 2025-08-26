const admissionForm = document.getElementById('admissionForm');
const successMessage = document.getElementById('success-message');
const updateButton = document.getElementById('updateButton');
let submittedData = null;

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = '⚠ ' + message;
    errorElement.classList.add('show');
}

function clearError(elementId) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = '';
    errorElement.classList.remove('show');
}

function showSuccessMessage(message) {
    const successContent = successMessage.querySelector('.success-content p');
    if (successContent) {
        successContent.textContent = message;
    }
    successMessage.classList.remove('hidden');
    setTimeout(() => successMessage.classList.add('show'), 100);
    
    setTimeout(() => {
        successMessage.classList.remove('show');
        setTimeout(() => successMessage.classList.add('hidden'), 500);
    }, 5000);
}

admissionForm.addEventListener('submit', function(event) {
    event.preventDefault();
    if (validateForm()) {
        submittedData = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            dateOfBirth: document.getElementById('dateOfBirth').value,
            course: document.getElementById('course').value
        };
        showSuccessMessage('Your application has been submitted successfully! We\'ll review it and get back to you soon.');
        updateButton.classList.remove('hidden');
        admissionForm.reset();
    }
});

updateButton.addEventListener('click', function() {
    if (submittedData) {
        document.getElementById('fullName').value = submittedData.fullName;
        document.getElementById('email').value = submittedData.email;
        document.getElementById('dateOfBirth').value = submittedData.dateOfBirth;
        document.getElementById('course').value = submittedData.course;
        showSuccessMessage('Previous application details loaded for updating');
    }
});

function validateForm() {
    let isValid = true;
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const dateOfBirthInput = document.getElementById('dateOfBirth');
    const courseSelect = document.getElementById('course');
    const termsCheckbox = document.getElementById('terms');

    // Clear all previous errors
    clearError('fullNameError');
    clearError('emailError');
    clearError('dateOfBirthError');
    clearError('courseError');
    clearError('termsError');

    if (fullNameInput.value.trim() === '') {
        showError('fullNameError', 'Please enter your full name');
        isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput.value.trim() === '') {
        showError('emailError', 'Please enter your email address');
        isValid = false;
    } else if (!emailRegex.test(emailInput.value.trim())) {
        showError('emailError', 'Please enter a valid email address');
        isValid = false;
    }

    const dobValue = dateOfBirthInput.value;
    if (dobValue === '') {
        showError('dateOfBirthError', 'Please enter your date of birth');
        isValid = false;
    } else {
        const selectedDate = new Date(dobValue);
        const today = new Date();
        if (selectedDate > today) {
            showError('dateOfBirthError', 'Date of birth cannot be in the future');
            isValid = false;
        }
    }

    if (courseSelect.value === '') {
        showError('courseError', 'Please select your desired program');
        isValid = false;
    }

    if (!termsCheckbox.checked) {
        showError('termsError', 'Please agree to the terms and conditions');
        isValid = false;
    }

    return isValid;
}

// Add animation to form inputs
document.querySelectorAll('.form-input, .form-select').forEach(element => {
    element.addEventListener('focus', function() {
        this.closest('.form-group').querySelector('.form-label').style.color = '#4f46e5';
    });

    element.addEventListener('blur', function() {
        this.closest('.form-group').querySelector('.form-label').style.color = '#1f2937';
    });
});