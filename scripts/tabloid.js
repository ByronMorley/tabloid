$(document).ready(function () {

    $('.pdf_downloader').on('click', function (evt) {
        evt.preventDefault();
        convert_to_pdf();
    });
});

var convert_to_pdf = function () {

    var $content_container = get_content();

    clean_html($content_container);
    convertImages($content_container)
};

function postHtmlData(htmlContent) {
    $.post('tabloid/php/save.php', {content: $(htmlContent).prop('outerHTML')})
        .done(function () {
            window.open("tabloid/php/pdf_download.php");
        });
}

var get_content = function () {

    return ($('.nav-tabs').length > 0)
        ?
        $('<div>').append($('.desktop').find('.block').clone())
        :
        $('<div>').append($('.block').clone());
};

function renderContent($page) {

    return $('<html>').append(
        $('<head>').append(
            $('<meta>').attr('charset', "UTF-8"),
            //html4 charset declaration
            $('<meta>').attr({'http-equiv': "Content-Type", content: "text/html; charset=UTF-8"}),
            $('<link>').attr({href: '../css/style.min.css', type: 'text/css', media: 'screen', rel: 'stylesheet'})
        ),
        $('<body>').append(
            $('<div>').addClass('pdf-container')
                .append(
                    $('<h1>').text($('#pdf-site-info').attr('root')),
                    $('<h2>').text($('#pdf-site-info').attr('page')),
                    $('<div>').addClass('breadcrumbnavigation').html($('.breadcrumbnavigation').html()),
                    $page.html()
                )
        )
    );
}

function convertImages($page) {

    var $images = $page.find('img');
    var total = $images.length;
    var processed = 0;

    $images.each(function () {
        var $img = $(this);
        var src = $img.attr('src');

        toDataURL(src, function (dataUrl) {
                processed++;
                $img.attr('src', dataUrl);
                if (processed >= total) {
                    postHtmlData(renderContent($page));
                }
            }
        )
    });

    if (total == 0) {
        postHtmlData(renderContent($page));
    }
}

function clean_html($el) {

    var elements = 'audio, .pagination-block, .you-tube-block, .video-block'

    $el.find(elements).each(function () {
        $(this).remove();
    });
    return $el;
}

function toDataURL(src, callback, outputFormat) {
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function () {
        var canvas = document.createElement('CANVAS');
        var ctx = canvas.getContext('2d');
        var dataURL;
        canvas.height = this.naturalHeight;
        canvas.width = this.naturalWidth;
        ctx.drawImage(this, 0, 0);
        dataURL = canvas.toDataURL(outputFormat);
        callback(dataURL);
    };
    img.src = src;
    if (img.complete || img.complete === undefined) {
        img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
        img.src = src;
    }
}

