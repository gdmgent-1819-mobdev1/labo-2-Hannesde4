//aanmaken variabelen
const like = document.getElementById("like");
const dislike = document.getElementById("dislike");
const image = document.getElementsByClassName("image");
const place = document.getElementsByClassName("place");
const name = document.getElementsByClassName("name");
let countStorage = 0;
let test = 0;

getData();

function getData() {
    fetch('https://randomuser.me/api/?results=10')
    .then(function(response) {
        return response.json();
    }).then(function(data){
        addToStorage(data);
        //aanroepen van functie voor als de pagina geladen wordt
        personOnScreen();
    });
}

function addToStorage(data){
    //loop om alle personen te overlopen
    for( i = 0; i < 10; i++){
        //object waarin ik de gewenste data steek
        let personData = {
            firstName:  data.results[i].name.first,
            secondName: data.results[i].name.last,
            place: data.results[i].location.city,
            age: data.results[i].dob.age,
            gender: data.results[i].gender,
            choice: "none",
            image: data.results[i].picture.large
        }
        //het object in een variabele steken
        let dataPerson = JSON.stringify(personData);
        localStorage[countStorage] = dataPerson;
        //console.log(dataPerson);
        countStorage++;
    };
    if(i=10){
        i=0;
    };
}


//functie die de gewenste persoon op het scherm
function personOnScreen(){
    //string uit localStorage halen en omzetten in object
    let person = JSON.parse(localStorage[test]);
    console.log(person);
    console.log("klik");
    name[0].innerHTML = person.firstName + ', ' + person.age;
    place[0].innerHTML = person.place;
    image[0].src = person.image;
};


//als er geklikt wordt op like,
//dan wordt de functie changeLike opgeroepen
like.onclick = function(){
    let status = "like";
    changeLike(status); 
}


//als er geklikt wordt op dislike,
//dan wordt de functie changeLike opgeroepen
dislike.onclick = function(){
    let status = "dislike";
    changeLike(status);
}


//functie die wordt aangeroepen als er op like of dislike wordt geklikt die de status aanpast
// en terug in local storage plaatst
function changeLike(status){
    let person = JSON.parse(localStorage[test]);
    person.choice = status;
    let dataPerson = JSON.stringify(person);
    localStorage[test] = dataPerson;
    personOnScreen();
    test++;
    if(test % 9 == 0){
        getData();
    }
}