$.ajax({
    type: 'GET',
    url: '/api/books',
    success: (data) => {
        let template = '';
        data.map(item => {
            template += `
                    <a class="book_item" href="edit_book.html?book_id=${item._id}">
                        <div class="item name">
                            <span>${item.title}</span>
                        </div>
                        <div class="item author">
                            ${item.author}
                        </div>
                        <div class="item price">
                            ${item.price}
                        </div>
                    </a>`
        });
        $('.books_container').append(template);
    },
    error: () => {
        alert('An error has occurred!');
    }
})

$.ajax({
    type: 'GET',
    url: '/api/stores',
    success: (data) => {
        let template = '';
        data.map(item => {
            template += `
                    <a class="book_item" href="edit_store.html?store_id=${item._id}">
                        <div class="item name">
                            <span>${item.name}</span>
                        </div>
                        <div class="item author">
                            ${item.address}
                        </div>
                        <div class="item price">
                            ${item.phone}
                        </div>
                    </a>`
        });
        $('.stores_container').append(template);
    },
    error: () => {
        alert('An error has occurred!');
    }
})

$('#add_store_form').submit(e => {
    e.preventDefault();

    let store = {
        name: $('#name').val(),
        address: $('#address').val(),
        phone: $('#phone').val()
    }

    $.ajax({
        type: 'POST',
        url: '/api/add/store',
        data: JSON.stringify(store),
        contentType: 'application/json',
        success: () => {
            $('#add_store_form')[0].reset();
            alert('The store was added successfully!');
            window.location.href = '/list_store.html';
        },
        error: () => {
            alert('An error has occurred!');
        }
    })
})

$.ajax({
    type: 'GET',
    url: '/api/stores',
    success: (data, status, xhr) => {
        data.map(item => {
            $('#stores').append($('<option>', {
                value: item.name,
                text: item.name
            }))
        })
    },
    error: () => {
        alert('An error has occurred!');
    }
})

$('#add_book_form').submit(e => {
    e.preventDefault();

    let book = {
        title: $('#title').val(),
        author: $('#author').val(),
        pages: $('#pages').val(),
        price: $('#price').val(),
        stores: $('#stores').val()
    }

    $.ajax({
        type: 'POST',
        url: '/api/add/book',
        data: JSON.stringify(book),
        contentType: 'application/json',
        success: () => {
            $('#add_book_form')[0].reset();
            alert('The book was added successfully!');
            window.location.href = '/';
        },
        erro: () => {
            alert('An error has occurred!');
        }
    })
})

let searchParams = new URLSearchParams(window.location.search);
let bookID = searchParams.get('book_id');
let storeID = searchParams.get('store_id');

$.ajax({
    type: 'GET',
    url: `/api/stores/${storeID}`,
    success: (data) => {
        $('#name').val(data.name),
        $('#address').val(data.address),
        $('#phone').val(data.phone)
    }
})

$.ajax({
    type: 'GET',
    url: `/api/books/${bookID}`,
    success: (data) => {
        $('#title').val(data.title);
        $('#author').val(data.author);
        $('#pages').val(data.pages);
        $('#price').val(data.price);
        $('#stores').val(data.stores);
    }
})

$('#edit_books_form').submit(e => {
    e.preventDefault();

    let book = {
        title: $('#title').val(),
        author: $('#author').val(),
        pages: $('#pages').val(),
        price: $('#price').val(),
        stores: $('#stores').val()
    }

    $.ajax({
        type: 'PATCH',
        url: `/api/add/books/${bookID}`,
        data: JSON.stringify(book),
        contentType: 'application/json',
        success: (data) => {
            alert('The book was updated successfully!');
            window.location.href = '/';
        },
        error: () => {
            alert('An error has occurred!');
        }
    })
})

$('#edit_stores_form').submit(e => {
    e.preventDefault();

    let store = {
        name: $('#name').val(),
        address: $('#address').val(),
        phone: $('#phone').val()
    }

    $.ajax({
        type: 'PATCH',
        url: `/api/add/stores/${storeID}`,
        data: JSON.stringify(store),
        contentType: 'application/json',
        success: (data) => {
            alert('The store was updated successfully!');
            window.location.href = '/list_store.html';
        },
        error: () => {
            alert('An error has occurred!');
        }
    })
})

$('#delete_book').click(() => {
    $.ajax({
        type: 'DELETE',
        url: `/api/delete/books/${bookID}`,
        success: () => {
            alert('The book was deleted successfully!');
            window.location.href = '/';
        },
        error: () => {
            alert('An error has occurred!');
        }
    })
})

$('#delete_store').click(() => {
    $.ajax({
        type: 'DELETE',
        url: `/api/delete/stores/${storeID}`,
        success: () => {
            alert('The store was deleted successfully!');
            window.location.href = '/list_store.html';
        },
        error: () => {
            alert('An error has occurred!');
        }
    })
})