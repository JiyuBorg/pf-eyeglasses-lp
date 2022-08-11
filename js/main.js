$(function () {
  /*=================================================
   ハンバーガ―メニュークリック時動作
   ===================================================*/
  // ハンバーガーメニュー(.hamburger) or navメニュー(.nav-menu)をクリックした時
  $('.hamburger, .nav-menu').on('click', function () {
    hamburger();
  });

  /*=================================================
    スムーススクロール
    参考）https://qiita.com/natuuu0831/items/172012b5b59f28350afc
    ===================================================*/
  // a href属性で#で前方一致(^)する要素が.clickされたら関数実行
  $('a[href^="#"]').click(function () {
    // 変数let href = "href"の中身(#リンク)
    let href = $(this).attr("href");
    // 変数let target = hrefが#または""(空)なら'html', そうでないなら変数hrefの値（三項演算子)
    let target = $(href == "#" || href == "" ? 'html' : href);
    // 変数let position = ドキュメント起点のtargetまでの距離(.offset().top) -120は微調整
    let position = target.offset().top -120 ;
    // html, body要素をanimateメソッドで, スクロール位置(scrollTop:) positionの位置まで600msでイージング"swing"でアニメーション
    $("html, body").animate({ scrollTop: position }, 600, "swing");
    //処理中断. リンク先に飛ばされる可能性防止用
    return false;
  });

  /*=================================================
   画面がスクロールされたら動作
   ===================================================*/
  $(window).scroll(function () {
    let scroll = $(window).scrollTop(); //scroll＝.scrollTop()＝ウィンドウtopからのスクロールheight(px)
    // 表示制御の条件とするセクションの画面bottomからの距離を取得
    let info_position = $('#information').offset().top - $(window).height();
    let access_position = $('#access').offset().top - $(window).height();
    let contact_position = $('#contact').offset().top - $(window).height();

    //デバッグ用
    //console.log(`scroll px is ${scroll}`);

    /*=================================================
    メインビジュアルの拡大・縮小
    ===================================================*/
    mv_scale(scroll);

    /*=================================================
    informationからproductsを見てる時のみ背景.side-btn(サイドボタン)を表示
    ===================================================*/
    if (scroll > info_position) { //#informationから
      if (scroll < access_position) {  //#accessまで
        $('.side-btn').css({ 'transform': 'rotate(-90deg) translateY(0)' });; //サイドボタン表示
      } else { //それ以降
        $('.side-btn').css({ 'transform': 'rotate(-90deg) translateY(60px)' });; //サイドボタン非表示
      }
    } else { //#informationより上
      $('.side-btn').css({ 'transform': 'rotate(-90deg) translateY(60px)' });; //サイドボタン非表示
    }

    /*=================================================
    Accessを見てる時のみ背景.temp-bgを表示
    ===================================================*/
    // #accessが表示された場合
    if (scroll > access_position) {
      // #contactが表示されるまでの間は、背景画像をfadeInで表示する
      if (scroll < contact_position) {
        $('.temp-bg').fadeIn(500);
      } else {
        $('.temp-bg').fadeOut(500);
      }
      // #accessが表示される前の場合
    } else {
      // 背景画像を表示しない
      $('.temp-bg').fadeOut(500);
    }


  });//スクロール時イベント$(window).scrollここまで

})//jQuery全体 $(function()ここまで

/*=================================================
ハンバーガ―メニュー or navメニュークリック時間数
・処理が同じなのでまとめる
・openが無ければ付与addClass。あれば削除removeClassするだけ。
===================================================*/
function hamburger() {
  $('.hamburger').toggleClass('open');
  if ($('.hamburger').hasClass('open')) {
    $('.nav-menu').addClass('open');
  } else {
    $('.nav-menu').removeClass('open');
  }
}

/*=================================================
メインビジュアルの拡大・縮小関数定義
・scroll値を引数で受取、その値によりmain-visual-list imgのcssのwidthを変化させる
・PC表示では拡大、スマホ表示は縮小の要件のためwindow.innerWidth(ウィンドウ幅)の値900px(CSSのレスポンシブブレークポイント)で条件をわける。
===================================================*/
function mv_scale(scroll) {
  if (window.innerWidth > 900) { //PC表示
    $('.main-visual-list img').css({
      'width': 100 / 3 + scroll / 10 + '%' //CSSの元値100/3にscroll値/10 % 加算(拡大)
    });
  } else { //スマホ表示
    $('.main-visual-list img').css({
      'width': 100 - scroll / 10 + '%' //cssの元値100からscroll/10 % 減算(縮小)
    });
  }
}

/*=================================================
not jQuery
ふわっと表現のScrollReveal.js 表現は以下参考
https://nakox.jp/web/coding/js_animetion_scrollreveal
 ===================================================*/
//ベースの設定
ScrollReveal({
  reset: true, //フレームインの度に動かすか否か(boolean)
  delay: 100, //アニメーション開始までの時間ms
  duration: 1500, //アニメーション完了にかかる時間ms
  origin: "bottom", //アニメーションの開始方向top,bottom,left,right
  distance: "100px", //アニメーションの移動距離
});

//アニメーションを付与する対象 ベース設定とは別に個別設定も可能
ScrollReveal().reveal('.scroll-reveal');
