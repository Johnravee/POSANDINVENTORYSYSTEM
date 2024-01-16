document.addEventListener("DOMContentLoaded", ()=>{
    document.querySelector("#form").addEventListener("submit", (e) => {
    e.preventDefault();
    document.querySelector(".loadingContent").style.display = "flex";
    const firstName = document.querySelector("#firstName").value;
    const middleName = document.querySelector("#middleName").value;
    const lastName = document.querySelector("#lastName").value;
    const email = document.querySelector("#email").value;
    const employeeID = document.querySelector("#employeeID").value;
    const invoiceNumber = document.querySelector("#invoiceNumber").value;
    const Contact = document.querySelector("#Contact").value;
    const Birthdate = document.querySelector("#Birthdate").value;
    const jobPosition = document.querySelector("#jobPosition").value;
    const address = document.querySelector("#address").value;
    const password = document.querySelector("#password").value;
    
    fetch("/createaccount", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ firstName, middleName, lastName, email, employeeID, invoiceNumber, Contact, Birthdate, jobPosition, address, password})
    })
    .then(res => {
     return res.ok ? res.text(): new Error('Request Error!');
        
    })
    .then(responseText => {
        
        if (responseText === 'success') {
            localStorage.clear();
            document.querySelector(".loadingContent").style.display = "none";
            const alertContainer = document.querySelector("#alertContainer");
            const alertDiv = document.createElement('div');
            alertDiv.classList.add('alert', 'alert-success', 'alert-dismissible', 'fade', 'show', "w-100");
            alertDiv.setAttribute('role', 'alert');
            alertDiv.innerHTML = `
                <strong>Success!</strong> Data submitted successfully.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            `;
            alertContainer.appendChild(alertDiv);
            document.querySelector("#address").value = "";
            document.querySelectorAll("input").forEach(input => input.value = "");
        } else {
            throw new Error('Request Error!');
        }
    })
    .catch(error => {
        console.error('Fetch error!:', error);

    });
});



})
