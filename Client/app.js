(function ($) {
    function processForm( e ){
        var dict = {
            Title: this["title"].value,
            Director: this["director"].value,
            Genre: this["genre"].value
        };

        $.ajax({
            url: 'https://localhost:44352/api/movie',
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(dict),
            success: function (data, textStatus, jQxhr) {
                GetAllMovies();
                appendMovie(data);
            },
            error: function (jqXhr, textStatus, errorThrown) {
                console.log(errorThrown);
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
            success: function (data, textStatus, jQxhr) {
                $('#movieTable').html('');
                $.each(data, function (i) {
                    appendMovie(data[i]);
                });
            },
            error: function (jqXhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });

    }

    function appendMovie(data){
        $('#movieTable').append("<tr>" +
            "<td>" + data.Title + "</td>" +
            "<td>" + data.Director + "</td>" +
            "<td>" + data.Genre + "</td>" +
            "<td hidden class=\"movieId\">" + data.MovieId + "</td>" +
            "<td><button class=\"update-button\" type=\"button\">Update Movie</button></tr>");
    }

    $('#my-form').submit( processForm );
    $('#getall').on('click', GetAllMovies);
})(jQuery);