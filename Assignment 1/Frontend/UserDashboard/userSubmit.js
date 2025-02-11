function displayFiles(inputElement, displayElement) {
    const files = inputElement.files;
    // Loop through all files and append them to the display area
    for (let i = 0; i < files.length; i++) {
        const fileName = document.createElement('p');
        fileName.textContent = files[i].name; // Display the name of each file
        displayElement.appendChild(fileName);
    }
}

// Get input elements and display elements
const shirtPhotoInput = document.getElementById('shirt-photo');
const pantPhotoInput = document.getElementById('pant-photo');
const shirtFileList = document.getElementById('shirt-file-list');
const pantFileList = document.getElementById('pant-file-list');

// Add event listeners to file inputs to display selected files
shirtPhotoInput.addEventListener('change', function () {
    displayFiles(shirtPhotoInput, shirtFileList);
});

pantPhotoInput.addEventListener('change', function () {
    displayFiles(pantPhotoInput, pantFileList);
});



document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("laundryForm");
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const authToken = window.localStorage.getItem('jwtToken');

        const message = document.getElementById("message").value;
        const shirtCount = document.getElementById("shirt-count").value;
        const pantCount = document.getElementById("pant-count").value;
        const shirtFiles = document.getElementById("shirt-photo").files;
        const pantFiles = document.getElementById("pant-photo").files;

        console.log(pantFiles);

        const additionalMessage = `Number of shirts: ${shirtCount}, Number of pants: ${pantCount}`;
        
        const shirts = await processImages(shirtFiles);
        const pants = await processImages(pantFiles);
        
        const payload = {
            message: message+' '+additionalMessage,
            pants: pants,
            shirts: shirts,
        };
        
        try{
            const response = await fetch('http://192.168.94.130:8083/user/v1/submit', {
                method: 'POST',
                headers: {
                  "Authorization": `Bearer ${authToken}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if(response.ok){
                alert("Laundry request submitted successfully!");
                window.location.href = "userDashboard.html";
            }
            else{
                throw new Error("Unable to submit laundry request");
            }
        }
        catch(error){
            alert("An error occurred: " + error.message);
            console.log(error);
        }
    });

});

// Function to process images: Convert to Base64, remove prefix, and compress
async function processImages(files) {
    const processedImages = [];
    for (let file of files) {
        const base64 = await fileToBase64(file);
        const compressedBase64 = await compressImage(base64);
        const cleanBase64 = compressedBase64.replace(/^data:image\/\w+;base64,/, "");
        processedImages.push(cleanBase64);
    }
    return processedImages;
}

// Function to convert a file to Base64
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
}

// Function to compress an image
async function compressImage(base64) {
    const img = new Image();
    img.src = base64;
    return new Promise((resolve) => {
        img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            const maxWidth = 500;
            const maxHeight = 500;
            let width = img.width;
            let height = img.height;
            if (width > height) {
                if (width > maxWidth) {
                    height = Math.floor((height * maxWidth) / width);
                    width = maxWidth;
                }
            } else {
                if (height > maxHeight) {
                    width = Math.floor((width * maxHeight) / height);
                    height = maxHeight;
                }
            }
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL("image/jpeg", 0.5)); // Adjust quality as needed
        };
    });
}



