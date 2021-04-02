const fetch = require('node-fetch');
const fs = require('node-fs');
const tasks = require('./tasks');


let posts = [];
let users = [];

const fetchData = async () =>{
    try{
        posts = await fetch("https://jsonplaceholder.typicode.com/posts").then(res => res.json());
        users = await fetch("https://jsonplaceholder.typicode.com/users").then(res => res.json());
    } catch(err){
        console.log(err);
    }
}
const loadData = (posts_path, users_path) => {
    let rawposts = fs.readFileSync(posts_path);
    let rawusers = fs.readFileSync(users_path);

    posts = JSON.parse(rawposts);
    users = JSON.parse(rawusers);

    main();
}

function init(){
    console.log("Hello");
    const dataVariant = process.argv[2];

    switch (dataVariant){
        case '0':
            console.log("Fetching data");
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
            console.log("Input option not provided or not correct. Switching to default data set")
            console.log("Default data");
            fetchData().then(()=>main());
            break;
    }
}
init();



function main(){
    console.log("Liczba postów napisanych przez poszczególnego użytkownika");
    console.log(tasks.getPostsPerUser(posts, users));

    console.log("Lista tytułów, które nie są unikalne: ");
    console.log(tasks.getDuplicatedTitles(posts));

    console.log("Lista użytkowników i ich najbliższych sąsiadów");
    console.log(tasks.getNeighbours(users));
}

