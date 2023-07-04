import { animateScroll } from "react-scroll";

//Funcion para hacer scroll hacia abajo
export const scrollToBottom = ( id ) => {
    animateScroll.scrollToBottom({
        containerId: id,
        duration: 0
    });
}
//Funcion para hacer scroll hacia abajo con animacion
export const scrollToBottomAnimated = ( id ) => {
    animateScroll.scrollToBottom({
        containerId: id,
        duration: 250
    });
}