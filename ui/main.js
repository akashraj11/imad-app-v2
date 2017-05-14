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
    reuest.send(null);
    
};