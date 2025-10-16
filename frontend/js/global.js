document.addEventListener("DOMContentLoaded", () => {
    const usuario = JSON.parse(localStorage.getItem("usuario"))
    document.getElementById("user-name").textContent = usuario.nome
    document.getElementById("user-role").textContent = usuario.papel
});

//  Função auxiliar de alertas visuais
function showAlert(mensagem, tipo = "info") {
    const alertDiv = document.createElement("div");
    alertDiv.className = `alert alert-${tipo}`;
    alertDiv.textContent = mensagem;
    alertDiv.style.cssText = `
    position: fixed;
    top: 1rem;
    right: 1rem;
    background: ${tipo === "success" ? "#4caf50" : tipo === "error" ? "#f44336" : "#ff9800"};
    color: white;
    padding: 10px 16px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    z-index: 9999;
    animation: fadeOut 3s forwards;
`;
    document.body.appendChild(alertDiv);
    setTimeout(() => alertDiv.remove(), 3000);
}

document.getElementById("logout-btn").addEventListener("click", () => {
    localStorage.removeItem("token")
    localStorage.removeItem("usuario")
    window.location.href = "./login.html"
})