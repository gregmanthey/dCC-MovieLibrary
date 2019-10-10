(function ($) {
    function processForm( e ){
        var dict = {
            MovieId: this["movieId"].value,
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
        $('#my-form button').html("Add Movie");
        $('#formMovieId').val(null);
        $('#my-form')[0].reset();
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
            "<td class=\"title\">" + data.Title + "</td>" +
            "<td class=\"director\">" + data.Director + "</td>" +
            "<td class=\"genre\">" + data.Genre + "</td>" +
            "<td hidden class=\"movieId\">" + data.MovieId + "</td>" +
            "<td><button class=\"updateMovie\" type=\"button\">Update Movie</button></td></tr>");
            
            $('.updateMovie').on('click', UpdateMovie);
    }

    function UpdateMovie(){
        $('#my-form button').html("Update Movie");

        var text = $(this).closest('tr').find('.title').text();
        $("#formTitle").val(text);

        text = $(this).closest('tr').find('.director').text();
        $("#formDirector").val(text);

        text = $(this).closest('tr').find('.genre').text();
        $("#formGenre").val(text);

        text = $(this).closest('tr').find('.movieId').text();
        $("#formMovieId").val(text);
    }

    GetAllMovies();
    $('#my-form').submit( processForm );
    
})(jQuery);