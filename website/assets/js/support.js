// === Email Reveal Block ===
    const emailBlock = document.getElementById("email-block");
    if (emailBlock) {
      const emailImg = emailBlock.querySelector("img");
      const emailHeader = emailBlock.querySelector("h4");
      const emailText = document.getElementById("email-text");
      const confirm = document.getElementById("copy-confirm");
  
      // Reveal/hide email address like a social block
      [emailImg, emailHeader].forEach((el) => {
        el.addEventListener("click", () => {
          emailBlock.classList.toggle("expanded");
        });
      });
  
      // Click-to-copy email address
      emailText.addEventListener("click", () => {
        navigator.clipboard.writeText(emailText.textContent).then(() => {
          confirm.style.opacity = 1;
          setTimeout(() => {
            confirm.style.opacity = 0;
          }, 2000);
        });
      });
    }
