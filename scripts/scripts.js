const uploadChoice = document.getElementById("uploadChoice");
const pastJobExperienceDiv = document.getElementById("past-job-experience-div");
const formSubmit = document.getElementById("submit")

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
        
        // Set submit button type
        submitInput.type = "submit"
        submitInput.id = "submitContent"
        
        // Add input elements to form
        form.appendChild(fileInput)
        form.appendChild(submitInput)
        form.addEventListener("submit",redirectPage)
        
        // Add completed form to the div
        pastJobExperienceDiv.appendChild(form)
        // changing of upload choice to text content submit
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
        form.addEventListener("submit",redirectPage)
        
        pastJobExperienceDiv.appendChild(form);
    }
});

formSubmit.addEventListener("submit", function(e) {
    e.preventDefault();
    
    const fileInput = document.getElementById("myFile");
    console.log(fileInput.files);
    
    // Check if a file was selected
    if (!fileInput.files.length) {
        alert("Please select a pdf file before submitting");
        return;
    }
    
    const file = fileInput.files[0];
    
    // Check if file is PDF
    if (file.type !== 'application/pdf') {
        alert("Please select a PDF file only");
        return;
    }
    
    // If we have a PDF file, proceed with redirect
    console.log("File selected:", file.name);
    window.location.href = "../html/parsedText.html";
});



function redirectPage(e){
    e.preventDefault();
    console.log("hello")
    window.location.href = "../html/parsedText.html";
    
}

