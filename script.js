let totalDistance = 0; // Variável global para armazenar a soma das distâncias em pixels

// Relação de pixels para metros (por exemplo, 100 pixels = 0.0254 metros)
const pixelsPerMeter = 100 / 0.0254;
let moveWithMouse = false; // Flag para controlar o movimento do texto
let milestoneIndex = 0; // Índice do próximo marco a ser alcançado

const log = document.getElementById("log");
const toggleButton = document.getElementById("toggleButton");
const milestoneList = document.getElementById("milestoneList");

// Lista de marcos
const milestones = [
  {
    distance: 0.055,
    message: "You have traveled the height of a mouse (5.5 cm).",
  },
  {
    distance: 0.1,
    message: "You have traveled the height of a basketball hoop (10 cm).",
  },
  {
    distance: 0.5,
    message: "You have traveled the height of a refrigerator (50 cm).",
  },
  { distance: 1, message: "You have traveled the height of a doorway (1 m)." },
  {
    distance: 5.5,
    message: "You have traveled the height of a giraffe (5.5 m).",
  },
  {
    distance: 10,
    message: "You have traveled the height of a telephone pole (10 m).",
  },
  {
    distance: 20,
    message: "You have traveled the height of a five-story building (20 m).",
  },
  { distance: 50, message: "You have traveled the height of a rocket (50 m)." },
  {
    distance: 100,
    message: "You have traveled the height of the Eiffel Tower (100 m).",
  },
];

function logMovement(event) {
  let distanceInPixels = Math.sqrt(
    Math.pow(event.movementX, 2) + Math.pow(event.movementY, 2)
  );
  let distanceInMeters = distanceInPixels / pixelsPerMeter; // Converte a distância de pixels para metros
  totalDistance += distanceInMeters; // Adiciona a distância calculada em metros à soma total

  // Converte a distância total para centímetros e quilômetros
  let totalDistanceInCm = (totalDistance * 100).toFixed(2);
  let totalDistanceInKm = (totalDistance / 1000).toFixed(6);

  // Formata a distância total em metros com quatro casas decimais
  let formattedDistance = totalDistance.toFixed(4);

  // Atualiza o conteúdo do elemento log
  log.innerHTML = `
    Total Distance:
    <br> ${totalDistanceInCm} cm
    <br> ${formattedDistance} m
    <br> ${totalDistanceInKm} km
  `;

  // Verifica se um marco foi atingido
  if (
    milestoneIndex < milestones.length &&
    totalDistance >= milestones[milestoneIndex].distance
  ) {
    // Adiciona o marco atingido à lista de marcos
    const milestoneItem = document.createElement("li");
    milestoneItem.textContent = milestones[milestoneIndex].message;
    milestoneList.appendChild(milestoneItem);

    // Destaca o marco
    milestoneItem.classList.add("highlight");

    // Remove a classe de destaque após 5 segundos
    setTimeout(() => {
      milestoneItem.classList.remove("highlight");
    }, 5000);

    milestoneIndex++;
  }

  if (moveWithMouse) {
    // Move o elemento log para a posição do mouse
    log.style.left = `${event.pageX + 10}px`; // Adiciona um deslocamento de 10px para evitar que o texto fique sob o cursor
    log.style.top = `${event.pageY + 10}px`; // Adiciona um deslocamento de 10px para evitar que o texto fique sob o cursor
  }

  console.log(`Total Distance in Meters: ${formattedDistance}`); // Exibe a soma total das distâncias em metros no console

  while (log.childNodes.length > 128) log.lastChild.remove();
}

// Função para alternar o movimento do texto
toggleButton.addEventListener("click", () => {
  moveWithMouse = !moveWithMouse;
  toggleButton.innerText = moveWithMouse
    ? "Disable Movement"
    : "Enable Movement";
});

document.addEventListener("mousemove", logMovement);
