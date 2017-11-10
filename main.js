function getAllEvents(){
    fetch("http://youhys.dk/wordpress/wp-json/wp/v2/programmes?_embed").then(res=>res.json()).then(showEvents);
}


function getMenu(){
    fetch("http://youhys.dk/wordpress/wp-json/wp/v2/categories").then(res=>res.json()).then(showMenu );
}

  function showMenu(categories){
    console.log(categories);
    let ct = document.querySelector("#categoriesTemplate").content;

 /* categories.forEach(function(category){
        let clone = ct.cloneNode(true);
        let parent = document.querySelector("#catMenu");
        clone.querySelector("a").textContent=category.name;
        parent.appendChild(clone);
    });*/
}

function getSingleEventById(myId){
    //console.log(myId);
    fetch("http://youhys.dk/wordpress/wp-json/wp/v2/programmes/"+myId+"/?_embed").then(res=>res.json()).then(showSingleEvent);
}

function showSingleEvent(json){
    //console.log(json);
    document.querySelector("#single h1").textContent=json.title.rendered;
    document.querySelector("#single .content").innerHTML=json.content.rendered;
    document.querySelector("#single .price span").textContent=json.acf.price;
    document.querySelector("#single img").setAttribute("src", json._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url);
    document.querySelector("#single .date").textContent=json.acf.date;
    document.querySelector("#single .doors-open span").textContent=json.acf.door_opens_at;
    document.querySelector("#single .start-time span").textContent=json.acf.starts_at;
    document.querySelector("#single .venue span").textContent=json.acf.location;
}

function showEvents(data){
    //console.log(data);
    let list = document.querySelector("#list");
    let template = document.querySelector("#eventsTemplate").content;

    data.forEach(function(theEvent){
        console.log(theEvent);
        let clone = template.cloneNode(true);
        let title = clone.querySelector("h1");
        let excerpt = clone.querySelector(".excerpt");
        let price = clone.querySelector(".price span");
        let img = clone.querySelector("img");
        let link = clone.querySelector("a.read-more");

        title.textContent = theEvent.title.rendered;
        excerpt.innerHTML = theEvent.excerpt.rendered;
        price.textContent = theEvent.acf.price;

       // console.log(theEvent._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url);
        img.setAttribute("src", theEvent._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url);

        link.setAttribute("href", "programme.html?id="+theEvent.id);

        list.appendChild(clone);
    })

}



let searchParams = new  URLSearchParams(window.location.search);
let id = searchParams.get("id");
//console.log(id);

getMenu();

if(id){
    getSingleEventById(id);
}else{
    getAllEvents();
}



