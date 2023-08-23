const API = 'https://api-rest-post-diegocandido.herokuapp.com/postagem/';

const allPosts = document.getElementById('post');
const btn = document.getElementById('btn');

async function pegarPost(postId) {
    try {
        const response = await fetch(API + postId);
        if (!response.ok) {
            throw new Error('Postagem inválida');
        }
        const data = await response.json();
        lerMais(data);
    } catch (error) {
        console.error('Erro ao carregar mais informações', error);
    }
}

function lerMais(post) {
    const img = post.thumbImage.startsWith('/') ? `https://api-rest-post-diegocandido.herokuapp.com${post.thumbImage}` : post.thumbImage;

    const carregarPost = `
    <br><br>
    <div>
        <div class="relative h-96">
            <img class="absolute w-full h-full object-cover" style="border-radius: 1rem" src="${img}" alt="${post.thumbImageAltText}">
        </div>
        <br>
        <div class="p-5" style="background-color: #e0e0e0; border-radius: 1rem">
            <h1 class="text-3xl font-semibold mb-5">${post.title}</h1>
            <br>
            <p class="text-gray-700">${post.description}</p>
            <br><br>
            <p class="mt-2 text-gray-500">Escrito por ${post.profileName} em ${post.postDate}</p>
            <br>
        </div>
        <br><br>
    </div>`;
    
    allPosts.innerHTML = carregarPost;
}

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');

if (postId) {
    pegarPost(postId);
}