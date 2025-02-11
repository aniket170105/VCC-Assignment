document.getElementById('signup-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    const userDTO = {
        username: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        hostel: document.getElementById('hostel').value,
    };

    console.log(userDTO);
    try {
        const response = await fetch('http://192.168.94.128:8082/auth/v1/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userDTO),
        });

        const message = await response.text();
        if (response.ok) {
            alert(`Success: ${message}`);
            window.location.href = '../LoginPage/login.html';
        } else {
            alert(`Error: ${message}`);
        }
    } catch (error) {
        alert('An error occurred: ' + error.message);
    }
});