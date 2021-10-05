document.getElementById('search').addEventListener('click', () => {

    let choose = $('#text').val();
    if (choose === '') {
        swal("Oops", "Choose movie", "error")
    } else {
        const XHR = new XMLHttpRequest();
        let search = document.getElementById('text');
        XHR.open('GET', `http://www.omdbapi.com/?s=${search.value}&apikey=edd7fcc0`);
        XHR.onreadystatechange = function () {
            if (XHR.readyState === 4 && XHR.status === 200) {
                let data = JSON.parse(XHR.responseText);
                if (data) {
                    for (let i = 0; i < data.Search.length; i++) {
                        let { Poster, Title, Type, Year, imdbID } = data.Search[i];

                        createMovie(Poster, Title, Type, Year, imdbID);

                    }
                }
                $('.more').on('click', (e) => {
                    let id = $(e.target).attr('id')
                    console.log(id);
                    const INFO = new XMLHttpRequest();
                    INFO.open('GET', `http://www.omdbapi.com/?i=${id}&apikey=edd7fcc0`);
                    INFO.onreadystatechange = function () {
                        if (INFO.readyState === 4 && INFO.status === 200) {
                            let infoDate = JSON.parse(INFO.responseText)
                            if (infoDate) {
                                let { Title, Rated, Year, Genre, Plot, Writer, Director, Actors, Awards, imdbRating, Poster } = infoDate;
                                createModal(Title, Rated, Year, Genre, Plot, Writer, Director, Actors, Awards, imdbRating, Poster);
                            }
                            console.log(infoDate);
                        }
                    }
                    INFO.send()
                })
            }
        }
        XHR.send();
        search.value = '';
    }
})

function createMovie(Poster, Title, Type, Year, imdbID) {
    $('.wrapper').prepend(`<div class="box"><img style="background-image: url(${Poster});"><p id="title">${Title}</p><p id="type">${Type}</p><p id="year">${Year}</p><button class="more" style="background-color: #28a743; color: #fff" data-bs-toggle="modal" data-bs-target="#info" id="${imdbID}">More details</button></div>`)
}
function createModal(Title, Rated, Year, Genre, Plot, Writer, Director, Actors, Awards, imdbRating, Poster) {
    $('.block').remove()
    $('.aboutMovies').prepend(`<div class="block">
    <div class="poster" style="background-image: url(${Poster})"></div>
    <div class="information">
        <p class="grey">${Title}</p>
        <p>${Rated} ${Year} ${Genre}</p>
        <p>${Plot}</p>
        <p><span>Written by:</span> ${Writer}</p>
        <p><span>Directed by:</span> ${Director}</p>
        <p><span>Starring:</span> ${Actors}</p>
        <p><span>Awards:</span> ${Awards}</p>
        <p><span>Ratings:</span> ${imdbRating}</p>
    </div>
</div>`)
}