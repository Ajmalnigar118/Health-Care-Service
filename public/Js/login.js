document.addEventListener('DOMContentLoaded', () => {
  // Signup handling
  const signupForm = document.getElementById('signupForm');
  const responseMessage = document.getElementById('responseMessage');

  if (signupForm && responseMessage) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(signupForm);
      const data = Object.fromEntries(formData.entries());

      if (Object.values(data).some(val => !val.trim())) {
        responseMessage.innerText = 'Please fill all fields.';
        responseMessage.style.color = 'red';
        return;
      }

      try {
        const res = await fetch('/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        const result = await res.json();

        if (res.ok) {
          responseMessage.innerText = result.message;
          responseMessage.style.color = 'green';
          signupForm.reset();
        } else {
          responseMessage.innerText = result.message || 'Signup failed.';
          responseMessage.style.color = 'red';
        }
      } catch (error) {
        responseMessage.innerText = 'Something went wrong.';
        responseMessage.style.color = 'red';
        console.error(error);
      }
    });
  }

  // Login handling
  const loginForm = document.getElementById('loginForm');
  const loginResponse = document.getElementById('responseMessage');

  if (loginForm && loginResponse) {
    loginForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const email = this.email.value.trim();
      const password = this.password.value.trim();

      try {
        const response = await fetch('/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });

        const result = await response.json();

        if (response.ok && result.token) {
          localStorage.setItem('authToken', result.token);
          loginResponse.style.color = 'green';
          loginResponse.textContent = result.message;

          setTimeout(() => {
            window.location.href = '../html/dashboard.html';
          }, 1000);
        } else {
          loginResponse.style.color = 'red';
          loginResponse.textContent = result.message || 'Login failed.';
        }
      } catch (err) {
        console.error('Login request failed:', err);
        loginResponse.style.color = 'red';
        loginResponse.textContent = 'An error occurred during login.';
      }
    });
  }
});
