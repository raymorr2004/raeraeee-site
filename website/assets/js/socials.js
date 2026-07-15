document.addEventListener("DOMContentLoaded", function () {
    // === Expand Social Links on Click ===
    const socialBoxes = document.querySelectorAll(".social-link");
  
    socialBoxes.forEach((box) => {
      const img = box.querySelector("img");
      const header = box.querySelector("h4");
  
      [img, header].forEach((element) => {
        element.addEventListener("click", function (e) {
          e.stopPropagation();
          box.classList.toggle("expanded");
        });
      });
    });
  
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
  });
  
    
    
    
    