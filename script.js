
const musicButton = document.getElementById("music-button");
const musicPlayer = document.getElementById("music-player");

musicButton.addEventListener("click", function () {
    musicPlayer.src =
        "https://www.youtube.com/embed/hSN6-AMdDOo?autoplay=1&loop=1&playlist=hSN6-AMdDOo&enablejsapi=1";

    musicButton.textContent = "🚗 SQUISHY TIME";
});
