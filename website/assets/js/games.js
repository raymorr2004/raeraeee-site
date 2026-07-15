document.addEventListener("DOMContentLoaded", function () {
    const isGamesPage = document.body.id === "games-page";
    if (!isGamesPage) return;
  
    const gameCards = document.querySelectorAll(".game-card");
  
    gameCards.forEach((card) => {
      const header = card.querySelector("h4");
      const image = card.querySelector("img");
  
      const toggleCard = () => {
        card.classList.toggle("expanded");
      };
  
      header.addEventListener("click", toggleCard);
      image.addEventListener("click", toggleCard);
    });
  });