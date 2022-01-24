var content = document.getElementById("main-content");
var btn = document.getElementById("fetchAPI");
var data1,data2;

btn.addEventListener("click", function() {
    
    content.innerHTML = "";

    var Request1 = new XMLHttpRequest();
    var Request2 = new XMLHttpRequest();
    document.getElementById("loader").style.display = "block";
    
    Request1.onload = function() {
        contents = JSON.parse(Request1.responseText);
        document.getElementById("fixed").innerHTML = `
        <a href="${contents["support"]["url"]}">${contents["support"]["text"]}</a>
        `;
        data1 = contents["data"];
        console.log(data1);
        renderHTML(data1);
    };
    
    Request2.onload = function() {
        contents = JSON.parse(Request2.responseText);
        data2 = contents["data"];
        renderHTML(data2);
        document.getElementById("loader").style.display = "none";
    };
    
    Request1.open('GET','https://reqres.in/api/users?page=1');
    Request1.send();
    Request2.open('GET','https://reqres.in/api/users?page=2');
    Request2.send();

});


function renderHTML(data){
    console.log(data);

    var newdata=``;
    for(let i = 0; i<data.length; i++){
        newdata +=`
            <div class="main-content-inner">
                <div>
                    ID : ${data[i]["id"]} <br>
                    Email : ${data[i]["email"]} <br>
                    First Name : ${data[i]["first_name"]} <br>
                    Last Name : ${data[i]["last_name"]}
                </div>
                <img src="${data[i]["avatar"]}">
            </div>
        `;
    }

    content.innerHTML += newdata;
};