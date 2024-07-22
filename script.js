let totalDistance = 0; // Variável global para armazenar a soma das distâncias em pixels

// Relação de pixels para metros (por exemplo, 100 pixels = 0.0254 metros)
const pixelsPerMeter = 100 / 0.0254;

function logMovement(event) {
  let distanceInPixels = Math.sqrt(
    Math.pow(event.movementX, 2) + Math.pow(event.movementY, 2)
  );
  let distanceInMeters = distanceInPixels / pixelsPerMeter; // Converte a distância de pixels para metros
  totalDistance += distanceInMeters; // Adiciona a distância calculada em metros à soma total

  // Formata a distância total em metros com quatro casas decimais
  let formattedDistance = totalDistance.toFixed(4);

  // Limpa o conteúdo atual do elemento log e insere a nova mensagem
  log.innerHTML = `Total Distance in Meters: ${formattedDistance}`;

  console.log(`Total Distance in Meters: ${formattedDistance}`); // Exibe a soma total das distâncias em metros no console

  while (log.childNodes.length > 128) log.lastChild.remove();
}

const log = document.getElementById("log");
document.addEventListener("mousemove", logMovement);
