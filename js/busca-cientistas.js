
document.addEventListener("DOMContentLoaded", function () {

    const cards = document.querySelectorAll(".card-cientista");

    if (cards.length === 0) {
        return;
    }

    const secaoBusca = document.createElement("section");
    secaoBusca.className = "busca-cientistas";

    secaoBusca.innerHTML = `
        <label for="campoBuscaCientistas">
            Pesquisar por nome
        </label>

        <input
            type="search"
            id="campoBuscaCientistas"
            placeholder="Digite o nome da cientista"
        >

        <label for="filtroAreaCientistas">
            Filtrar por área
        </label>

        <select id="filtroAreaCientistas">
            <option value="">Todas as áreas</option>
        </select>

        <p id="resultadoBuscaCientistas"
           role="status"
           aria-live="polite"></p>
    `;

    const lista = document.querySelector(".lista-biografias");

    if (!lista) {
        return;
    }

    lista.parentNode.insertBefore(secaoBusca, lista);

    const campo = document.getElementById("campoBuscaCientistas");
    const filtro = document.getElementById("filtroAreaCientistas");
    const resultado = document.getElementById("resultadoBuscaCientistas");

    const normalizar = texto => {
        return String(texto || "")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .trim();
    };

    const areas = new Set();

    cards.forEach(card => {
        if (card.dataset.area) {
            areas.add(card.dataset.area);
        }
    });

    [...areas]
        .sort((a, b) => a.localeCompare(b, "pt-BR"))
        .forEach(area => {
            const option = document.createElement("option");
            option.value = area;
            option.textContent = area;
            filtro.appendChild(option);
        });

    function pesquisar() {
        const texto = normalizar(campo.value);
        const areaSelecionada = normalizar(filtro.value);

        let encontrados = 0;

        cards.forEach(card => {
            const nome = normalizar(card.dataset.nome);
            const conteudo = normalizar(card.textContent);
            const area = normalizar(card.dataset.area);

            const correspondeNome =
                nome.includes(texto) || conteudo.includes(texto);

            const correspondeArea =
                areaSelecionada === "" || area === areaSelecionada;

            const mostrar = correspondeNome && correspondeArea;

            card.hidden = !mostrar;
            card.style.display = mostrar ? "" : "none";

            if (mostrar) {
                encontrados++;
            }
        });

        resultado.textContent =
            encontrados === 0
                ? "Nenhuma cientista encontrada."
                : `${encontrados} cientista(s) encontrada(s).`;
    }

    campo.addEventListener("input", pesquisar);
    filtro.addEventListener("change", pesquisar);

    pesquisar();
});
