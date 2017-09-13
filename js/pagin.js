/**
 * Created by Kazantseva Anastasiia on 03.09.2017.
 */

// //------***** PAGINATION *******-----------
//
// var Panel = function () {
//
//     Panel(
//         {
//             inrow: 7,
//             items: 100,
//             // items: Math.ceil(imagesListArray.length / 20) - 3,
//             current: 1,
//             callback: clickPanel3,
//             element: document.getElementById('page_panel3')
//         }
//     );
// };
//
// function clickPanel3(page) {
//     console.log(page);
// }
//
//
// Panel((function () {
//
//         function Panel(params) {
//             if (!(this instanceof Panel)) {
//                 return new Panel(params);
//             }
//             this.initialize.apply(this.arguments);
//         }
//
//         Panel.prototype.initialize = function (arg) {
//             var fragment = document.createDocumentFragment();
//             var first = document.createElement('span');
//             var ul = document.createElement('ul');
//             var li = document.createElement('li');
//             var last = first.cloneNode();
//             var prev = first.cloneNode();
//             var next = first.cloneNode();
//             var callback = arg.callback;
//             var element = arg.element;
//             var ins_li, end;
//
//             first.className = 'first';
//             last.className = 'last';
//             prev.className = 'prev';
//             next.className = 'next';
//             arg.step = arg.step || 1;
//             arg.inrow = arg.inrow || 5;
//             arg.items = arg.items || 20;
//             arg.current = arg.current || 1;
//
//             arg.prev_txt = arg.prev_txt || '<';
//             arg.next_txt = arg.next_txt || '>';
//             arg.last_txt = arg.last_txt || '>>';
//             arg.first_txt = arg.first_txt || '<<';
//
//             var show_button = arg.items > arg.inrow;
//
//             if(show_button){
//                 first.appendChild(document.createTextNode(arg.first_txt));
//                 last.appendChild(document.createTextNode(arg.last_txt));
//                 prev.appendChild(document.createTextNode(arg.prev_txt));
//                 next.appendChild(document.createTextNode(arg.next_txt));
//             }
//
//             element.className = 'page_panel';
//
//             var start = Math.floor((arg.current - 1) / arg.inrow) * arg.inrow;
//
//             function build(start) {
//                 for (end = arg.inrow + start; ++start <= end;) {
//                     if (start > arg.items) break;
//                     ins_li = li.cloneNode();
//                     if (start == arg.current) {
//                         ins_li.className = 'active';
//                     }
//                     ins_li.innerHTML = start;
//                     fragment.appendChild(ins_li);
//                 }
//                 ul.innerHTML = '';
//                 ul.appendChild(fragment);
//                 if(show_button){
//                     fragment.appendChild(first);
//                     fragment.appendChild(prev);
//                 }
//                 fragment.appendChild(ul);
//                 if(show_button){
//                     fragment.appendChild(next);
//                     fragment.appendChild(last);
//                 }
//                 element.appendChild(fragment);
//             }
//
//             build(start);
//
//             element.onclick = function (e) {
//                 var el = e ? e.target : window.event.srcElement;
//                 switch (el.tagName) {
//                     case 'LI':
//                         if(arg.current == +el.innerHTML) return;
//                         var list = el.parentNode.children;
//                         for (var i = 0; i < list.length; i++) {
//                             list[i].className = list[i] == el ? 'active' : '';
//                         }
//                         arg.current = +el.innerHTML;
//                         if(callback) callback(arg.current);
//                         break;
//                     case 'SPAN':
//                         switch (el.className) {
//                             case 'first':
//                                 if (start !== 0) {
//                                     start = 0;
//                                     build(start);
//                                 }
//                                 break;
//                             case 'last':
//                                 end = arg.items - arg.inrow;
//                                 if (start != end) {
//                                     start = end;
//                                     build(start);
//                                 }
//                                 break;
//                             case 'next':
//                                 start += arg.step;
//                                 if (start >= arg.items - arg.inrow) {
//                                     start = arg.items - arg.inrow;
//                                 }
//                                 build(start);
//                                 break;
//                             case 'prev':
//                                 if (start < arg.step) {
//                                     start = 0;
//                                 } else {
//                                     start -= arg.step;
//                                     if (start >= arg.items - arg.inrow) {
//                                         start = arg.items - arg.inrow - arg.step;
//                                     }
//                                 }
//                                 build(start);
//                                 break;
//                         }
//                         break;
//                 }
//             };
//         };
//         window.Panel = Panel;
//     }()));


//   ***************   PAGINATOR  2 ************************

var main_page, div_num, data_num, count;
var cnt = 20; //сколько отображаем сначала;

var pag = function () {

    count = imagesListArray.length; //всего записей
    console.log('count   ', count);

    var cnt_page = Math.ceil(count / cnt); //кол-во страниц

//выводим список страниц
    var paginator = document.querySelector("#page_panel3");
    var page = "";
    for (var i = 0; i < cnt_page; i++) {
        page += "<span data-page=" + i * cnt + "  id=\"page" + (i + 1) + "\">" + (i + 1) + "</span>";
        // console.log("<span data-page=" + i * cnt + "  id=\"page" + (i + 1) + "\">" + (i + 1) + "</span>");
    }
    paginator.innerHTML = page;


    //выводим первые записи {cnt}


    div_num = document.querySelectorAll(".videoli");
    console.log(div_num);
    for (var i = 0; i < imagesListArray.length; i++) {
        if (i < cnt) {
            div_num[i].style.display = "block";
        }
    }

    main_page = document.getElementById("page1");
    main_page.classList.add("paginator_active");
};

//листаем
     function pagination(event) {
         var e = event || window.event;
         var target = e.target;
         var id = target.id;
         console.log('id  ', id);

         if (target.tagName.toLowerCase() != "span") return;

         var num = id.substr(4);
         var data_page = +target.dataset.page;
         main_page.classList.remove("paginator_active");
         main_page = document.getElementById(id);
         main_page.classList.add("paginator_active");

         var j = 0;
         for (var i = 0; i < div_num.length; i++) {
             data_num = div_num[i].dataset.num;
             if (data_num <= data_page || data_num >= data_page)
                 div_num[i].style.display = "none";

         }
         // console.log(data_page);


         imagesPagePaginator(imagesListArray, data_page);

                 div_num = document.querySelectorAll(".videoli");

                 console.log(div_num);

                 for (var i = data_page; i < imagesListArray.length; i++) {
                     if (j >= cnt) break;
                     div_num[i].style.display = "block";
                     j++;
                 }
     }
