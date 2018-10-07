//aanmaken variabelen
const like = document.getElementById("like");
const dislike = document.getElementById("dislike");
const image = document.getElementsByClassName("image");
const place = document.getElementsByClassName("place");
const name = document.getElementsByClassName("name");
const status = document.getElementById("check");
const list = document.getElementsByClassName('personChoice')[0];
const update = document.getElementsByClassName("personList");
let countStorage = 0;
let test = 0;


function getData() {
    //data aanroepen uit een APi via fetch
    fetch('https://randomuser.me/api/?results=10')
    .then(function(response) {
        return response.json();
    }).then(function(data){
        addToStorage(data);
        //aanroepen van functie voor als de pagina geladen wordt
        personOnScreen();
    });
};


function addToStorage(data){
    //loop om alle personen te overlopen
    for( i = 0; i < 10; i++){
        //object waarin ik de gewenste data steek
        let personData = {
            id: "key" + countStorage,
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
        //het object in de localstorage steken met de counStorage als key
        localStorage[countStorage] = dataPerson;
        //countStorage met een waarde verhogen zodat elke persoon een volgende key krijgt
        countStorage++;
    };
    //als de loop 10 keer doorlopen is, dan wordt i gereset naar 0
    if(i=10){
        i=0;
    };
};


//functie die de gewenste persoon op het scherm
function personOnScreen(){
    //string uit localStorage halen en omzetten in object
    let person = JSON.parse(localStorage[test]);
    console.log(person);
    name[0].innerHTML = person.firstName + ', ' + person.age;
    place[0].innerHTML = person.place;
    image[0].src = person.image;
};


//als er geklikt wordt op like,
//dan wordt de functie changeLike opgeroepen
like.onclick = function(){
    changeLike("like");
};


//als er geklikt wordt op dislike,
//dan wordt de functie changeLike opgeroepen
dislike.onclick = function(){
    changeLike("dislike");
};


//functie die wordt aangeroepen als er op like of dislike wordt geklikt die de status aanpast
// en terug in local storage plaatst
function changeLike(status){
    let person = JSON.parse(localStorage[test]);
    person.choice = status;
    let dataPerson = JSON.stringify(person);
    localStorage[test] = dataPerson;
    test++;
    personOnScreen();
    if(test % 9 == 0){
        getData();
    };
};

//als er op de status button wordt geklikt, dan wordt de functie statusShow aangeroepen
status.onclick = function(){
    statusShow();
};


//functie die iedereen in localstorage overloopt en naar de forFunction doorstuurd
function statusShow(){
    let storedAmount = localStorage.length;
    list.innerHTML ="";
    //kijkt wie er geliked is
    for( a = 0; a < storedAmount; a++){
        showListLiked("like"); 
    };
    //kijkt wie er gedisliked wordt
    for( a = 0; a < storedAmount; a++){
        showListLiked("dislike");
    };
};


//functie die kijkt in localstorage wie er reeds geliked of gedisliked is
function showListLiked(keuze){
    let person = JSON.parse(localStorage[a]);
    if(person.choice == keuze){
        if(keuze == "like"){
            userChoice = "fa-heart";
        }else if( keuze == "dislike"){
            userChoice = "fa-times";
        };
        list.innerHTML += '<li class="personList clearfix" id="' + person.id + '"> <img src="' + person.image + '" alt="profile picture"><p>' + person.firstName + ' ' + person.secondName + ', ' + person.age + '</p><p>' + person.place + '</p><i class="personChoiceIcon fas ' + userChoice + '"></i> </li>';
        let personId = person.id;
        let doc = document.getElementById(personId);
        let status = person.choice;
        doc.onclick = function(){
            const res = parseInt(personId.substr(3));
            //if statement voor de keuze van de gebruiker te weizigen
            if(status == "like"){
                status = "dislike";
            }else if(status == "dislike"){
                status = "like"
            }
            //keuze van de gebruiker aanpassen in de localstorage
            let person = JSON.parse(localStorage[res]);
            person.choice = status;
            let dataPerson = JSON.stringify(person);
            localStorage[res] = dataPerson;
            //reeds gelikte/ gedislikte personen opnieuw laden
            statusShow();
        };
    };
};


//getData functie aanroepen
getData();