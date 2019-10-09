(function($){
    function processForm( e ){
        var dict = {
        	Title : this["title"].value,
            Director: this["director"].value,
            Genre: this["genre"].value
        };

        $.ajax({
            url: 'https://localhost:44352/api/movie',
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(dict),
            success: function( data, textStatus, jQxhr ){
                $('#response pre').html( data );
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });

        e.preventDefault();
    }

    function GetAllMovies(){
        $.ajax({
            url: 'https://localhost:44352/api/movie',
            dataType: 'json',
            type: 'get',
            contentType: 'application/json',
            success: function(data, textStatus, jQxhr){
                $('#my-form').after(textStatus);
                $('#response').append("<table id=\"movieTable\" class=\"table table-striped table-bordered table-hover table-condensed\"></table>");
                $('#movieTable').append("<tr>" + 
                "<th>Title</th>" + 
                "<th>Director</th>" + 
                "<th>Genre</th>" + 
                "</tr>");
                $.each(data, function(i){
                    $('#movieTable').append("<tr>" + 
                    "<td>" + data[i].Title + "</td>" + 
                    "<td>" + data[i].Director + "</td>" + 
                    "<td>" + data[i].Genre + "</td>" + 
                    "</tr>");
                });
                
            },
            error: function( jqXhr, textStatus, errorThrown ){
                $('#my-form').after(textStatus);
                console.log( errorThrown );
            }
        });
        
    }

    function GetSingleMovie(){
        $.ajax({
            url: 'https://localhost:44352/api/movie',
            dataType: 'json',
            type: 'get',
            data: "id=1",
            contentType: 'application/json',
            success: function(data, textStatus, jQxhr){
                $.each(data, function(i){
                    $('#response').append("<p>" + data[i] + "</p>");
                });
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });
        $('#my-form').after(textStatus);
    }

    $('#my-form').submit( processForm );
    $('#getall').on('click', GetAllMovies);
})(jQuery);