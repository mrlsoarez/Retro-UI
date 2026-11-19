
let desktopWindow = document.getElementsByClassName("Window")
let body = document.querySelector('body')

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

function calculateNewPosition(windowPosition, newCoordinates, initialCoordinates) {
  return windowPosition + newCoordinates - initialCoordinates
}

function moveWindow(header, window) {

  let initialCoordinates 
  let bodyCoordinates

  function onMouseMove(e) {
   
    let updateCoordinates = getElementPosition(e, window)
    
    let newY = calculateNewPosition(initialCoordinates.top, updateCoordinates.y, initialCoordinates.y)
    let newX = calculateNewPosition(initialCoordinates.left, updateCoordinates.x, initialCoordinates.x)
    
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
    window.style.cursor = 'default'
  });

}

function resizeWindow(border) {

  let initialCoordinates 
  let bodyCoordinates

  function getWindow(border) {
      let window = border.parentElement 
      return window 
  }

  function onMouseMove(e) {

    let updateCoordinates = getElementPosition(e, window)
    
    let borderSide = border.id

    let newWidth 
    let newHeight 
    let newLeft
    let newTop
    
    let resizeEvent = {'right': 
                      {'function': () => {
                      newWidth = initialCoordinates.width + (updateCoordinates.x - initialCoordinates.x)
                      window.style.width = (newWidth) + 'px' 
                      window.style.cursor = 'ew-resize'},
                      'height': null 
                      },

                    'bottom':
                    {'function': () => {
                      newHeight = initialCoordinates.height + (updateCoordinates.y - initialCoordinates.y)
                      window.style.height = (newHeight) + 'px' 
                      window.style.cursor = 's-resize'},    
                    },

                    'left':
                     {'function': () => {
                      newWidth = initialCoordinates.width- (updateCoordinates.x - initialCoordinates.x)
                      newLeft = initialCoordinates.left + (updateCoordinates.x - initialCoordinates.x)
                      window.style.width = (newWidth) + 'px' 
                      window.style.left = newLeft + 'px'
                      window.style.cursor = 'ws-resize'},    
                    }

                }

    if (newWidth >= bodyCoordinates.width - 5 || newHeight >= bodyCoordinates.height - 5) {
      return  
    }
    if (window.offsetWidth <= 200) {
      window.style.width = (window.offsetWidth + 1) + 'px'
      return
    }
    
    if (window.offsetHeight <= 200) {
      window.style.height = window.offsetHeight + 1 + 'px'
      return
    }

    resizeEvent[borderSide]['function']()
    //window.style.width = (newWidth) + 'px'
    //window.style.height = (newHeight) + 'px'
  }

  let window = getWindow(border) 

  border.addEventListener("mousedown", (e) => {
    initialCoordinates = getElementPosition(e, window)
    bodyCoordinates = getElementPosition(e, body)
    document.addEventListener("mousemove", onMouseMove)
  })

  document.addEventListener("mouseup", (e) => {
    document.removeEventListener("mousemove", onMouseMove)
    window.style.cursor = 'pointer'
  });
}



let header = document.getElementsByClassName("Header")
for (let i = 0; i < header.length; i++) {
  moveWindow(header[i], desktopWindow[i])
}


let border = document.querySelectorAll(".Border")
for (let i = 0; i < border.length; i++) {
  resizeWindow(border[i])
}
