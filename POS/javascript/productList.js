const orderDisplay = document.querySelector(".orderDisplay");
const receiptProductList = document.querySelector(".OrdersList");
const productLists = [];
const amountPaid = [];


// add product to array
const product = (productName, ProductPrice) => {
    const isExisting = productLists.find(product => product.productname === productName);

    isExisting ? (
        isExisting.productprice += ProductPrice,
        isExisting.productquantity++
    ) : (
        productLists.push({ productname: productName, productprice: ProductPrice, productquantity: 1 })
    )


    displayListofProducts();
    totalAmount()
};


//display product
const displayListofProducts = () => {
    // initialized a variable with a return value of newProductReceipt
    const newReceiptList = newProductReceipt(productLists);
  
    // reset the current DOM element to the orderdisplay to prevent displaying the same productname
    orderDisplay.innerHTML = "";
    receiptProductList.innerHTML = "";

    // Map through the returned array and display contents
    newReceiptList.forEach(product => {
        const productNode = `<div class="item d-flex justify-content-between text-center">
        <span>${product.productquantity}</span>
        <span>${product.productname}</span>
        <span>${product.totalPrice}.00</span>
      </div>`;

      

        const li = document.createElement("li");
        li.classList.add("listStyles");
        li.innerHTML = productNode;

        

      

        // Append the original li element to orderDisplay
        receiptProductList.appendChild(li);
        orderDisplay.innerHTML = receiptProductList.innerHTML;
        
    });
};




// return new set of products 
const newProductReceipt = (productLists) => {
    // create new object
    const newProductLists = new Map();

    // Iterate to function argument
    productLists.map(product => {
        // evaluate the argument
        if (newProductLists.has(product.productname)) {
            const currentQuantity = product.productquantity;
            const totalPrice = product.productprice;

            newProductLists.set(product.productname, {
                productquantity: currentQuantity,
                productprice: totalPrice
            });
        } else {
            newProductLists.set(product.productname, {
                productquantity: product.productquantity,
                productprice: product.productprice 
            });
        }
    });

    //initialized an array
    const newProductItems = [];

    //loop through object and access properties inside argument
    newProductLists.forEach((productList, productname) => {
        newProductItems.push({ productname, productquantity: productList.productquantity, totalPrice: productList.productprice });
        
    });

    //return a new created array
    return newProductItems;
};


// Handle total price
const totalAmount = () =>{
    const totalAmountOfProduct = productLists.reduce((intialValue, product) => intialValue +  product.productprice, 0);
    document.querySelector(".totalAmountDisplay").textContent = parseFloat(totalAmountOfProduct).toFixed(2);

};

// Handle transactions
const CustomerChange = () =>{
    
    const changeBtns = document.querySelectorAll(".changeBtns");
    

    changeBtns.forEach(btn => {
        btn.addEventListener("click", ()=>{
            amountPaid.push(parseFloat(btn.textContent));
            const amountPaidSummary = amountPaid.reduce((initialValue, amount) => initialValue + amount, 0);
            const totalAmountOfProduct = productLists.reduce((initialValue, product) => initialValue + product.productprice, 0);
            const transactionNumber = transactionNumberGenerator();
            const dateAndTime = DateAndTime();
            let computation =   Math.abs(amountPaidSummary - totalAmountOfProduct);
            document.querySelector(".totalAmountDisplay").textContent =  computation;
            // print when payment is greater than ordered price
            if(amountPaidSummary >= totalAmountOfProduct) {
                 document.querySelector('#CustCash').textContent = `Cash: ${parseFloat(amountPaidSummary).toFixed(2)}`;
                 document.querySelector('#Change').textContent = `Change: ${parseFloat(computation).toFixed(2)}`;
                 document.querySelector('#TotalAmnt').textContent = `Total: ${parseFloat(totalAmountOfProduct).toFixed(2)}`;
                 document.querySelector('#Transaction').textContent = `#:${transactionNumber}`;
                 document.querySelector('#Time').textContent = ` ${dateAndTime.time}`;
                 document.querySelector('#Date').textContent = ` ${dateAndTime.date}`;
                printReceipt();     
            }
            /*else{
                let computation = totalAmountOfProduct - amountPaidSummary;
                 document.querySelector(".totalAmountDisplay").textContent = computation;
                 document.querySelector('#CustCash').textContent = `Cash: ${parseFloat(amountPaidSummary).toFixed(2)}`;
                 document.querySelector('#Change').textContent = `Change: ${parseFloat(computation).toFixed(2)}`;
                 document.querySelector('#TotalAmnt').textContent = `Change: ${parseFloat(totalAmountOfProduct).toFixed(2)}`;
                 document.querySelector('#Transaction').textContent = ` #:${transactionNumber}`;
                 document.querySelector('#Time').textContent = ` Time:${dateAndTime.time}`;
                 document.querySelector('#Date').textContent = ` Date:${dateAndTime.date}`;
                 printReceipt();
            }*/
            
        })
    })
    
};

CustomerChange();


// Handle transaction number
const transactionNumberGenerator = () =>{
    const numbers = "1234567890";
    let randomNumber = "";
    for(let i = 0, x = 6 ; i < x; i++){
         randomNumber += numbers.charAt(Math.floor(Math.random() * x)); 
    }

    const transactionNumber = `${randomNumber.slice(0,2)}-${randomNumber.slice(2-6)}`;
    return transactionNumber;
}


//Handle Date and time
const DateAndTime = () =>{
    const date = new Date();
    let currentDate;
    let currentTime;

    currentDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    currentTime = `${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;

    return {date : currentDate, time : currentTime};
    
};





// Handle printing the receipt
const printReceipt = () => {

  const ReceiptContent = document.querySelector('.ReceiptContent');
  
  // Set the desired print width in pixels
  const printWidthPx = 301.57;
  
  // Calculate the scaling factor based on the print width
  const scaleFactor = printWidthPx / ReceiptContent.offsetWidth;
  
  // Apply the scaling transformation
  ReceiptContent.style.transform = `scale(${scaleFactor})`;
  
  // Open a new window for printing
  const printWindow = window.open('', '_blank');
  
  printWindow.document.write('<html><head><title>Receipt</title></head><body>');
  printWindow.document.write(ReceiptContent.outerHTML);
  printWindow.document.write(`<style>
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400&family=Rajdhani:wght@700&display=swap');
body{
  width: 301.57px;
  font-family: 'Rajdhani', sans-serif;
}

  .ReceiptBody{
    position: absolute;
    background-color: #fff;
    height: auto;
    width: 301.57px;
    padding: 10px ;
    left: 6%;
    top: 10%;
}

#ReceiptLogo{
  text-align: center;
}

.ReceiptAddress{
  text-align: center;
}

#Mode{
  text-align: center;
}

.OrdersList{
  list-style: none;
  padding: 0;
}

.ReceiptContent{
    max-width: 301.57px;
    padding: 20px 10px
}

.DateTime{
    display: flex;
    justify-content: space-evenly;
}

.item{
    max-width: 301.57px;
    padding: 5px 20px;
    display: flex;
    justify-content: space-between;
    text-align: center;
}



.ReceiptColumn{
    padding: 5px 20px;
    display: flex;
    justify-content: space-between;
    text-align: center;
}

.Thankies{
    text-align: center;
}

.ReceiptNumber{
    margin: 50px 0 0 0;

}

#Number{
    font-size: 30px;
    text-align: center;
}

.MoneyInfo{
    padding: 5px 20px;
}

.MoneyInfo p{
    margin: 2px 0;
}

#CashierName{
  padding: 5px 10px;
}


  </style>`)
  printWindow.document.write('</body></html>');
  printWindow.document.close();
  printWindow.print();
  printWindow.close();
  
  
};

