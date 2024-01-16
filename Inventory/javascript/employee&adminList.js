document.addEventListener("DOMContentLoaded", function () {
        const editButtons = document.querySelectorAll(".editBtn");
        const inputs = document.querySelectorAll(".inputs");
        const deletebtns = document.querySelectorAll(".deleteRowData");
        const deletingValues = document.querySelectorAll(".deletingValue");

        deletebtns.forEach(deletebtn =>{
            deletebtn.addEventListener("click", ()=>{
                const rowDatas = Array.from(deletebtn.closest("tr").querySelectorAll("span"))
               deletingValues.forEach((deletingValue, index) =>{
                    deletingValue.value =  rowDatas[index].textContent;       
               })   
            })
        })


        editButtons.forEach(button => {
            button.addEventListener("click",  () => {
            
                const rowDatas = Array.from(button.closest("tr").querySelectorAll("span"))
               inputs.forEach((input, index) =>{
                    input.value =  rowDatas[index].textContent
               })

               
               
            });
        });
    });