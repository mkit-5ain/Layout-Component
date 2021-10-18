// index.js
// import '../css/common.css';
import '../sass/pages.scss';
const ele = document.querySelector('.main-moment');

document.addEventListener('DOMContentLoaded', function(event) {
    ele.innerText = moment().format();
});

// require 는 NodeJS 에서 사용되고 있는 CommonJS 키워드이고,
// import 는 ES6(ES2015)에서 새롭게 도입된 키워드로
// 두 개의 키워드 모두 하나의 파일에서 다른 파일의 코드를 불러온다는 동일한 목적을 가지고 있음

// jquery 를 불러와 & 치환 한다는 의미
// import $ from 'jQuery';

(function () {

    $(document).ready(function () {
        $('p').text('jQuery를 불러와 사용하고 있습니다.')
    });

})();
