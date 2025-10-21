document.addEventListener("DOMContentLoaded", () => {

    const doctorCards = document.querySelectorAll(".doctor-card");
    const detailsModal = document.getElementById("doctorModal");
    const detailsCloseButton = detailsModal.querySelector(".close-button");
    const modalDoctorImage = document.getElementById("modalDoctorImage");
    const modalDoctorName = document.getElementById("modalDoctorName");
    const modalDoctorSpecialty = document.getElementById("modalDoctorSpecialty");
    const modalDoctorContact = document.getElementById("modalDoctorContact");
    const modalDoctorSchedule = document.getElementById("modalDoctorSchedule");
    const modalDoctorRoom = document.getElementById("modalDoctorRoom");
    const modalDoctorAffiliations = document.getElementById("modalDoctorAffiliations");
    const modalDoctorBio = document.getElementById("modalDoctorBio");
    const modalAppointmentBtn = document.getElementById("modalAppointmentBtn");
    
    // --- New Appointment Modal Elements ---
    const appointmentModal = document.getElementById("appointmentRequestModal");
    const appointmentCloseButton = appointmentModal.querySelector(".close-button");
    const appointmentForm = document.getElementById("appointmentForm");
    const appointmentDoctorName = document.getElementById("appointmentDoctorName");
    const doctorNameInput = document.getElementById("doctorNameInput");
    const subjectInput = document.getElementById("subjectInput");
    const appointmentSuccessMessage = document.getElementById("appointmentSuccessMessage");
    
    // Guard clause
    if (!detailsModal || !appointmentModal) {
        return;
    }
    
    doctorCards.forEach(card => {
        card.addEventListener("click", () => {
   
            const name = card.getAttribute("data-name");
            const specialty = card.getAttribute("data-specialty");
            const contact = card.getAttribute("data-contact");
            const schedule = card.getAttribute("data-schedule");
            const room = card.getAttribute("data-room");
            const affiliations = card.getAttribute("data-affiliations");
            const bio = card.getAttribute("data-bio");
            const image = card.getAttribute("data-image");
            
            // Populate the details modal
            modalDoctorName.textContent = name;
            modalDoctorSpecialty.textContent = specialty;
            modalDoctorContact.textContent = contact;
            modalDoctorSchedule.textContent = schedule;
            modalDoctorRoom.textContent = room;
            modalDoctorAffiliations.textContent = affiliations;
            modalDoctorBio.textContent = bio;
            modalDoctorImage.src = image;
            
            // Show the details modal
            detailsModal.style.display = "block";
            
            // --- Handle Appointment Button Click ---
            modalAppointmentBtn.onclick = () => {
                // Hide the details modal
                detailsModal.style.display = "none";
                
                // Populate and show the appointment modal
                appointmentDoctorName.textContent = name;
                doctorNameInput.value = name;
                subjectInput.value = `New Appointment Request for ${name}`;
                
                // Reset form state
                appointmentForm.style.display = 'block';
                appointmentSuccessMessage.style.display = 'none';
                appointmentForm.reset();
                
                appointmentModal.style.display = "block";
            };
        });
    });
    
    // --- Modal Close Logic ---
    detailsCloseButton.addEventListener("click", () => {
        detailsModal.style.display = "none";
    });
    
    appointmentCloseButton.addEventListener("click", () => {
        appointmentModal.style.display = "none";
    });
    
    window.addEventListener("click", (event) => {
        if (event.target === detailsModal) {
            detailsModal.style.display = "none";
        }
        if (event.target === appointmentModal) {
            appointmentModal.style.display = "none";
        }
    });
    
    // --- Appointment Form Submission ---
    appointmentForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        
        try {
            const response = await fetch(event.target.action, {
                method: 'POST',
                body: data,
                headers: { 'Accept': 'application/json' }
            });
            
            if (response.ok) {
                appointmentForm.style.display = 'none';
                appointmentSuccessMessage.style.display = 'block';
            } else {
                alert('Oops! There was a problem submitting your request. Please try again.');
            }
        } catch (error) {
            alert('Oops! There was a network problem. Please check your connection and try again.');
        }
    });
});
