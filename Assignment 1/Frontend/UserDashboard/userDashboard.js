// Function to toggle the visibility of details in history items
document.querySelectorAll('.history-item').forEach((item) => {
  const detailsSection = item.querySelector('.details-section');
  detailsSection.style.display = 'none'; // Hide details by default

  item.addEventListener('click', () => {
    detailsSection.style.display =
      detailsSection.style.display === 'none' ? 'block' : 'none';
  });
});

document.querySelector('.history-section').addEventListener('click', (event) => {
  const item = event.target.closest('.history-item');
  const step = event.target.closest('.step');
  if (!item || step) return; // Exit if the click is not on a history-item
  const detailsSection = item.querySelector('.details-section');
  if (detailsSection) {
    detailsSection.style.display =
      detailsSection.style.display === 'none' ? 'block' : 'none';
  }
});

// document.querySelector('.history-section').addEventListener('click', (event) => {
//   const step = event.target.closest('.step');
//   if (!step) return; // Exit if the click is not on a step


//   const allSteps = [...step.closest('.status-tracker').querySelectorAll('.step')];
//   const index = allSteps.indexOf(step);

//   allSteps.forEach((s, i) => {
//     if (i <= index) {
//       s.classList.add('completed');
//     } else {
//       s.classList.remove('completed');
//     }
//   });
// });

document.querySelector('.info').addEventListener('click', (event) => {
  console.log("jjjjj");
  const updateButton = event.target.closest('.log-out');
  if (!updateButton) return;
  window.localStorage.removeItem('jwtToken');
  window.localStorage.removeItem('sessionToken');
  window.location.href = '../LoginPage/login.html';
});

// Interactive status tracker logic
// document.querySelectorAll('.status-tracker .step').forEach((step, index, allSteps) => {
//   step.addEventListener('click', (event) => {
//     event.stopPropagation();
//     allSteps.forEach((s, i) => {
//       if (i <= index) {
//         s.classList.add('completed');
//       } else {
//         s.classList.remove('completed');
//       }
//     });
//   });
// });


const statusMap = {
  "PENDING": 1,
  "PICKED": 2,
  "WASHING": 3,
  "DONE": 4,
  "DELIVERED": 5,
};

document.addEventListener('DOMContentLoaded', async function () {
  const authtoken = window.localStorage.getItem('jwtToken');
  console.log(authtoken);
  try {
    const response = await fetch('http://192.168.94.128:8082/user/v1/profile', {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${authtoken}`,
      },
    });
    if (response.ok) {
      const user = await response.json();
      document.querySelector(".info").innerHTML = `
                      <p><strong>Name:</strong> ${user.username || "N/A"}</p>
                      <p><strong>Email:</strong> ${user.email || "N/A"}</p>
                      <p><strong>Hostel:</strong> ${user.hostel || "N/A"}</p>
                      <button><a href="updateInfo.html" style="color: black; text-decoration: none;">Update</a></button>
                      <button class = "log-out">Log Out</button>
                  `;
    }
    else {
      throw new Error("Unable to fetch user profile");
    }

    const response2 = await fetch('http://192.168.94.130:8083/user/v1/laundry', {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${authtoken}`,
      },
    });
    if (response2.ok) {
      const history = await response2.json();
      console.log(history);
      const historySection = document.querySelector(".history-section");
      historySection.innerHTML = `
                <h2>Past Laundry History</h2>
            `;
      history.forEach((laundry, index) => {
        const id = laundry.id;
        const status = laundry.status;

        const submittedAt = laundry.date;
        const messages = laundry.messages
          .map((msg) => `<p>${msg.message}</p>`)
          .join("");

        const pantsImages = laundry.pants
          .map((pants, idx) => `<img src="data:image/jpeg;base64,${pants.image}" alt="Pants ${idx + 1}">`)
          .join("");

        const shirtsImages = laundry.shirts
          .map((shirt, idx) => `<img src="data:image/jpeg;base64,${shirt.image}" alt="Shirts ${idx + 1}">`)
          .join("");

        const currentStep = statusMap[status] || 0;

        historySection.innerHTML += `
                    <div class="history-item">
                        <h3>Laundry ID: ${laundry.id}</h3>
                        <p>Status: ${laundry.status}</p>
                        <p>Submitted Time: ${new Date(laundry.date).toLocaleString()}</p>
                        
                        <div class="status-tracker">
                          <div class="step ${currentStep >= 1 ? "completed" : ""}" data-step="1">
                            <div class="circle"></div>
                            <p>PENDING</p>
                          </div>
                          <div class="step ${currentStep >= 2 ? "completed" : ""}" data-step="2">
                            <div class="circle"></div>
                            <p>PICKED</p>
                          </div>
                          <div class="step ${currentStep >= 3 ? "completed" : ""}" data-step="3">
                            <div class="circle"></div>
                            <p>WASHING</p>
                          </div>
                          <div class="step ${currentStep >= 4 ? "completed" : ""}" data-step="4">
                            <div class="circle"></div>
                            <p>DONE</p>
                          </div>
                          <div class="step ${currentStep >= 5 ? "completed" : ""}" data-step="5">
                            <div class="circle"></div>
                            <p>DELIVERED</p>
                          </div>
                        </div>

                        <div class="details-section" id="details-${index}" style="display: none;">
                            <p>Message:</p>
                            ${messages}

                            <div class="images">
                                <h4>Pants Photos:</h4>
                                <div class="image-gallery">
                                    ${pantsImages}
                                </div>

                                <h4>Shirts Photos:</h4>
                                <div class="image-gallery">
                                    ${shirtsImages}
                                </div>
                            </div>
                        </div>
                    </div>
                `;
      });
    }
    else {
      throw new Error("Unable to fetch user history");
    }
  }
  catch (error) {
    alert("An error occurred: " + error.message);
    window.location.href = '../LoginPage/login.html';
    console.log(error);
  }
});

