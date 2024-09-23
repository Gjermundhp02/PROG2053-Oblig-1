async function* postElement() {
    let id = 1;
    while(id++<=100){
        const element = document.createElement('div');
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        if (response.ok) {
            const data = await response.json();
            const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${data.userId}`);
            if(userResponse.ok) {
                const userData = await userResponse.json();
                element.id = data.id;
                element.classList.add('post');
                element.innerHTML = `
                    <h2>${data.title}</h2>
                    <h3>${userData.name}</h3>
                    <p>${data.body}</p>
                `;
                yield element;
            }
        }
    }
}

const asyncGen = postElement();

document.addEventListener('scroll', async () => {
    if((window.scrollY + window.innerHeight+400) >= document.body.scrollHeight) {
        for(let i = 0; i < 4; i++) {
            const el = (await asyncGen.next()).value;
            if(el) {
                document.getElementById('posts').append(el);
            }
        }
    }
})

setTimeout(async () => {
    const el = document.getElementById('posts');
    for (let i = 0; i < 12; i++) {
        el.append((await asyncGen.next()).value);
    }
}, 0);