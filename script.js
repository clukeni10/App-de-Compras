
const btn = document.getElementById("btn");

btn.addEventListener("click", () => {
      const nome = document.getElementById("nome").value;
      const valor = document.getElementById("valor").value;

      if(nome && valor){
            let Registros = JSON.parse(localStorage.getItem("Registros")) || [];

            Registros.push({nome, valor});
      
            localStorage.setItem("Registros", JSON.stringify(Registros));
            alert("Dados salvos com sucesso.")
      } else{
            alert("Insira todos os dados");
      }
      window.location.href = "produtos.html";
});

