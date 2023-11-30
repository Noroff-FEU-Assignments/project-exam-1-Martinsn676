
function checkInput(target,req,neg){
    const messageField = target.querySelector(".message")
    const input = target.querySelector("#input").value
    localStorage.setItem(`${target.id}`, JSON.stringify(input));

    if(req==="email"){
        if((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input))){
            messageField.innerText = "";
            return input;
        }else{
            messageField.innerText = `${neg}`
            return (false);
        }
    }else if(req==="twoWords"){
        if(input.includes(" ")){
            const [firstName, lastName] = input.split(" ");
s
            if(firstName.length>1 && lastName.length>1){
                messageField.innerText = "";
                return input;
            }  
        }
        return (false);
    }else if(input.length>req-1){
        messageField.innerText = "";
        return input;
    }else{
        messageField.innerText = `${neg} ${input.length}/${req}`
        return (false);
    }
}

const emailFieldContainer = document.querySelector("#emailFieldContainer")
emailFieldContainer.addEventListener("keyup",()=>checkInput(emailFieldContainer,"email","Not a valid e-mail yet"))

const nameContainer = document.querySelector("#nameContainer")
nameContainer.addEventListener("keyup",()=>checkInput(nameContainer,5,""));

const subjectContainer = document.querySelector("#subjectContainer")
subjectContainer.addEventListener("keyup",()=>checkInput(subjectContainer,15,""));

const messageContainer = document.querySelector("#messageContainer")
messageContainer.addEventListener("keyup",()=>checkInput(messageContainer,25,""));

const submitButton = document.querySelector("#submitButton")

const inputFields = ["emailFieldContainer","nameContainer","subjectContainer","messageContainer"]
submitButton.addEventListener("click",()=>checkAllInputs());
let saveLoaded = false;
function checkForUnsent(){
    inputFields.forEach(element => {
        oldInput = JSON.parse(localStorage.getItem(`${element}`));
        if(oldInput && oldInput.length>0){
            field=document.querySelector(`#${element} #input`);
            field.value=oldInput;
            saveLoaded=true
        }
    });
    if(saveLoaded){
        document.querySelector("#saveMessage").innerHTML= `
        <div>Welcome back, we saved your form</div>
        <button onclick='resetForm()'>Reset it</button>`
    }
}
function resetForm(){
    inputFields.forEach(element => {
        field=document.querySelector(`#${element} #input`);
        field.value=""
        localStorage.removeItem(`${element}`);
    });
    document.querySelector("#saveMessage").innerHTML=""

}
checkForUnsent()
function checkAllInputs(){
    emailInput = checkInput(emailFieldContainer,"email","Please write a valid e-mail") 
    nameInput = checkInput(nameContainer,5,"Please write your full name") 
    subjectInput = checkInput(subjectContainer,15,"Please write a longer subject")
    messageInput = checkInput(messageContainer,25,"Please write a longer message")
    sumbitArray = [emailInput,nameInput,subjectInput,messageInput]
    let errors = 0
    sumbitArray.forEach(element => {
        if(element === false){
            errors++
        }
    });
    if(errors===0){
        localStorage.clear()
        localStorage.setItem('message', JSON.stringify(sumbitArray));
    }else{
        document.querySelector("#submitMessage").innerText=`Please correct ${errors} error(s)`
        document.querySelector("#contactPage").classList.add("rough")
    }
    }
