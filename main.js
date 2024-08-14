function createCard(cardNumber){
    const card = arrayCards[cardNumber];
    const cardElement = document.createElement("a");
    document.querySelector(".MenayPugautEtiShtuki").appendChild(cardElement);
    cardElement.classList.add("card");

    const formatEducation = document.createElement("div");
    formatEducation.textContent = card.text1;
    cardElement.appendChild(formatEducation);
    formatEducation.classList.add("programa");

    const imageContainer = document.createElement("div");
    cardElement.appendChild(imageContainer);
    imageContainer.classList.add("pictureTitle");

    const img = document.createElement("img");
    imageContainer.appendChild(img);
    img.src ="./img/courseImg.svg";
    
    const title = document.createElement("div");
    title.textContent = card.text2;
    imageContainer.appendChild(title);
    title.classList.add("kartochkText");

    const description = document.createElement("div");
    description.textContent = card.text3;
    cardElement.appendChild(description);
    description.classList.add("programa");

    const duration = document.createElement("div");
    duration.textContent = card.text4 + " месяца";
    cardElement.appendChild(duration);
    duration.classList.add("chasy");

    if (card.text4 <= 3 ){
        cardElement.classList.add("colorGreen");
    } else if(card.text4 <=10){
          cardElement.classList.add("colorBlue");
    } else if(card.text4 > 10){
        cardElement.classList.add("colorYellow");
    }
}

let firstCard = 0;
let lastCard = 10; 
const cards = 10;
let prevActivePage = 0;
let lastPage = 2; 
let firstPage = 0;
const arrowLeft = document.querySelector(".arrow.left");
const arrowRight = document.querySelector(".arrow.right");


let arrayCards = [];

fetch("https://khocho-73180f13cb53.herokuapp.com/api/cards")
.then ((response)=>{
    return response.json();
})
.then ((response)=>{
    arrayCards = response;

    for(let i = firstCard; i <= lastCard -1 ; i++){
        createCard(i);
    
    }
    createPagination(response.length/cards);

    arrowLeft.addEventListener("click", function(event){
        // правая стрелка становится активной 
        arrowRight.disabled = false;
        // запоминаем активная страница 
        prevActivePage = prevActivePage - 1;

        // удаляем карты на страинце 
        const buttonStyleCard = document.querySelectorAll(".card");
        for( let i = 0; i <= buttonStyleCard.length -1 ; i++){
            buttonStyleCard[i].remove();
        }
        // создаем карты на стрианце 
        lastCard = (prevActivePage + 1) * cards - 1; // lastCard = 
        firstCard = cards * ((prevActivePage + 1) - 1); 
        let leaveCards = arrayCards.length - ((prevActivePage + 1) - 1) * cards;
        if( leaveCards < 10 ){
            lastCard = firstCard + leaveCards - 1; 
        } 
        for(let i = firstCard ; i <= lastCard; i++){
            createCard(i);
        }

            // текущая кнопка делаем активной, предыдщую - неактивной
            const paginationButtons = document.querySelectorAll(".pagination button:not(.arrow)");
            paginationButtons[prevActivePage + 1].classList.remove("activePage");
            paginationButtons[prevActivePage].classList.add("activePage");
            
            // делаем кнопку влево неактивной, если юзер на первой странице
            if(prevActivePage == 0){
                arrowLeft.disabled = true;
            } 

            if( prevActivePage > 0 ){
                paginationButtons[prevActivePage+2].classList.add("displayButton");
                paginationButtons[prevActivePage-1].classList.remove("displayButton");
            }
    })



    arrowRight.addEventListener("click", function(event){
        arrowLeft.disabled = false;
        prevActivePage = prevActivePage + 1; // prevActivePage  
        const buttonStyleCard = document.querySelectorAll(".card");
            for( let i = 0; i <= buttonStyleCard.length -1 ; i++){
                buttonStyleCard[i].remove();
            }
            lastCard = (prevActivePage + 1) * cards - 1; // lastCard = 
            firstCard = cards * ((prevActivePage + 1) - 1); 
            let leaveCards = arrayCards.length - ((prevActivePage + 1) - 1) * cards;
            if( leaveCards < 10 ){
                lastCard = firstCard + leaveCards - 1; 
            } 

            for(let i = firstCard ; i <= lastCard; i++){
                createCard(i);
            }
            
            const paginationButtons = document.querySelectorAll(".pagination button:not(.arrow)");
            paginationButtons[prevActivePage -1].classList.remove("activePage");
            paginationButtons[prevActivePage].classList.add("activePage");
            if(prevActivePage == paginationButtons.length -1 ){
                arrowRight.disabled = true;
            } 

            if(prevActivePage > 1 ){
                paginationButtons[prevActivePage-2].classList.add("displayButton");
                paginationButtons[prevActivePage+1].classList.remove("displayButton");
            }
    })

    let threeDots = document.createElement ("span");
        threeDots.textContent = "...";
    const paginationButtons = document.querySelectorAll(".pagination button:not(.arrow)");
    document.querySelector(".allButton").insertBefore(threeDots, paginationButtons[paginationButtons.length - 3]);

})
          

function createPagination(pageCount){

    for( let i = 1; i <= Math.ceil(pageCount); i++){
        const pageButton = document.createElement("button");
        document.querySelector(".allButton").appendChild(pageButton);
        
        if (i > 3){
            pageButton.classList.add("displayButton");
        } 
        if( i >= Math.ceil(pageCount) - 2){
            pageButton.classList.remove("displayButton");
        }

        pageButton.addEventListener("click", function(event){
            const page = event.srcElement.textContent; 
            const paginationButtons = document.querySelectorAll(".pagination button:not(.arrow)");
            
            event.srcElement.classList.add("activePage");
            paginationButtons[prevActivePage].classList.remove("activePage");
            arrowLeft.disabled = false;
            if(page == 1){
                arrowLeft.disabled = true;
            } 
            arrowRight.disabled = false;
            if(page == paginationButtons.length){
                arrowRight.disabled = true;
            }
           
            if(page - 1 < prevActivePage){
                paginationButtons[Number(page) + 1].classList.add("displayButton");
                paginationButtons[Number(page) - 3 ].classList.add("displayButton");

                paginationButtons[Number(page)].classList.remove("displayButton");
                paginationButtons[Number(page) - 2].classList.remove("displayButton");
            }

            console.log(page-1,prevActivePage)
            if(page - 1 > prevActivePage){
                paginationButtons[Number(page) - 3].classList.add("displayButton");
                paginationButtons[Number(page)].classList.remove("displayButton");
            }
            
            prevActivePage = page - 1; 
            
        
            const buttonStyleCard = document.querySelectorAll(".card");
            for( let i = 0; i <= buttonStyleCard.length -1 ; i++){
                buttonStyleCard[i].remove();
            }
            lastCard = page * cards - 1; 
            firstCard = cards * (page - 1); 
            let leaveCards = arrayCards.length - (page-1) * cards;
            if( leaveCards < 10 ){
                lastCard = firstCard + leaveCards - 1; 
            } 
            for(let i = firstCard ; i <= lastCard; i++){
                createCard(i);
            }
            
        })


        pageButton.textContent = i;
        if(i == 1){
            pageButton.classList.add("activePage");
        }
    }
}   

    const directionButtons = [
        {
            button: "Роботехника"
        },

        {
            button: "Создание игр"
        },

        {
            button: "Web-разработка"
        },

        {
            button: "Мультимедиа"
        },

        {
            button: "Шахматы"
        },

        {
            button: "3D-моделирование"
        },

        {
            button: "Английский язык"
        },

        {
            button: "Блогинг"
        },

        {
            button: "Soft-skills"
        }
    ]

    for(let i = 0; i < directionButtons.length; i++){
        const directionContainer = document.createElement("div");
        document.querySelector(".tegiknopki").appendChild(directionContainer);
        directionContainer.classList.add("umenyazakonchilisnasvania1");

        const background = document.createElement("div");
        directionContainer.appendChild(background);
        background.classList.add("fonKnopka"); 

        const directionButtonContainer = document.createElement("div");
        directionContainer.appendChild(directionButtonContainer);
        directionButtonContainer.classList.add("Knopka1");

        const directionButton = document.createElement("button");
        directionButton.textContent = directionButtons[i].button;
        directionButtonContainer.appendChild(directionButton);
        directionButton.classList.add("btn");
    }

 
