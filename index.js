const container = document.querySelector(".container");
const boton = document.querySelector(".B");
const botonA = document.querySelector(".A");


let contador = 0

let api = `https://pokeapi.co/api/v2/pokemon/?limit=0&offset=${contador}`;
let next = "";
let previus = "";

boton.addEventListener("click", () => {
    api = next;
    getPokemons();
})
botonA.addEventListener("click", () => {
    if(previus === null){contador = 20}
    else {
        api = previus;
    }
    getPokemons();
})
const getPokemons =  async () => {
    try {
        const respuesta = await fetch(api);
        if(respuesta.status === 200){
            const pokemones = await respuesta.json();
            next = pokemones.next;
            previus = pokemones.previous;
            const listPokemosDes = [...pokemones.results];
            const listPokemos = listPokemosDes.sort((a,b) => a-b);
            container.innerHTML = "";

            listPokemos.forEach(async poke => {
                const img = await fetch(poke.url);
                const pokeImg = await img.json();
                paintImg(pokeImg);
            })
        }

    } catch (error) {
        console.log(error);
    }
}
const paintImg = (img) =>{
    let image =   `<div class="image">
                        <p class="id">${img.id}</p>
                        <img src="${img.sprites.other.dream_world.front_default}" alt="">
                        <div class="name">
                            <p>${img.name}</p>
                        </div>
                    </div>`
    container.insertAdjacentHTML("beforeend", image);
}

getPokemons();