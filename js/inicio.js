const API = 'https://api-rest-post-diegocandido.herokuapp.com/postagens/';

const allPosts = document.getElementById('posts');
const btn = document.getElementById('btn');

async function pegarPost() {
    try {
        const response = await fetch(API);
        if (!response.ok) {
            throw new Error('Erro ao buscar postagens');
        }
        const data = await response.json();
        lerMais(data);
    } catch (error) {
        console.error('Erro ao buscar as postagens:', error);
    }
}

function lerMais(posts) {
    let postsHTML = '';

    posts.forEach((post , index) => {
        const image = post.thumbImage.startsWith('/') ? `https://api-rest-post-diegocandido.herokuapp.com${post.thumbImage}` : post.thumbImage;

        const carregarPost = `
        <div class="container px-4 px-lg-5">
            <div class="row gx-4 gx-lg-5 justify-content-center">
                <div class="col-md-10 col-lg-8 col-xl-10">
                    <div class="container">
                        <div class="d-flex justify-content-center mt-5" style="cursor: pointer; border-bottom: var(--bs-border-width) var(--bs-border-style) var(--bs-border-color) !important;">
                            <img style="width: 12rem; height: 16rem; padding-right: 1rem; border-radius: 0.5rem;" src="${image}" alt="${post.thumbImageAltText}">
                            <div class="p-4">
                                <h2 class="text-xl font-semibold mb-2">${post.title}</h2>
                                <a href="post.html?id=${index}" class="mt-4 inline-block text-blue-500 hover:underline">Ler Mais</a>
                                <p class="mt-2 text-gray-500">Publicado por ${post.profileName}, em ${post.postDate}</p>
                                <hr class="my-5"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
        postsHTML += carregarPost;
    });

    allPosts.innerHTML = postsHTML;
}

pegarPost();