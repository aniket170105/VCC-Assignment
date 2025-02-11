const statusMap = {
    "PENDING": 1,
    "PICKED": 2,
    "WASHING": 3,
    "DONE": 4,
    "DELIVERED": 5,
};

const statusMapReverse = {
    1: "PENDING",
    2: "PICKED",
    3: "WASHING",
    4: "DONE",
    5: "DELIVERED",
};

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

document.querySelector('.history-section').addEventListener('click', async (event) => {
    const step = event.target.closest('.step');
    if (!step) return; // Exit if the click is not on a step
    const allSteps = [...step.closest('.status-tracker').querySelectorAll('.step')];
    const index = allSteps.indexOf(step);

    const id = step.closest('.history-item').getAttribute('data-id');

    const response = await fetch(`http://192.168.94.130:8083/admin/v1/changeStatus`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('jwtTokenAdmin')}`,
        },
        body: JSON.stringify({"id" : id, "status" : statusMapReverse[index + 1]}),
    });

    console.log({"id" : id, "status" : statusMapReverse[index + 1]});

    if(response.ok) {
        allSteps.forEach((s, i) => {
            if (i <= index) {
                s.classList.add('completed');
            } else {
                s.classList.remove('completed');
            }
        });
    }
    else {
        alert(`Failed to update status + ${await response.text()}`);
    }
});

// document.getElementById('logout-btn').addEventListener('click', () => {
//     sessionStorage.removeItem('jwtTokenAdmin');
//     sessionStorage.removeItem('sessionTokenAdmin');
//     window.location.href = '../AdminLoginPage/adminLogin.html';
// });

document.querySelector('.search-section').addEventListener('click', (event) => {
    const step = event.target.closest('.search-button');
    if(!step) return;

    const query = document.getElementById('search-bar').value.trim();
    const historyItems = document.querySelectorAll('.history-item');

    historyItems.forEach(item => {
        const id = item.getAttribute('data-id');
        if (query === '' || id.includes(query)) {
            item.style.display = 'block'; // Show matching items
        } else {
            item.style.display = 'none'; // Hide non-matching items
        }
    });
});

document.addEventListener('DOMContentLoaded', async function () {
    const authtoken = sessionStorage.getItem('jwtTokenAdmin');
    console.log(authtoken);
    try {
        const response2 = await fetch('http://192.168.94.130:8083/admin/v1/laundry', {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${authtoken}`,
            },
        });
        if (response2.ok) {
            const history = await response2.json();
            console.log(history);
            const historySection = document.querySelector(".history-section");
            // historySection.innerHTML = `
            //       <h2>Past Laundry History</h2>
            //   `;
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
                      <div class="history-item" data-id="${id}">
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
            throw new Error("Unable to fetch Laundry history. Maybe you are not authorized.");
        }
    }
    catch (error) {
        alert("An error occurred: " + error.message);
        console.log(error);
    }
});


