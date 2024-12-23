// Import PDF.js if you're using modules

const uploadChoice = document.getElementById("uploadChoice");
const pastJobExperienceDiv = document.getElementById("past-job-experience-div");
const formSubmit = document.getElementById("submit")


window.addEventListener('pageshow', function(event) {
    // Reset the select element to default option
    if (uploadChoice) {
        uploadChoice.value = "select";
    }
    
    // Clear the div content
    if (pastJobExperienceDiv) {
        pastJobExperienceDiv.innerHTML = "";
    }
});


uploadChoice.addEventListener("change", function() {
    // changing of upload choice to file insert
    if (uploadChoice.value == "file") {
        pastJobExperienceDiv.innerHTML = "";
        
        // Create new form element
        const form = document.createElement('form')
        
        // Create file input element
        const fileInput = document.createElement ('input')
        const submitInput = document.createElement ('input')
        
        // Set file input attributes
        fileInput.type = "file"
        fileInput.id = "myFile"
        fileInput.name = "filename"

        // Restrict to PDF files in file picker
        fileInput.accept = ".pdf"
        
        // Set submit button type
        submitInput.type = "submit"
        submitInput.id = "submitContent"
        
        // Add input elements to form
        form.appendChild(fileInput)
        form.appendChild(submitInput)
        
        // Add submit event listener with file checks
        form.addEventListener("submit", async function(e) {
            e.preventDefault();
            
            // Check if a file was selected
            if (!fileInput.files.length) {
                alert("Please select a file before submitting");
                return;
            }

            const file =fileInput.files[0]

            try {
                // Read the PDF file
                const arrayBuffer = await file.arrayBuffer();
                
                // Load the PDF document
                const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
                
                // Extract text from all pages
                let fullText = '';
                for (let i = 1; i <= pdf.numPages; i++) {
                    const page = await pdf.getPage(i);
                    const textContent = await page.getTextContent();
                    const pageText = textContent.items.map(item => item.str).join(' ');
                    fullText += pageText + '\n';
                }
                
                // Store the extracted text
                localStorage.setItem('parsedInfo', fullText);
                
                // Redirect to the next page
                window.location.href = "../html/jobPosting.html";
                
            } catch (error) {
                console.error('Error reading PDF:', error);
                alert('Error reading PDF file. Please try again.');
            }
        });
    
    pastJobExperienceDiv.appendChild(form);
    }else if (uploadChoice.value ==="text"){
        pastJobExperienceDiv.innerHTML = "";
        // Create new form element
        const form = document.createElement('form');
        
        // Create and setup textarea
        const textarea = document.createElement('textarea');
        textarea.id = "jobExperienceText";
        textarea.name = "jobExperienceText";
        textarea.placeholder = "Enter your past job experiences here...";
        textarea.rows = "10";
        textarea.cols = "50";
        
        // Create and setup submit button
        const submitButton = document.createElement('input');
        submitButton.type = "submit";
        submitButton.value = "Submit";
        submitButton.id = "submitContent"

        // Add line break between textarea and submit button
        const lineBreak = document.createElement('br');
        
        // Append elements to form
        form.appendChild(textarea);
        form.appendChild(lineBreak);
        form.appendChild(submitButton);
        // Move FormData creation and logging to the submit event
        form.addEventListener("submit", function(e) {
            e.preventDefault();
            const formData = new FormData(form);
            console.log("Text Content:", formData.get("jobExperienceText"));
            localStorage.setItem('parsedInfo', formData.get("jobExperienceText"));
            
            // Redirect after logging the data
            window.location.href = "../html/jobPosting.html";
    });
    
    pastJobExperienceDiv.appendChild(form);
}else {
        pastJobExperienceDiv.innerHTML = "";
    }
});


function redirectPage(e,form){
    e.preventDefault();
    const formData = new FormData(form);
    console.log("Form Data:", formData);
    console.log("Text Content:", formData.get("jobExperienceText"));
    
    // Redirect after logging the data
    window.location.href = "../html/jobPosting.html";
    };

const parsedInfo = localStorage.getItem("parsedInfo")