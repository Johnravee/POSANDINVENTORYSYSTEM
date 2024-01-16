document.addEventListener("DOMContentLoaded", ()=>{

    document.querySelector(".logoutbtn").addEventListener("click", ()=>{
        fetch("/logout")
    .then(res =>{
        res.ok ? window.location = "/login" : console.error("not ok");
    })
    .catch(error =>{
        console.error("Logout request error", error);
    })
    })

    
})