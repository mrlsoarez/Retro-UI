
let header = document.getElementsByClassName("Header");
let desktopWindow = document.getElementsByClassName("Window");
let body = document.querySelector('body')

function moveWindow(header, window) {
  
  let newY 
  let newX
  let initialCoordinates 
  let bodyCoordinates

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
    newX = initialCoordinates.left + updateCoordinates.x - initialCoordinates.x
    
    if ((newY + window.offsetHeight) >= bodyCoordinates.height || (newX + window.offsetWidth) >= bodyCoordinates.width) {
      return
    }

    if (window.offsetTop < 0) {
      window.style.top = '0px'
      return
    }

    if (window.offsetLeft < 0) {
      window.style.left = '0px'
      return
    }
  
    window.style.top = (`${newY}` + 'px')
    window.style.left = (`${newX}` + 'px')
  }

  // Event for when the mouse is pressed down and moved on the header  
  header.addEventListener("mousedown", (e) => {
        initialCoordinates = getElementPosition(e, window)
        bodyCoordinates = getElementPosition(e, body)
        document.addEventListener("mousemove", onMouseMove)
  });

  // Event for when the mouse is released
  document.addEventListener("mouseup", (e) => {
    document.removeEventListener("mousemove", onMouseMove)
  });

}

for (let i = 0; i < header.length; i++) {
  moveWindow(header[i], desktopWindow[i])
}
