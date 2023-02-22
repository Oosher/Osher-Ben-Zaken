

const clipboard = new ClipboardJS("a");


clipboard.on('success',(e)=>{
    let aText = e.trigger.children[1].innerText;
    let time = 4;
    
    const textChangeInterval = setInterval(()=>{

        e.trigger.children[1].innerText="copied";
        time--;

        if (time<0) {
            
            clearInterval(textChangeInterval);
            e.trigger.children[1].innerText=aText;  
            
        }
        
    },300)
        
    
})