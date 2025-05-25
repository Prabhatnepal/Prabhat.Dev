    const form = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');

    form.addEventListener('submit', function(event) {
      event.preventDefault();

      // Basic front-end validation
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      if (!name) {
        alert('Please enter your name.');
        form.name.focus();
        return;
      }

      if (!email || !validateEmail(email)) {
        alert('Please enter a valid email address.');
        form.email.focus();
        return;
      }

      if (!message) {
        alert('Please enter your message.');
        form.message.focus();
        return;
      }

      // Show success message and reset form
      successMessage.style.display = 'block';
      form.reset();
    });

    function validateEmail(email) {
      // Simple email regex
      const re = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
      return re.test(email.toLowerCase());
    }