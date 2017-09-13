/**
 * Created by Kazantseva Anastasiia on 03.09.2017.
 */


function httpGetAsync(url, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            callback(xmlHttp.responseText);
        }
    };
    xmlHttp.open('GET', url, true);
    xmlHttp.send(null);
}


//**********************************************
var imagesListArray = [];
var images = [];
var idItemImage = document.getElementById("itemImage");


   // ----- Создаем массив, исправляя пути к картинкам  -----

function imagesList(e) {
    var countImages = e.length;
    for (var i = 0; i < countImages; i++) {
        imagesListArray.push({
            id : e[i].id,
            width : e[i].width,
            height : e[i].height,
            author : e[i].author,
            author_url : e[i].author_url,
            src : e[i].src = 'https://unsplash.it/145/99?image=' + e[i].id
        });
    }
}

var pageCount, pageEnd;

     // VER-1 ---------  Вывод по 20 изображений в itemImage

// function imagesPagePaginator(array, page) {
//     console.log('Page:   ', page);
//
//     if (page == 1){
//         pageCount = 0;
//         pageEnd = 20
//     }
//     else {
//         pageCount = (page - 1)*20 + page;
//         ((page * 20 + page) > array.length) ? pageEnd = array.length : pageEnd = page * 20 + page;
//     }
//     for (var j = pageCount; j < pageEnd; j++) {
//         var galleryFragment = document.createDocumentFragment();
//         var tegLi = document.createElement('li');
//         var tegDiv = document.createElement('div');
//         tegDiv.className = 'videodiv';
//         tegDiv.innerHTML += '<a href="#"><img src="' + array[j].src  + '"title="' + array[j].author +  '"' + '"alt=""/></a>';
//         tegLi.appendChild(tegDiv);
//         galleryFragment.appendChild(tegLi);
//         idItemImage.appendChild(galleryFragment);
//     }
// }

   // VER-2 ---------  Вывод всех изображений в itemImage

function imagesPagePaginator(array, start) {

    for (var j = start; j < start + 20; j++) {
        var galleryFragment = document.createDocumentFragment();
        var tegLi = document.createElement('li');
        var tegDiv = document.createElement('div');
        tegLi.className = 'videoli';
        tegLi.setAttribute('data-num', j+1);
        tegDiv.className = 'videodiv';
        tegDiv.innerHTML += '<a href="#"><img src="' + array[j].src  + '"title="' + array[j].author +  '"' + '"alt=""/></a>';
        tegLi.appendChild(tegDiv);
        galleryFragment.appendChild(tegLi);
        idItemImage.appendChild(galleryFragment);
    }
}

// -----------------Сортировка по размеру

function imagesListSize(size) {
    // var max = imagesList[0].width;
    idItemImage.innerHTML = '';
    var max = imagesListArray[0];
    var min = imagesListArray[0];
    for (var i = 1; i < imagesListArray.length; i++) {
        if (max.width < imagesListArray[i].width) max = imagesListArray[i];
        if (min.width > imagesListArray[i].width) min = imagesListArray[i];
    }
    var medium = (max.width - min.width) / 3;


    if (size == 'large') {
        imagesListArray.sort(function (a, b) {
            return b.width - a.width;
        });
    }
    else if (size == 'medium') {
        imagesListArray.sort(function (a, b) {
            if((a.width >= min.width + medium) && (a.width <= max.width - medium))return 1;
            if((b.width >= min.width + medium) && (b.width <= max.width - medium))return 1;
            else return -1;
        });
    }
    else if (size == 'small') {
        imagesListArray.sort(function (a, b) {
            return a.width - b.width;
        });
    }

}



                  //  ______Request___!!!!!!!!!!!
httpGetAsync(
    'https://unsplash.it/list',
    function(e){
        images = JSON.parse(e);
        imagesList(images);     //Заполняем массив с исправленными путями

        imagesPagePaginator(imagesListArray, 0);
        pag();

    }
);