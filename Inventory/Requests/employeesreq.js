document.addEventListener("DOMContentLoaded", ()=>{
    fetch("/employees")
    .then(res => {
        if(res.ok){
            try{
            new DataTable(document.querySelector("table"));
        }catch(error) {console.error("Failed getting employees", error);}
        }else console.error("Failed getting employees");
    })
    .catch(error =>{
        console.error("Failed fetch", error);
    });




    document.querySelector(".editInfo").addEventListener("click", ()=>{
        document.querySelector(".loadingContent").style.display = "flex";
        const inputs = document.querySelectorAll(".inputs");
        const formdata = {
            employeeid : inputs[0].value,
            fullname : inputs[1].value,
            contact : inputs[3].value
        }

        fetch("/employees",{
            method : "PUT",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(formdata)
        })
        .then(res => {
        if(res.ok){
            document.querySelector(".loadingContent").style.display = "none";
            document.querySelector(".alert").classList.add("alert-success", "show");
            document.querySelector(".alert").classList.remove("d-none");
            document.querySelector(".alert").innerHTML = "<strong class='text-dark'><i class='bi bi-check2-circle em-2'></i>Updating successfully!</strong> <button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>";
            location.reload()
        }else{
            document.querySelector(".loadingContent").style.display = "none";
            document.querySelector(".alert").classList.add("show", "alert-danger");
            document.querySelector(".alert").classList.remove("d-none");
            document.querySelector(".alert").innerHTML = "<strong><i class='bi bi-ban em-2'></i>Updating failed!</strong><button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>";
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

   document.querySelector(".deleteRow").addEventListener("click", ()=>{
    document.querySelector(".loadingContent").style.display = "flex";
    const deletingValues = document.querySelectorAll(".deletingValue");
    const formdata = {
        accountid : deletingValues[0].value
    }

    fetch("/employees",{
        method: "DELETE",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(formdata)
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
   });
});