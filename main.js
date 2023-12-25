document.addEventListener('DOMContentLoaded', function() {
    const userList = document.querySelector('.user-list');
    const postInfo = document.querySelector('.post-info');

    // ดึงข้อมูล User จาก JSONPlaceholder API
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {
            users.forEach(user => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `<a href="#" data-id="${user.id}">${user.name} / ${user.email}</a>`;
                userList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error fetching users:', error));

    // เมื่อคลิกที่ user
    userList.addEventListener('click', function(event) {
        if (event.target.tagName === 'A') {
            const userId = event.target.dataset.id;

            // ดึงข้อมูล Post ของ User จาก JSONPlaceholder API
            fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
                .then(response => response.json())
                .then(posts => {
                    postInfo.innerHTML = '<h3>User Posts:</h3>';
                    posts.forEach(post => {
                        const postItem = document.createElement('div');
                        postItem.classList.add('post');
                        postItem.innerHTML = `<h4>${post.title}</h4><p>${post.body}</p>`;
                        postInfo.appendChild(postItem);
                    });
                })
                .catch(error => console.error(`Error fetching posts for user ${userId}:`, error));
        }
    });
});
