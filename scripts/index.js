
const navBar = document.querySelector("#navBar");

const progressBar = document.querySelector("#progressBar");

const accessabilityContainer = document.querySelector("#accessabilityContainer");

const accessabilityOptions = document.querySelector("#accessabilityOptions");

const accessabilityImg = document.querySelector("#accessabilityImg");

const closeAccessabilityMenu = document.querySelector("#closeAccessabilityMenu");

const increaseFontSize = document.querySelector("#increaseFontSize");

const decreaseFontSize = document.querySelector("#decreaseFontSize");

const grayscale = document.querySelector("#grayscale");

const contrast = document.querySelector("#contrast");

const biggerCursor = document.querySelector("#biggerCursor");

const underline = document.querySelector("#underline");

const menuIcon  = document.querySelector(".menuIcon");

const fullName = document.querySelector("#fullName");

const email = document.querySelector("#email");

const phoneNumber = document.querySelector("#phoneNumber");

const messageUs  = document.querySelector("#messageUs");

const sendFormButton  = document.querySelector("#sendFormButton");

const allElements =  document.getElementsByTagName("*");


let tempArray = allElements;

let accessabilityState = false;

let isGrayScale = false;

let contrasted = false;

let underlined = false;

let isEnlarged = false;

let menuIsOpen = false;

let additiveFontSize = 0;

const baseFontSize = 1.2;

//on scroll progress bar
window.onscroll =()=>{

    let userPositionFromTheTop = document.documentElement.scrollTop;
    let totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (userPositionFromTheTop / totalHeight) * 100;
    progressBar.style.width = scrolled + "%";

    }


    //accessability start 

    accessabilityImg.addEventListener("click",openAccessabilityMenu);

    closeAccessabilityMenu.addEventListener("click",openAccessabilityMenu);

    increaseFontSize.addEventListener("click",()=>{
        additiveFontSize+=0.15;
        changeFontSize();
        
    });

    decreaseFontSize.addEventListener("click",()=>{

    additiveFontSize-=0.15;
    changeFontSize();

    });


    grayscale.addEventListener("click",()=>{

        for (const key in allElements) {
            if (allElements[key].style!=undefined) {
                if (isGrayScale) {
                    allElements[key].style.webkitFilter ="grayscale(0%)";
                    grayscale.style.backgroundColor="white";
                }
                else{
                    allElements[key].style.webkitFilter ="grayscale(100%)";
                    grayscale.style.backgroundColor="dodgerblue";
                }
            }
            
        }

        isGrayScale = !isGrayScale;

    });

    contrast.addEventListener("click",()=>{

        for (const key in allElements) {
            if (allElements[key].style!=undefined ) {
                if (contrasted) {
                    allElements[key].style.webkitFilter ="contrast(100%)";
                    contrast.style.backgroundColor="white";
                }
                else {
                    allElements[key].style.webkitFilter ="contrast(150%)";
                    contrast.style.backgroundColor="dodgerblue";
                    
                }
                
            }
        }
            contrasted = !contrasted;
    });


biggerCursor.addEventListener("click",()=>{
    if (isEnlarged) {
        document.body.style.cursor= "default";
        biggerCursor.style.backgroundColor="white";
    }else{
        document.body.style.cursor ="url(./images/cursor.png),auto";
        biggerCursor.style.backgroundColor="dodgerblue";
    }

    isEnlarged =!isEnlarged;
});

underline.addEventListener("click",()=>{

        for (const key in allElements) {
            if (allElements[key].style!=undefined) {
                if (underlined) {
                    allElements[key].style.textDecoration= "none";
                    underline.style.backgroundColor="white";
                }
                    else {
                    allElements[key].style.textDecoration= "underline";
                    underline.style.backgroundColor="dodgerblue";
                    }
                
            }
        }

        underlined =!underlined;

});

function openAccessabilityMenu(){

    if(accessabilityState){

        accessabilityOptions.style.display="none";
        accessabilityImg.style.display="block";

        accessabilityState=false;



    }
    else{

        accessabilityOptions.style.display="flex";
        accessabilityImg.style.display="none";

        accessabilityState = true;

        console.log(accessabilityState);
        

    }
}



function changeFontSize (){

        for (const key in allElements) {
            if (allElements[key].style!=undefined) {
                allElements[key].style.fontSize =(baseFontSize+additiveFontSize)+"rem";
            }
            
        }
}




menuIcon.addEventListener("click",()=>{


    if (menuIsOpen) {
        navBar.style.display="none";
        menuIsOpen=false;

    }
    else{
        navBar.style.display="block";
        menuIsOpen=true;
    }



})





//form validation 






sendFormButton.addEventListener("click",formValidation);



function formValidation(){


    if (email.value==""||fullName.value==""||phoneNumber.value==""||messageUs.value=="") {
        alert("All fields must be filled")
        return;
    }


    if(!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.value))){

        alert("Must submit a Valid email  address")
        return;
        
    }


    if (phoneNumber.value.length<9||phoneNumber.value.length>10) {
        
        alert("Phone number must be between 9 to 10 digits exactly")
        return;
    }

    fullName.value="";
    email.value="";
    phoneNumber.value=""
    messageUs.value=""

    alert("Thank you For messaging us")





}