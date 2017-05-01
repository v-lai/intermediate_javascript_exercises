// FIX THIS VALIDATION
// just for the demos, avoids form submit
jQuery.validator.setDefaults({
    debug: true,
    success: "valid"
});
$("form").validate({
    rules: {
        field: {
            required: true,
            url: true
        }
    }
});


$(document).ready(function () {
    // the DOM has now loaded
    // $(function () {
    //     $('#submit').hide();
    // });

    // toggling submit form (WRONG)
    $("#submission").on("click", function () {
        $('#submit').removeClass('hidden');
        $("#submit").toggle();
    });

    // append new item to form
    // create a new item
    $("#post-submit").on("click", function (e) {
        e.preventDefault();
        var $postTitle = $("#post-title").val();
        var $postUrl = $("#post-url").val();

        var $mainList = $("#main ol");
        if (($postUrl.includes('http://') || $postUrl.includes('https://')) && (/\w+\./).test($postUrl)) {
            var html = '<li><span class="star"></span><span class="link-title"><a href="' + $postUrl + '">' + $postTitle + '</a></span> <span class="link-url">(' + $postUrl + ')</span></li>';
            $mainList.append(html);
        }
    });
});