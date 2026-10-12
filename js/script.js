const menuToggle = document.getElementById("menuToggle");
const menuPrincipal = document.getElementById("menuPrincipal");
const dropdowns = document.querySelectorAll(".dropdown");

function fecharSubmenus() {
    dropdowns.forEach(function (dropdown) {
        dropdown.classList.remove("aberto");
        const link = dropdown.querySelector(":scope > a");
        if (link) link.setAttribute("aria-expanded", "false");
    });
}

if (menuToggle && menuPrincipal) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.addEventListener("click", function () {
        const aberto = menuPrincipal.classList.toggle("ativo");
        menuToggle.textContent = aberto ? "✕" : "☰";
        menuToggle.setAttribute("aria-expanded", String(aberto));
        menuToggle.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
        if (!aberto) fecharSubmenus();
    });
}

dropdowns.forEach(function (dropdown) {
    const link = dropdown.querySelector(":scope > a");
    const submenu = dropdown.querySelector(".submenu");
    if (!link || !submenu) return;

    link.setAttribute("aria-expanded", "false");
    link.addEventListener("click", function (event) {
        if (window.innerWidth > 768) return;
        if (!dropdown.classList.contains("aberto")) {
            event.preventDefault();
            fecharSubmenus();
            dropdown.classList.add("aberto");
            link.setAttribute("aria-expanded", "true");
        }
        // Segundo toque no item principal: segue o link normalmente.
    });
});

window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
        if (menuPrincipal) menuPrincipal.classList.remove("ativo");
        if (menuToggle) {
            menuToggle.textContent = "☰";
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Abrir menu");
        }
        fecharSubmenus();
    }
});
