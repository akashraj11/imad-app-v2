//Counter code

var button = document.getElementById('counter');
button.onclick = function() {
    
    //Create a request Object
    var request = new XMLHttpRequest();
    
    //Capture response and store it in variable
    request.onreadystatechange = function() {
        if (request.readyState === XMLHttpRequest.DONE) {
            //take action
            if( request.status === 200) {
                var counter = request.responseText;
                var span = document.getElementById('count');
                span.innerHTML = counter;
            }
        }
        //not done yet
    };
    
    //Make the request
    request.open('GET','http://akashraj11.imad.hasura-app.io/counter',true);
    request.send(null);
};

//submit name

var nameInput = document.getElementById('name');
var name = nameInput.value;
var submit = document.getElementById('submit_btn');
submit.onclick = function() {
    //Make a request to server and send this name
    //Capture a list of names and render it as a list
    var names =['name1','name2','name3'];
    var list='';
    for(var i=0;i<names.length;i++){
    list+= '<li>' + name[i] + '</li>';
    }
    var ul = document.getElementById('namelist');
    ul.innerHTML =list;
};