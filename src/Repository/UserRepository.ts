
import { saveImage } from "../DAO/UserDAO";


// Lidar com a seleção da imagem
export function IconChange(imageInput: HTMLInputElement) { 
      imageInput.addEventListener("change", function () {
            const file = this.files?.[0];

            if (file) {
                  // Cria um objeto FileReader para ler a imagem
                  const reader = new FileReader();

                  // Quando o arquivo for lido, salvar no localStorage e substituir o ícone
                  reader.onload = function (e) {
                        const imageBase64 = e.target?.result as string;

                        saveImage(imageBase64)

                        // Substituir o ícone pela imagem selecionada
                        
                  }


                  reader.readAsDataURL(file); // Lê o arquivo como URL de dados (base64)
            }
      });
}; 

