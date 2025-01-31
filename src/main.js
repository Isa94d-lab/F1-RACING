document.getElementById("background-div").addEventListener("mouseover", function () {
    const video = document.getElementById("background-video");
    video.style.display = "block";
    video.play();
  });

document.getElementById("background-div").addEventListener("mouseout", function () {
    const video = document.getElementById("background-video");
    video.pause();
    video.currentTime = 0;
    video.style.display = "none";
  });
