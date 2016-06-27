// ## Placeholder Page
//
// 1. Create a route with the page name as a route parameter: /:pageName, and render a default place holder page for the matching URLs. You might call the view template placeholder.hbs - put that in the views folder. In side placeholder.hbs, put in text that says: this page has not been created yet.


// 1b. Create a route for / - it should redirect to /HomePage - which will render the placeholder page for HomePage.

// 2. In the placeholder.hbs, add a link to /:pageName/edit so the user can click on that and navigate to the edit page. You can do that in handlebars using the syntax: <a href="/{{pageName}}/edit">Create this page.</a>. The pageName property must exist on the object in the second parameter of the response.render() method call. Example: response.render('placeholder', { pageName: ... })

var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var fs = require('fs');

app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'hbs');
app.use(express.static('public'));

app.get('/', function(request, response){
     response.redirect('/HomePage');
});

app.get('/:pageName', function(request, response){
     var pageName = request.params.pageName;
     console.log("pageName: ", pageName);
     fs.readFile('views/pages/' + pageName + '.txt', function(err, data) {
          if (err) {

               response.render('placeholder.hbs', {
                    pageName: pageName
               });
               return;
          }
          /* the file exists */
          // response.render('views/pages/' + pageName);
          response.render('views/pages/will.txt');
          console.log(data);

     });


});

app.get('/:pageName/edit', function(request, response){
     var pageName = request.params.pageName;
     response.render('editpage.hbs', {
          pageName: pageName
     });
});

app.post('/:pageName/save', function(request, response) {
     var data = JSON.stringify(request.body);
     var pageName = request.params.pageName;

     console.log(data);
     fs.writeFile("views/pages/" + pageName + '.txt', data, function(err) {
          if (err) {
               response.send("Sorry, something went wrong!");
               console.log(err.message);
               return;
          }
          response.redirect('/' + pageName);
     })
});

app.listen(3000, function(){
     console.log('listening on port 3000');
});
