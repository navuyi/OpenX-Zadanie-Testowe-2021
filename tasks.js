function getPostsPerUser(posts, users){
    let final_arr = [];
    let userList = [];

    if(posts.length == 0 || users.length ==0){
        return "Missing data"
    }

    // Create array of user objects
    users.forEach((user)=>{
        userList.push({
            userId: user.id,
            username: user.username,
            postCount: 0
        });
    })

    // Count number of post per user
    posts.forEach((post)=>{
        let found = false;
        for(i=0; i<userList.length; i++){
            let user = userList[i];
            if(post.userId == user.userId){
                user.postCount += 1;
                found = true;
                break;
            }
        }
        if(found == false){
            userList.push({
                userId: post.userId,
                username: `[Nieznany id:${post.userId}]`,
                postCount: 1
            })
        }
    });
    // Create required array of strings
    userList.forEach((user)=>{
        final_arr.push(`${user.username} napisał(a) ${user.postCount} postów`)
    })
    return final_arr;
}


function getDuplicatedTitles(posts){
    let allTitles = [];
    let repeatedTitles;
    // Getting all post titles to array
    posts.forEach((post)=>{
        let title = post.title;
        allTitles.push(title);
    });

    // Filter out titles that are not unique
    repeatedTitles = allTitles.filter((title,index) => {
        return allTitles.indexOf(title) !== index
    });

    // Check if there are any duplicated titles
    if([...new Set(repeatedTitles)].length == 0){
        return "Wszystkie tytuły są unikalne";
    }

    // Return array containing titles that are not unique
    return [...new Set(repeatedTitles)];
}


function getNeighbours(users){
    let userList = [];

    // Get necessary data
    users.forEach((user)=>{
        if( ((user.address.geo.lat > -90) && (user.address.geo.lat<90)) && ((user.address.geo.lng >-180) && (user.address.geo.lng < 180))){
            userList.push({
                id: user.id,
                username: user.username,
                lat: user.address.geo.lat,
                lng: user.address.geo.lng,
                neighbours: [] // array for user's closest neighbour(s) id
            })
        }else{
            console.log(`User with ID: ${user.id} has wrong coordinates and won't be taken into calculations`);
        }
    })
    if(userList.length<2)
        return "Brak sąsiedztw";

    userList.forEach((user, i)=>{
        let distanceList = [];
        let neighbourList = [];
        userList.forEach((neighbor, k)=>{
          if(i != k){
              distanceList.push(calculateDistance(user.lat, user.lng, neighbor.lat, neighbor.lng));
              neighbourList.push(neighbor.id);
          }
        });
        // Get distance to nearest neighbour
        let min_distance = Math.min(...distanceList);


        distanceList.forEach((distance, index)=>{
           if(distance == min_distance){
               user.neighbours.push(neighbourList[index]);
           }
        });
    });


    let return_arr = [];
    userList.forEach((user)=>{
        let closest_neighbours = [];
        for(let i=0; i<user.neighbours.length; i++){
            let neighbour_id = user.neighbours[i];
            let neighbour = userList.find(user=>user.id == neighbour_id);
            let neighbour_username = neighbour.username;
            closest_neighbours.push(neighbour_username);
        }
        let word = "jest";
        if(closest_neighbours.length>1){
            word="są"
        }
        return_arr.push(`Najbliższym sąsiadem ${user.username} ${word} ${closest_neighbours}`);
    });

    return return_arr;
}

function calculateDistance(lat1, lng1, lat2, lng2){
    if((lat1==lat2) && (lng1==lng2)){
        return 0;
    }
    else{
        var radlat1 = Math.PI * lat1/180;
        var radlat2 = Math.PI * lat2/180;
        var theta = lng1-lng2;
        var radtheta = Math.PI * theta/180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;
        // convert to kilometers
        dist = dist * 1.609344

        return dist;
    }
}




module.exports = {
    getDuplicatedTitles,
    getPostsPerUser,
    getNeighbours
}