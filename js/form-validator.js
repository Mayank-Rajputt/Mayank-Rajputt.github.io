// portfolio-project/js/form-validator.js

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        const nameInput = document.getElementById('form-name');
        const emailInput = document.getElementById('form-email');
        const messageInput = document.getElementById('form-message');
        const formStatusMessage = document.getElementById('form-status-message'); // For success/error messages

        // Helper function to display error messages
        const showError = (inputElement, message) => {
            // Remove existing error message first
            clearError(inputElement);

            inputElement.classList.add('invalid');
            inputElement.classList.remove('valid');
            const errorElement = document.createElement('p');
            errorElement.className = 'error-message';
            errorElement.textContent = message;
            // Insert error message after the input field's parent (if it's wrapped, e.g. in a div) or after the input itself
            if (inputElement.parentElement && inputElement.parentElement.classList.contains('form-group')) {
                 inputElement.parentElement.appendChild(errorElement);
            } else {
                inputElement.insertAdjacentElement('afterend', errorElement);
            }
        };

        // Helper function to clear error messages
        const clearError = (inputElement) => {
            inputElement.classList.remove('invalid');
            const parent = inputElement.parentElement;
            const existingError = parent ? parent.querySelector('.error-message') : inputElement.nextElementSibling;
            if (existingError && existingError.classList.contains('error-message')) {
                existingError.remove();
            }
        };

        // Helper function to show success on valid input
        const showSuccess = (inputElement) => {
            clearError(inputElement); // Clear any previous errors
            inputElement.classList.add('valid');
            inputElement.classList.remove('invalid');
        };

        // Email validation regex
        const isValidEmail = (email) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        };

        // Function to validate the entire form
        const validateForm = () => {
            let isValid = true;

            // Validate Name
            if (!nameInput.value.trim()) {
                showError(nameInput, 'Name is required.');
                isValid = false;
            } else {
                showSuccess(nameInput);
            }

            // Validate Email
            if (!emailInput.value.trim()) {
                showError(emailInput, 'Email is required.');
                isValid = false;
            } else if (!isValidEmail(emailInput.value.trim())) {
                showError(emailInput, 'Please enter a valid email address.');
                isValid = false;
            } else {
                showSuccess(emailInput);
            }

            // Validate Message
            if (!messageInput.value.trim()) {
                showError(messageInput, 'Message is required.');
                isValid = false;
            } else if (messageInput.value.trim().length < 10) {
                showError(messageInput, 'Message should be at least 10 characters long.');
                isValid = false;
            }
            else {
                showSuccess(messageInput);
            }

            return isValid;
        };

        contactForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent actual form submission

            // Clear previous global status messages
            if (formStatusMessage) {
                formStatusMessage.textContent = '';
                formStatusMessage.className = 'form-status'; // Reset class
            }

            if (validateForm()) {
                // --- Form is valid ---
                if (formStatusMessage) {
                    formStatusMessage.textContent = 'Message sent successfully! Thank you.';
                    formStatusMessage.className = 'form-status success-message'; // Style for success
                }
                // console.log('Form submitted successfully (simulated).');
                // console.log('Name:', nameInput.value.trim());
                // console.log('Email:', emailInput.value.trim());
                // console.log('Message:', messageInput.value.trim());

                // Optionally, clear the form fields
                contactForm.reset();
                // And remove valid classes
                [nameInput, emailInput, messageInput].forEach(input => {
                    input.classList.remove('valid');
                    clearError(input); // Ensure no lingering error messages visually
                });


                // Simulate sending (since no backend)
                // You could add a slight delay before clearing or showing success
                setTimeout(() => {
                    if (formStatusMessage) {
                        // formStatusMessage.textContent = ''; // Optionally clear success message after a while
                    }
                }, 3000); // Clear message after 3 seconds

            } else {
                // --- Form is invalid ---
                if (formStatusMessage) {
                    formStatusMessage.textContent = 'Please correct the errors in the form.';
                    formStatusMessage.className = 'form-status error-summary'; // Style for error summary
                }
                // console.log('Form validation failed.');
            }
        });

        // Optional: Real-time validation as user types (can be intensive, use with debounce if needed)
        // [nameInput, emailInput, messageInput].forEach(input => {
        //     input.addEventListener('input', () => {
        //         // Basic real-time clearing of error if user starts typing
        //         if (input.classList.contains('invalid')) {
        //             if (input.value.trim() !== "") { // or more specific validation
        //                 clearError(input);
        //             }
        //         }
        //         // For more complex real-time validation, you might call parts of validateForm()
        //     });
        // });

        console.log('Form validator script loaded.');

    } else {
        // console.warn('Contact form not found on this page.');
    }
});
