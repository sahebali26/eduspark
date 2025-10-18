  // Feedback Form Submission
let url = 'https://script.google.com/macros/s/AKfycbybC-cwOD-6sWk-PpPqZIqNJuMOtC0rV3QD3SFKlGSOiNOItASsGNWNQie1DMDHqP2l/exec';
let form = document.querySelector('#feedback-form');
let button = form.querySelector('.btn'); // your submit button

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let d = new FormData(form);

    // ✅ show spinner
    const originalText = button.textContent;
    button.disabled = true;
    button.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Sending...`;

    fetch(url, {
        method: "POST",
        body: d
    })
    .then((res) => res.text()) // if backend returns plain text
    .then((finalRes) => {
        console.log(finalRes);

        // ✅ Clear the form fields
        form.reset();

        // ✅ restore button
        button.disabled = false;
        button.textContent = originalText;

        // ✅ Show success message
        let msg = document.createElement("p");
        msg.innerText = "✅ Feedback submitted successfully!";
        msg.style.color = "green";
        msg.style.marginTop = "10px";

        let oldMsg = document.querySelector(".success-msg");
        if (oldMsg) oldMsg.remove();

        msg.classList.add("success-msg");
        form.appendChild(msg);

        setTimeout(() => msg.remove(), 3000);
    })
    .catch(err => {
        console.error("Error:", err);

        // ✅ restore button on error
        button.disabled = false;
        button.textContent = originalText;

        alert("❌ Something went wrong. Try again.");
    });
});