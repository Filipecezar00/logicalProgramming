const container = document.getElementById("lista_usuarios");

const arrayUsuarios = [
  {
    id: 1,
    name: "Ana Silva",
    role: "Dev Trainee",
  },
  {
    id: 2,
    name: "Lucas Souza",
    role: "Design UI/UX",
  },
];

arrayUsuarios.forEach((usuario) => {
  container.innerHTML += `
    <h3>Nome do usuário: ${usuario.name}</h3>
    <p>Cargo do usuário: ${usuario.role}</p>
    `;
});
