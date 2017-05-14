//Counter code
var button = document.getELEMENTById('counter');
var counter = 0;
button.onclick = function() {
    
    //Make a reuest to counter endpoint
    
    //Capture response and store it in variable
    
    //Render variable in correct span
    counter = counter + 1;
    var span = document.getElementById('count');
    span.innerHTML = counter.toString();
    
}