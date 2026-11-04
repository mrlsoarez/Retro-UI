let div = document.querySelectorAll(".Header")

function onMouseMove(e) {
  console.log(e.pageX, e.pageY);
}

div.forEach((d) => {
    d.addEventListener('mousedown', (e) => {
        document.addEventListener("mousemove", (e) => { onMouseMove(e) })
        })
    document.addEventListener("mouseup", () => {})
    })
