//Custom JS for user interaction

// Confirm delete method
function confirmDelete(){
    return confirm("Are you sure you want to delete this item?")
}

//Password Check
function comparePasswords(){
    let password = document.getElementById('password').value
    let confirm = document.getElementById('confirm').value
    let msgLabel = document.getElementById('msgLabel')

    if(password != confirm){
        msgLabel.innerText = "Password does not match"
        msgLabel.className = "text-danger"
        return false
    }
    else{
        msgLabel.innerText = ""
        msgLabel.className = ""
        return true
    }
}