// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
function showBooks(authorData) {
    var author = authorData.parents("td").siblings("#nickname");

    var books = searchBook(author.text());
    if (books.length == 0) {
        alert("no books");
    }
    else {
        alert(books);
    }
};

function searchBook(author) {
    var books = [];

    $("#Books tbody tr").each(function (key, val) {

        if ($(val).children("td#nickname").text() === author) {
            books.push($(val).children("td#name").text());
        }
    });

    return books;
}

function showAuthors(booksData) {
    var book = booksData.parents("td").siblings("#nickname");

    var authors = searchAuthor(book.text());
    if (authors.length == 0) {
        alert("no authors");
    }
    else {
        alert(authors);
    }
};

function searchAuthor(book) {
    var authors = [];

    $("#Authors tbody tr").each(function (key, val) {
        var author = $(val).children("td#nickname").text();

        if (book.split(",").includes(author)) {
            var firstName = $(val).children("td#fName").text();
            var lastName = $(val).children("td#lName").text();
            authors.push(firstName + " " + lastName);
        }
    });

    return authors;
}


function buildMultiSelect() {
    $("option").remove();
    loadAllNicknamesFromLocalStorage();
    loadAllAuthors("data_authors.json");

}


function loadJSONfile(fileName, appender, option) {
    $.getJSON(fileName, function (data) {

        var items = "<tr>";
        $.each(data, function (key, val) {
            $.each(val, function (keyword, value) {
                items += '<td id="' + keyword + '">' + value + '</td>';
            })
            items += option + "</tr>";
        });

        $(items).appendTo(appender);
    });

};

function loadLocalStorage(key, appender, option) {

    var data = JSON.parse(localStorage.getItem(key))

    $.each(data, function (keys, val) {

        var items = "<tr>";
        $.each(val, function (keyword, value) {
            items += '<td id="' + keyword + '">' + value + '</td>';
        });
        items += option + "</tr>";
        $(items).appendTo(appender);
    });
};

function loadAllAuthors(fileName) {

    var items = "";

    $.getJSON(fileName, function (data) {

        $.each(data, function (key, val) {
            $.each(val, function (keyword, value) {

                if (keyword.includes("nickname")) {
                    items += '<option value="' + value + '">' + value + '</option>';
                }
            })
        });

        if (items != "") {
            $(items).appendTo("select");
            $("select").multiselect('rebuild');
        }

    });

    return items;
};

function loadAllNicknamesFromLocalStorage() {
    var items = "";

    var data = JSON.parse(localStorage.getItem("authors"))

    $.each(data, function (keys, val) {

        $.each(val, function (keyword, value) {

            if (keyword.includes("nickname")) {
                items += '<option value="' + value + '">' + value + '</option>';
            }
        })
    });
    $(items).appendTo("select");

    $("select").multiselect('rebuild');

    if ($("option").text() == "") {
        $("option").remove();
    }
}