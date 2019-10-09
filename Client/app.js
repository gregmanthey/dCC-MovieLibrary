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

    function GetAllData(){
        $.ajax({
            url: 'https://localhost:44352/api/movie',
            dataType: 'json',
            type: 'get',
            data: "id=1",
            contentType: 'application/json',
            success: function(data, textStatus, jQxhr){
                console.log("Success");
                //results = JSON.parse(data);
                $.each(data, function(i){
                    $('#response').append("<p>" + data[i] + "</p>");
                });
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });
    }

    $('#my-form').submit( processForm );
    $('#getall').on('click', GetAllData);
})(jQuery);