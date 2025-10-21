document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('formSuccessMessage');
    const subjectInput = document.getElementById('subject');

    if (!form || !successMessage || !subjectInput) {
        console.warn('Contact form elements not found. Skipping form logic.');
        return;
    }

    // --- New code to pre-fill the subject line ---
    // Get the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const doctorName = urlParams.get('doctor');

    // If a doctor's name is in the URL, pre-fill the subject
    if (doctorName) {
        subjectInput.value = `Appointment Request for ${doctorName}`;
    }
    // --- End of new code ---

    async function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        
        try {
            const response = await fetch(event.target.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Hide the form and show the success message
                form.style.display = 'none';
                successMessage.style.display = 'block';
                form.reset();
            } else {
                response.json().then(data => {
                    // You can display more specific errors from Formspree if you want
                    alert('Oops! There was a problem submitting your form. Please try again.');
                })
            }
        } catch (error) {
            alert('Oops! There was a network problem. Please check your connection and try again.');
        }
    }

    form.addEventListener("submit", handleSubmit);
});