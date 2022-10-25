let id = null;

async function getPosts() {
    let res = await fetch("http://restapi-php/posts") // получаем массив json и помещаем его в переменную
    let posts = await res.json() // образуем данные в JSON формат

    document.querySelector('.post-list').innerHTML = '';
    posts.forEach((post) => {
        document.querySelector('.post-list').innerHTML += `

         <div class="card" style="width: 18rem">
                <div class="card-body">
                    <h5 class="card-title">${post.title}</h5>
                    <p class="card-text">${post.body}</p>
                    <p class="card-phone">${post.phone}</p>
                    <a href="#" class="card-link">Подробнее</a>
                    <a href="#" class="card-link" onclick="removePost(${post.id})">Удалить</a>
<!--                    // <a href="#" class="card-link" onclick="selectPost('${post.id}', '${post.title}', '${post.body}', '${post.phone}')">Редактировать</a>-->
                </div>
            </div>
        `
    })
}

async function addPost() {
    const title = document.getElementById('title').value,
        body = document.getElementById('body').value,
        phone = document.getElementById('phone').value;

    let formData = new FormData();
    formData.append('title', title)
    formData.append('body', body)
   formData.append('phone', phone)
    const res = await fetch('http://restapi-php/posts', {
        method: 'POST',
        body: formData,
        phone: formData
    })
    const data = await res.json()

    if (data.status === true) {
        await getPosts()
    }
}

async function removePost(id) {
    const res = await fetch(`http://restapi-php/posts/${id}`, {
        method: "DELETE"
    })

    const data = await res.json()
    if (data.status === true) {
        await getPosts()
    }
}

// function selectPost(id,title,body) {
//     id = id;
//     document.getElementById('title-edit').value = title;
//     document.getElementById('body-edit').value = body;
//     document.getElementById('phone-edit').value = phone;
// }
//
// async function updatePost(id) {
//     const title =  document.getElementById('title-edit').value,
//         body = document.getElementById('body-edit').value,
//         phone = document.getElementById('phone-edit').value;
//
//     const data = {
//         title: title,
//         body: body,
//         phone: phone
//     }
//
//     const res = await fetch(`http://restapi-php/posts/${id}`, {
//         method: "PATCH",
//         body: JSON.stringify(data)
//     })
//
//     let resData = res.json()
//     if (resData.status === true) {
//         await getPosts()
//     }
// }

getPosts()
