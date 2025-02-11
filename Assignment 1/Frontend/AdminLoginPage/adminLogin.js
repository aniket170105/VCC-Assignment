document.getElementById('admin-login-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    const adminDTO = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
    };
    try {
        const response = await fetch('http://192.168.94.128:8082/auth/v1/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(adminDTO),
        });

        const {accessToken, token} = await response.json();
        
        console.log(accessToken);

        if (response.ok) {
            sessionStorage.setItem('jwtTokenAdmin', accessToken);
            sessionStorage.setItem('sessionTokenAdmin', token);

            window.location.href = '../AdminDashboard/adminDashboard.html';
            // alert(`Success: ${message}`);
        } else {
            alert(`Error: Wrong Credential Login Again`);
        }
    } catch (error) {
        alert('An error occurred: ' + error.message);
    }
});