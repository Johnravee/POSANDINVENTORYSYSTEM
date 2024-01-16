document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.querySelector(".login");
  const password = document.querySelector("#password");
  const empID = document.querySelector("#empID");
  loginBtn.addEventListener("click", () => {
    document.querySelector(".loadingContent").style.display = "flex";
    const formdata = {
      employeeId: empID.value,
      employeePassword: password.value,
    };

    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formdata),
    })
      .then((res) => {
        if (res.ok) {
          window.location = "/dashboard";
          document.querySelector(".loadingContent").style.display = "none";
          
        } else {
          document.querySelector(".loadingContent").style.display = "none";
          document.querySelector(".alert").classList.add("show", "alert-danger"),
          document.querySelector(".alert").classList.remove("d-none"),
          document.querySelector(".alert").innerHTML = "<strong><i class='bi bi-ban em-2'></i>Invalid credentials!</strong>"
        }
      })
      .catch((error) => {
          document.querySelector(".loadingContent").style.display = "none";
          document.querySelector(".alert").classList.add("show", "alert-danger"),
          document.querySelector(".alert").classList.remove("d-none"),
          document.querySelector(".alert").innerHTML = "<strong><i class='bi bi-ban em-2'></i>Connection error!</strong><button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>"
        console.error("Fetch error", error);
      });
  });
});

