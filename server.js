var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');

var config = {
    user : 'akashraj11',
    database: 'akashraj11',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));

var articles={
 'article-One' : {    
    title:'Article One! Akashraj',
    heading:'Article One',
    date:'13 may 2017',
    content:       `<p>
                        Content of my first article  Content of my first article
                        Content of my first article  Content of my first article
                        Content of my first article  Content of my first article
                        Content of my first article  Content of my first article
                    </p>
                    <p>
                        Content of my first article  Content of my first article
                        Content of my first article  Content of my first article
                        Content of my first article  Content of my first article
                        Content of my first article  Content of my first article
                    </p>            
                    <p>
                        Content of my first article  Content of my first article
                        Content of my first article  Content of my first article
                        Content of my first article  Content of my first article
                        Content of my first article  Content of my first article
                     </p>`},
 'article-Two' : {    
    title:'Article Two! Akashraj',
    heading:'Article Two',
    date:'13 may 2017',
    content:       `<p>
                        Content of my first article  Content of my first article
                        Content of my first article  Content of my first article
                        Content of my first article  Content of my first article
                        Content of my first article  Content of my first article
                    </p>
                    <p>
                        Content of my first article  Content of my first article
                        Content of my first article  Content of my first article
                        Content of my first article  Content of my first article
                        Content of my first article  Content of my first article
                    </p>            
                    <p>
                        Content of my first article  Content of my first article
                        Content of my first article  Content of my first article
                        Content of my first article  Content of my first article
                        Content of my first article  Content of my first article
                     </p>`},
 'article-Three' : {   
    title:'Article Three! Akashraj',
    heading:'Article Three',
    date:'13 may 2017',
    content:       `<p>
                        Content of my first article  Content of my first article
                        Content of my first article  Content of my first article
                        Content of my first article  Content of my first article
                        Content of my first article  Content of my first article
                    </p>
                    <p>
                        Content of my first article  Content of my first article
                        Content of my first article  Content of my first article
                        Content of my first article  Content of my first article
                        Content of my first article  Content of my first article
                    </p>            
                    <p>
                        Content of my first article  Content of my first article
                        Content of my first article  Content of my first article
                        Content of my first article  Content of my first article
                        Content of my first article  Content of my first article
                     </p>`}
};

function createTemplate(data){
    var title=data.title;
    var heading=data.heading;
    var date=data.date;
    var content=data.content;
        var htmlTemplate=
            `<html>
            <head>
                <title>
                         ${title}
                </title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link href="/ui/style.css" rel="stylesheet" />
            </head>
            <body>
                <div class="container">
                        <div>
                            <a href="/">Home</a>
                        </div>
                        <hr/>
                        <h3>
                         ${heading}
                        </h3>
                        <div>
                         ${date.toDateString()}
                        </div>
                        <div>
                         ${content}
                        </div>
                </div>
            </body>
        </html>`;
        return htmlTemplate;
}  




app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash(input,salt) {
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return hashed.toString('hex');
}


app.get('/hash/:input', function (req, res) {
    var hashedString = hash(req.params,input,'this-is-some-random-string');
    res.send(hashedString);
});



var pool = new Pool(config);
app.get('/test-db', function (req, res) {
    //make a select request
    //return a response with result
    pool.query('SELECT * FROM test',function(err,result) {
        if(err) {
            res.status(500).send(err.toString());
            } else {
                res.send(JSON.stringify(result.rows));
            }
        });
    });



var counter = 0;
app.get('/counter',function(req,res) {
    counter = counter + 1;
    res.send(counter.toString());
});

var names=[];
app.get('/submit-name/', function (req, res) { //submit-name/?name=ar
    //get the name from request
    var name = req.query.name;
    names.push(name);
    //JSON
  res.send(JSON.stringify(names));
});


app.get('/article/:articleName', function (req, res) {
    //articleName == article-one
    //articles[articleName]= {} content object for article one
    var articleName = req.params.articleName;
    
    pool.query("SELECT * from article WHERE title = $1",[req.params.articleName],function(err,result) {
        if(err) {
            res.status(500).send(err,toString());
        } else {
            if(result.rows.length === 0) {
                res.status(404).send('Article Not Found');
            } else {
                var articleData = result.rows[0];
                res.send(createTemplate(articles[articleName]));
            }
        }
    });

});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
