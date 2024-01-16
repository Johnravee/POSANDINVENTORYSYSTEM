const employeeID = document.querySelector("#employeeID");
const invoiceNumber = document.querySelector("#invoiceNumber");
const inputs = document.querySelectorAll(".inputs");

const numberGenerator = () => {
    
    let localStorageValue = JSON.parse(localStorage.getItem("generatedNumbers"));

    if (localStorageValue === null) {
        let number = [];
        for (let i = 0; i < 12; i++) {
            number.push(Math.floor(Math.random() * 10)); 
        }
        localStorage.setItem("generatedNumbers", JSON.stringify(number));
        localStorageValue = number; 
    }

    let employeeIDNumber = localStorageValue.slice(0, 6).join("");
    let employeeInvoiceNumber = localStorageValue.slice(6, 12).join("");

    employeeID.value = employeeIDNumber.replace(/^(\d{2})(\d+)/, "$1-$2");
    invoiceNumber.value = `00000${employeeInvoiceNumber}`;
    
};



inputs.forEach(input => {
    input.addEventListener("change", numberGenerator);
});





