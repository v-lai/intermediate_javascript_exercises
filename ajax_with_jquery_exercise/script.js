$(function () {
    var $ol = $("ol");

    // login aside
    $(".login").on("click", function (e) {
        e.preventDefault();
        $("aside").toggle();
    });

    // login functionality
    $(".login-submit").on("click", function (e) {
        submitClick(e);
    });

    // signup functionality
    $(".signup-submit").on("click", function (e) {
        submitClick(e);
    });

    function submitClick(event) {
        event.preventDefault();
        var $user = $(".email").val();
        var $pass = $(".password").val();
        var url = 'https://hn-favorites.herokuapp.com/login';
        if ($(event.target) === $(".login-submit")) {
            url = 'https://hn-favorites.herokuapp.com/signup';
        }
        $.post(url,
            { "email": $user, "password": $pass }
        ).then(function (res) {
            $(".login-error").text("");
            $(".signup-error").text("");
            console.log(res);
            $(".login").text("logout");
            $("aside").toggle();
        }).catch(function (res) {
            if ($(event.target) === $(".login-submit")) {
                $(".login-error").text("login failed");
            } else {
                $(".signup-error").text("signup failed");
            }
        });
    }

    // populating ol with articles
    $.get('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
        .then(function (res) {
            for (var i = 0; i < 20; i++) {
                $.get(`https://hacker-news.firebaseio.com/v0/item/${res[i]}.json?print=pretty`)
                    .then(function (res) {
                        //console.log(res);
                        var $partialUrl = (res.url.split(/\/\//)[1]).split(/\//)[0];

                        if ($partialUrl.match(/^www/)) { // if www. start, remove "www."
                            $partialUrl = $partialUrl.substring(4);
                        }

                        var $star = $("<span>").addClass("fa fa-star-o");
                        var $link = $("<a/>")
                            .attr("href", res.url)
                            .text(" " + res.title + " ");
                        var $linkTitle = $("<span>")
                            .addClass("link-title")
                            .append($link);
                        var $linkUrl = $("<span>")
                            .addClass("link-url")
                            .text("(" + $partialUrl + ")");
                        var $newLi = $("<li>")
                            .append($star)
                            .append($linkTitle)
                            .append($linkUrl);
                        $ol.append($newLi);
                    });
            }
        });

    // star functionality
    $ol.on("click", ".fa", function (e) {
        e.preventDefault();
        $(e.target).toggleClass('fa-star-o');
        $(e.target).toggleClass('fa-star');
    });

    $(".favs").on("click", function (e) {
        e.preventDefault();
        if ($(".favs").text() === "all" && $(".login").text() === "logout") {
            $(".favs").text("favorites");
            $(".fa-star-o").parent().toggle(true);
        } else if ($(".login").text() === "logout") {
            $(".favs").text("all");
            $(".fa-star-o").parent().toggle(false);
        }
    });
});