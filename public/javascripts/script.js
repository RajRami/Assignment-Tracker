//Custom JS for user interaction

//Getting current date
function getDate(){
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    
    //Getting date in a perticular format
    let currentDate = `${day}-${month}-${year}`;
    return date;
}
