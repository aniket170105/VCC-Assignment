

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("updateInfoForm");
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const authToken = window.localStorage.getItem('jwtToken');
        const name = document.getElementById("name").value;
        const hostel = document.getElementById("hostel").value;
        const password = document.getElementById("password").value;



        const payload = {
            username: name,
            hostel: hostel,
            password: password,
        };

        try {
            const response = await fetch('http://192.168.94.128:8082/user/v1/update', {
                method: 'PUT',
                headers: {
                    "Authorization": `Bearer ${authToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            if (response.ok) {
                window.location.href = '../UserDashboard/userDashboard.html';
            } else {
                alert(`Error updating profile + ${await response.text()}`);
            }
        } catch (error) {
            alert(`Error updating profile + ${error.message}`);
        }
    });
});