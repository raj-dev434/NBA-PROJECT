(function() {
  emailjs.init({
    publicKey: "OF9UQQ98v0yfU1FX0"
  });
})();

document.addEventListener("DOMContentLoaded", () => {
  

  // Booking Form Handler (booking.html)
  const bookingForm = document.getElementById("booking-form");
  if (bookingForm) {
    const typeSelect = document.getElementById("type");
    const timeSelect = document.getElementById("time");
    
    // Dynamic time slot validation
    typeSelect.addEventListener("change", () => {
      timeSelect.innerHTML = '<option value="" disabled selected>Select a time slot</option>';
      if (typeSelect.value === "coaching") {
        timeSelect.innerHTML += '<option value="18:00-19:30">6:00 PM - 7:30 PM (Coaching)</option>';
      } else if (typeSelect.value === "membership") {
        timeSelect.innerHTML += `
          <option value="06:00-07:00">6:00 AM - 7:00 AM (Membership)</option>
          <option value="07:00-08:00">7:00 AM - 8:00 AM (Membership)</option>
          <option value="19:00-20:00">7:00 PM - 8:00 PM (Membership)</option>
          <option value="20:00-21:00">8:00 PM - 9:00 PM (Membership)</option>
        `;
      }
    });

    bookingForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const phone = document.getElementById("phone").value;
      if (!/^[6-9][0-9]{9}$/.test(phone)) {
        alert("Please enter a valid 10-digit Indian phone number (e.g., 9876543210)");
        return;
      }
      try {
        const response = await emailjs.sendForm("service_s61t9jw", "template_0445cor", event.target);
        console.log("Booking email sent successfully!", response.status, response.text);
        alert("Your booking has been submitted successfully!");
        event.target.reset(); // Clear form after submission
      } catch (error) {
        console.error("Failed to send booking email:", error);
        alert("Failed to submit your booking. Please try again later.");
      }
    });
  }
});