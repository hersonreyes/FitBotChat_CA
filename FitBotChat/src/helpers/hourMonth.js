import moment from "moment";

// Función que devuelve la hora y el mes
export const hourMonth = ( date ) => { 
    const hourMonth = moment(date);

    return hourMonth.format("HH:mm a | MMMM Do");
}