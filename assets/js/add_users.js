const addBtn = document.querySelector(".add-btn");

addBtn.addEventListener("click", async () => {
    const username = document.querySelector("#username").value;
    const lastname = document.querySelector("#lastname").value;
    const age = document.querySelector("#age").value;
    const address = document.querySelector("#address").value;
    const email = document.querySelector("#email").value;

    const user = {
        username,
        lastname,
        age,
        email,
        address
    };

    await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
});