//aanmaken variabelen
const like = document.getElementById("like");
const dislike = document.getElementById("dislike");
const image = document.getElementsByClassName("image")[0];
const place = document.getElementsByClassName("place")[0];
const name = document.getElementsByClassName("name")[0];
const status = document.getElementById("check");
const list = document.getElementsByClassName('personChoice')[0];
let countStorage = 0;
let test = 0;
let counter = 0;


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
    //loop om alle personen te overlopen en in ee object te steken
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
    name.innerHTML = person.firstName + ', ' + person.age;
    place.innerHTML = person.place;
    image.src = person.image;
};


//als er geklikt wordt op like, dan wordt de functie changeLike opgeroepen
like.onclick = function(){
    changeLike("like");
};


//als er geklikt wordt op dislike, dan wordt de functie changeLike opgeroepen
dislike.onclick = function(){
    changeLike("dislike");
};


//functie die wordt aangeroepen als er op like of dislike wordt geklikt die de status aanpast en terug in local storage plaatst
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
    let containerDiv = document.getElementsByClassName("container")[0];
    let statusDiv = document.getElementsByClassName("status")[0]
    //als er nog geen likes of dislikes zijn aangeklikt, dan krijg je een alert
    if(test !== 0){
        //wisselt de class not-visible over de 2 div's
        containerDiv.classList.toggle('not-visible');
        statusDiv.classList.toggle('not-visible');
    }else{
        alert("Maak eerst je keuze bij je eerste match voordat je een overzicht krijgt van de reeds doorlopen personen");
    }
    statusShow();
};


//functie die iedereen in localstorage overloopt en naar de forFunction doorstuurd
function statusShow(){
    counter = 0;
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
    if(person.choice == keuze && keuze == "like"){
        userChoice = "fa-heart";
        counter++;
        list.innerHTML += '<li class="personList clearfix"> <img src="' + person.image + '" alt="profile picture"><p>' + person.firstName + ' ' + person.secondName + ', ' + person.age + '</p><p>' + person.place + '</p><i class="personChoiceIcon fas ' + userChoice + '" id="' + person.id + '"></i> </li>';
    }else if(person.choice == keuze && keuze == "dislike"){
        userChoice = "fa-times";
        counter++;
        list.innerHTML += '<li class="personList clearfix"> <img src="' + person.image + '" alt="profile picture"><p>' + person.firstName + ' ' + person.secondName + ', ' + person.age + '</p><p>' + person.place + '</p><i class="personChoiceIcon fas ' + userChoice + '" id="' + person.id + '"></i> </li>';
    };
};


//eventlistener, als er geklikt wordt op een element binnen mijn ol
document.getElementById("personChoice").addEventListener("click", function(e) {
    //er wordt gekeken of er geklikt is op een i-element
    if(e.target && e.target.nodeName == "I"){
        let key = e.target.id;
        let res = parseInt(key.substr(3));
        let person = JSON.parse(localStorage[res]);
        let status = person.choice
        //switch van like naar dislike of dislike naar like
        if(status == "like"){
            status = "dislike";
        }else if(status == "dislike"){
            status = "like";
        }
        //plaatst nieuwe keuze in de localStorage
        person.choice = status;
        let dataPerson = JSON.stringify(person);
        localStorage[res] = dataPerson;
        //refresht de personen
        statusShow();
    }
})


//getData functie aanroepen
getData();