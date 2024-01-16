document.addEventListener("DOMContentLoaded", () => {
  fetch("/products")
  .then( res => {
    if (res.ok) {
      try {
        new DataTable(document.querySelector("table"));
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    } else  console.error("Request Failed!");
    
  })
  .catch(error => {
    console.error("Fetch error!", error);
  });



    document.querySelector("#addproductRequest").addEventListener("click", (e) => {
    const form = new FormData();
    e.preventDefault();
     document.querySelector(".loadingContent").style.display = "flex";
    const imageFileData = document.querySelector("#file").files[0];
    const productName = document.querySelector("#productName").value;
    const Categories = document.querySelector("#Categories").value;
    const stocks = document.querySelector("#stocks").value;
    const price = document.querySelector("#price").value; 
   
    form.append("imageFileData", imageFileData);
    form.append("productName", productName);
    form.append("Categories", Categories);
    form.append("stocks", stocks);
    form.append("price", price);



    fetch("/products",{
        method : "POST",
        body : form     
    })
    .then(res =>{
      return  res.ok ? res.text() : console.error("Request Failed")
    })
    .then(responseText =>{
      responseText === "success" ? (
        document.querySelector(".loadingContent").style.display = "none", 
        document.querySelector("#imagePrev").src = "../img/addproductimageicon.png",
        document.querySelectorAll(".inputs").forEach(input => input.value = ""),
        document.querySelector(".alert").classList.add("alert-success", "show"),
        document.querySelector(".alert").classList.remove("d-none"),
        document.querySelector(".alert").innerHTML = "<strong class='text-dark'><i class='bi bi-check2-circle em-2'></i> Product added successfully!</strong> <button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>",

        location.reload()
    
      
       
  
        
         ) : (
        console.error("Request Failed!"),
        document.querySelector(".loadingContent").style.display = "none", 
        document.querySelector("#imagePrev").src = "../img/addproductimageicon.png",
        document.querySelectorAll(".inputs").forEach(input => input.value = ""),
        document.querySelector(".alert").classList.add("show", "alert-danger"),
        document.querySelector(".alert").classList.remove("d-none"),
        document.querySelector(".alert").innerHTML = "<strong><i class='bi bi-ban em-2'></i> Product added failed!</strong><button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>"

        )
            
        
    })
    .catch(error=>{
        document.querySelector(".loadingContent").style.display = "none", 
        document.querySelector("#imagePrev").src = "../img/addproductimageicon.png",
        document.querySelectorAll(".inputs").forEach(input => input.value = ""),
        document.querySelector(".alert").classList.add("show", "alert-danger");
        document.querySelector(".alert").classList.remove("d-none");
        document.querySelector(".alert").innerHTML = "<strong><i class='bi bi-ban em-2'></i> Connection error!</strong><button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>";
        throw new Error("Error", error);
    
    })


    
})


document.querySelector(".updateProduct").addEventListener("click", () => {
  document.querySelector(".loadingContent").style.display = "flex";
  const formData = {
    productPrice: document.querySelector(".productPrice").value,
    productStocks: document.querySelector(".productStocks").value,
    productID: document.querySelector(".productID").value
  };


  fetch("/products", {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(res => {
      if (res.ok){
        document.querySelector(".loadingContent").style.display = "none";
        document.querySelector(".alert").classList.add("alert-success", "show");
        document.querySelector(".alert").classList.remove("d-none");
        document.querySelector(".alert").innerHTML = "<strong class='text-dark'><i class='bi bi-check2-circle em-2'></i>Updated successfully!</strong> <button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>";
        location.reload()
      }else{
        document.querySelector(".loadingContent").style.display = "none";
        document.querySelector(".alert").classList.add("show", "alert-danger");
        document.querySelector(".alert").classList.remove("d-none");
        document.querySelector(".alert").innerHTML = "<strong><i class='bi bi-ban em-2'></i>  Updating failed!</strong><button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>";
      }
    })
    .catch(error => {
      console.error("fetch error", error);
      document.querySelector(".loadingContent").style.display = "none";
      document.querySelector(".alert").classList.add("show", "alert-danger");
        document.querySelector(".alert").classList.remove("d-none");
        document.querySelector(".alert").innerHTML = "<strong><i class='bi bi-ban em-2'></i>  Connection error!</strong><button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>";
    });
});


 document.querySelector(".deleteProduct").addEventListener("click", ()=>{
      document.querySelector(".loadingContent").style.display = "flex";
      const productId = document.querySelector(".productIDInput").value;
      const formdata = {
        productid : productId
      }
      

      fetch("/products",{
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
          },
        body : JSON.stringify(formdata)
      })
      .then(res => {
        if(res.ok){
          document.querySelector(".loadingContent").style.display = "none";
        document.querySelector(".alert").classList.add("alert-success", "show");
        document.querySelector(".alert").classList.remove("d-none");
        document.querySelector(".alert").innerHTML = "<strong class='text-dark'><i class='bi bi-check2-circle em-2'></i>Deleted successfully!</strong> <button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>";
        location.reload()
        }else{
        document.querySelector(".loadingContent").style.display = "none";
        document.querySelector(".alert").classList.add("show", "alert-danger");
        document.querySelector(".alert").classList.remove("d-none");
        document.querySelector(".alert").innerHTML = "<strong><i class='bi bi-ban em-2'></i>  Deleting failed!</strong><button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>";
      }
      })
      .catch(error => {
        console.error("fetch error", error);
        document.querySelector(".loadingContent").style.display = "none";
        document.querySelector(".alert").classList.add("show", "alert-danger");
        document.querySelector(".alert").classList.remove("d-none");
        document.querySelector(".alert").innerHTML = "<strong><i class='bi bi-ban em-2'></i>  Connection error!</strong><button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>";
    });
  })
  

});






