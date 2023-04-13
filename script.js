let data = []
let cardid;

let plusbutton = document.getElementById("plusbutton")
let popup1 = document.getElementById("popup1")
plusbutton.addEventListener("click", () =>{
    popup1.style.display = "block"
    // popup1.classList.add("mystyle")
    console.log("its me");
})
let btn2 = document.getElementById("btn2")
btn2.addEventListener("click", () =>{
    popup1.style.display = "none"
    console.log("its me2");
})


console.log("data", data);
// let popup2 = document.getElementById("popup2")
let btn1 = document.getElementById("btn1")
btn1.addEventListener("click", () =>{

    // popup2.style.display = "block"
    popup1.style.display = "none"
    console.log("its me");
    let mytext = document.getElementById("inp").value

    let mytodo = {
        id: new Date().getTime().toString(),
        text: mytext,
        content: []  
    }
    if(mytext){
        data.push(mytodo)
        addtask()
    }else{
        alert("please enter your destination")
    }
    document.getElementById("inp").value = ""; 
})
function rendercontent(){
    for(let i = 0; i<data.length; i++){
        let ulelement = document.getElementById(`idforcard_${data[i].id}`)
        let child = ""
        for(let j = 0; j<data[i].content.length; j++){
            let content = data[i].content[j]
            child += `<li class="content ${content.done ? "checked": ""}" id="content_${content.id}" onclick="donetask(${content.id}, ${data[i].id})">${content.contenttext}</li>`
        }
        ulelement.innerHTML = child
    } 
}
let cardcontainer = document.querySelector("#card")
 let addtask = () =>{
    let child = ""
    for(let i = 0; i<data.length; i++){
        console.log(data);
       child += `<div id = ${data[i].id} class="popup2">
       <p class="p2">${data[i].text}</p>
       <hr>
       <ul id="idforcard_${data[i].id}">
       </ul>
       <div class="container2">
       <Button class="delete" onclick="removesecondpopup(${data[i].id})">D</Button>
       <Button class="add" onclick = "thirdpopup(${data[i].id})">+</Button>
       </div>
       </div>`
       
       console.log(data[i].id);
       console.log(data[i].text);
    }
    cardcontainer.innerHTML = child
    rendercontent()
}

function removesecondpopup(id){
    let cardcontainer = document.querySelector("#card")
    let cardsid = `${id}`
    let cards = document.getElementById(cardsid)
    cards.parentNode.removeChild(cards)
    data = data.filter(item => item.id !== cardsid)
}
function thirdpopup(id){
    let popup3 = document.getElementById("popup3")
    popup3.style.display = "block"
    cardid = id
}

function removethirdpopup(){
    let popup3 = document.getElementById("popup3")
    popup3.style.display = "none"
}

function addcontenttopopup2() {
    // let popup2 = `${data[i].id}`
    // let Rpopup2 = document.getElementById(popup2)
    // Rpopup2.style.display = "none"
    let contentlistid = `idforcard_${cardid}`
    let list = document.getElementById(contentlistid)
    let contenttext = document.getElementById("inp2").value
    if(contenttext){
    document.getElementById("inp2").value = "";
    let linode = document.createElement("li")
    let listId = new Date().getTime().toString()
    linode.innerHTML = contenttext
    linode.className = "content"
    linode.id = `content_${listId}`
    linode.onclick = function () {
        donetask(listId, cardid)
    }
    list.appendChild(linode);
    removethirdpopup()

    for(let i = 0; i<data.length; i++){
        if(data[i].id == cardid){
            const content = {
                // id: new Date().getTime().toString(),
                id : listId,
                contenttext: contenttext,
                done: false,
            }
            data[i].content.push(content);
        }
    }
    }else{
        alert("please add your Task")
    }  
}

function donetask(taskId, cardId){
     let contentId = `content_${taskId}`
     let LiElement = document.getElementById(contentId)
     LiElement.classList.toggle("checked")

     for(let i= 0; i<data.length; i++){
        if(data[i].id == cardId){
            for(let j = 0; j<data[i].content.length; j++){
                let content = data[i].content[j]
                if(content.id == taskId){
                    data[i].content[j].done = true
                }
            }
        }
     }
}






  



