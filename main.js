function getUserRepos(username) {
	$.ajax({
	  url: "https://api.github.com/users/" + username + "/repos",
	  context: document.body
	}).done(function( data ) {
		 // Grab the template script
  		var theTemplateScript = $("#repo-template").html();
  		var theTemplate = Handlebars.compile(theTemplateScript);
  		// This is the default context, which is passed to the template
  		var repos = [];

  		for (var x = 0; x < data.length; x++){
  			repos.push(data[x]);
  		}
  		console.log(data);
  		var context = {
  			'repo': data,
  			'username' : username
  		};
  		 // Pass our data to the template
  		var theCompiledHtml = theTemplate(context);

  		//clear out previous searches
  		$('#handlebars-area').empty();

  		// Add the compiled html to the page
  		$('#handlebars-area').append(theCompiledHtml);
  });
}

function processClick(){
	var username = $('#gitUserName').val();
	getUserRepos(username);
}