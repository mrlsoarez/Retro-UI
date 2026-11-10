let header = document.getElementsByClassName("Header");
let desktopWindow = document.getElementsByClassName("Window");
let body = document.querySelector('body')

function moveWindow(header, window) {
  
  let newY = null
  function getElementPosition(pointer, element) {
    return {
        y: pointer.pageY, 
        x: pointer.pageX,
        left: element.offsetLeft,
        top: element.offsetTop,
        width: element.offsetWidth,
        height: element.offsetHeight
    };
  }

  function onMouseMove(e) {
    let updateCoordinates = getElementPosition(e, window)
    newY = initialCoordinates.top + updateCoordinates.y - initialCoordinates.y
    console.log(newY-initialCoordinates.top)
    if (((newY-initialCoordinates.top) + updateCoordinates.height) == bodyCoordinates.height) {
      return;
    }
  
    window.style.top = (`${newY}` + 'px')
    
  }

  header.addEventListener("mousedown", (e) => {
        initialCoordinates = getElementPosition(e, window)
        bodyCoordinates = getElementPosition(e, body)
        document.addEventListener("mousemove", onMouseMove)
  });

  document.addEventListener("mouseup", (e) => {
    document.removeEventListener("mousemove", onMouseMove)
  });

}

for (let i = 0; i < header.length; i++) {
  moveWindow(header[i], desktopWindow[i])
}
