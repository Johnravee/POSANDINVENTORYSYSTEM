document.addEventListener("DOMContentLoaded", ()=>{
    document.querySelector(".editProfile").addEventListener("click", ()=>{
        const formdata = {
            modalProfileID : document.querySelector("#modalProfileID").value,
            modalFullname : document.querySelector("#modalFullname").value,
            modalEmail : document.querySelector("#modalEmail").value,
            modalContact : document.querySelector("#modalContact").value,
            modalBirthdate : document.querySelector("#modalBirthdate").value,
            address : document.querySelector("#address").value   
        }

    

        fetch("/profile",{
            method : "PUT",
            headers : {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(formdata)
        })
        .then(res => {
            res.ok ? location.reload() : console.error("update error");
        })
        .catch(error=>{
            console.error("Request failed !", error);
        });
    })
})