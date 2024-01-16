document.addEventListener("DOMContentLoaded", ()=>{
        const editButtons = document.querySelectorAll(".editBtn");
        const inputs = document.querySelectorAll(".inputs");
        const modalProductImage = document.querySelector(".modalProductImage");
        const imageInput = document.querySelector('#file');
        const previewImage = document.querySelector('#imagePrev');
        const selectedDeleteProduct = document.querySelectorAll(".selectedDeleteProduct");
        const productIDInputModal = document.querySelector(".productIDInput");
        
        selectedDeleteProduct.forEach(deleteItem =>{
           deleteItem.addEventListener("click", ()=>{
                const imgDatas = deleteItem.closest("tr").querySelectorAll(".productImg");
                const rowid = deleteItem.closest("tr").querySelectorAll(".productId");
                document.querySelector(".modalDeleteimg").src = imgDatas[0].src;
            
                productIDInputModal.value = rowid[0].textContent;
           })
            
            
        })
        

  
        
        editButtons.forEach((button) => {
            button.addEventListener("click",  () => {
            
                const imgDatas = Array.from(button.closest("tr").querySelectorAll(".productImg"));
                const rowDatas = Array.from(button.closest("tr").querySelectorAll("span"))
                
                modalProductImage.src = imgDatas[0].src
               inputs.forEach((input, index) =>{

                    input.value =  rowDatas[index].textContent;
                    
               })
 
               
            });
})


imageInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            
            if(file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/png"){
                if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                previewImage.src = event.target.result;
                };

                reader.readAsDataURL(file);
            }
            }else{
                document.querySelector(".fileAlert").classList.add("show", "alert-danger"),
                document.querySelector(".fileAlert").classList.remove("d-none"),
                document.querySelector(".fileAlert").innerHTML = "<strong><i class='bi bi-ban em-2'></i> File type is not supported!</strong><button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>"
            }
            });


           

        })
      





            

            


