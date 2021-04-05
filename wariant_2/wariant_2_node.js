// Dependencies
const fetch = require('node-fetch');
const fs = require('node-fs');
const tasks = require('./tasks');

// Global arrays for data
let posts = [];
let users = [];

const fetchData = async () =>{
    try{
        // Fetch remote data
        posts = await fetch("https://jsonplaceholder.typicode.com/posts").then(res => res.json());
        users = await fetch("https://jsonplaceholder.typicode.com/users").then(res => res.json());
    } catch(err){
        console.log(err);
        console.log("Pobranie danych nie powiodło się. Koniec programu.");
        process.exit();
    }
}
const loadData = (posts_path, users_path) => {
    try{
        // Load local data synchronously
        let rawposts = fs.readFileSync(posts_path);
        let rawusers = fs.readFileSync(users_path);
        posts = JSON.parse(rawposts);
        users = JSON.parse(rawusers);
        if(posts.length == 0 && users.length == 0){
            console.log("Brak danych. Koniec programu");
            process.exit();
        }
        main();
    }catch(err){
        console.log(err);
        console.log("Wczytanie danych lokalnych nie powiodło się. Koniec programu.")
        process.exit();
    }
}
function init(){
    // Get the program input parameter
    const dataVariant = process.argv[2];

    switch (dataVariant){
        case '0':
            // This is the default scenario
            console.log("Pobieranie danych");
            fetchData().then(()=>main());
            break;
        case '1':
            console.log("Dane testowe #1");
            // Duplicated post titles and different number of posts per user
            loadData('./test_01/posts.json', './test_01/users.json');
            break;
        case '2':
            console.log("Dane testowe #2");
            // User without any posts for example lack of posts with userId = 2
            loadData('./test_02/posts.json', './test_02/users.json');
            break;
        case '3':
            console.log("Dane testowe #3");
            // Posts with userId that corresponds to non existing user
            // Gives information about posts that cannot be linked to any user
            // Also user ids are mixed - not in 1,2, ... ,10 order
            loadData('./test_03/posts.json', './test_03/users.json');
            break;
        case '4':
            console.log("Dane testowe #4");
            // Users coordinates are modified so that one user can have multiple neighbours
            // If two users share the same coordinates they become each other neighbour
            // Also one user has wrong cooridanetes - out of range
            loadData('./test_04/posts.json', './test_04/users.json');
            break;
        default:
            console.log("Parametr programu nie został podany albo jest nieprawidłowy.")
            console.log("Przełączanie na tryb domyślny");
            fetchData().then(()=>main());
            break;
    }
}
function main(){
    console.log("\n");
    console.log("Liczba postów napisanych przez poszczególnego użytkownika");
    console.log(tasks.getPostsPerUser(posts, users));
    console.log("\n");

    console.log("Lista tytułów, które nie są unikalne: ");
    console.log(tasks.getDuplicatedTitles(posts));
    console.log("\n");

    console.log("Lista użytkowników i ich najbliższych sąsiadów");
    console.log(tasks.getNeighbours(users));
    console.log("\n");
}

init();

