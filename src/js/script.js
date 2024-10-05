document.addEventListener("DOMContentLoaded", function () {
  const runningLines = document.querySelectorAll(".running-line__text");

  const moveLine = (runningLine) => {
    const containerWidth = runningLine.parentElement.offsetWidth;
    let position = containerWidth;

    const frame = () => {
      if (position === -runningLine.offsetWidth) position = containerWidth;
      else {
        position--;
        runningLine.style.left = position + "px";
      }
      requestAnimationFrame(frame);
    };

    frame();
  };

  runningLines.forEach((runningLine) => moveLine(runningLine));
});
