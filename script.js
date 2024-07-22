let totalDistance = 0; // Variável global para armazenar a soma das distâncias em pixels

// Relação de pixels para metros (por exemplo, 100 pixels = 0.0254 metros)
const pixelsPerMeter = 100 / 0.0254;
let moveWithMouse = false; // Flag para controlar o movimento do texto
let showAllMilestones = false; // Flag para controlar a exibição de todos os marcos
let milestoneIndex = 0; // Índice do próximo marco a ser alcançado

const log = document.getElementById("log");
const toggleButton = document.getElementById("toggleButton");
const toggleMilestonesButton = document.getElementById("toggleMilestones");
const milestoneList = document.getElementById("milestoneList");

// Lista de marcos
const milestones = [
  { distance: 0.02, message: "You have traveled the length of a pen (2 cm)." },
  {
    distance: 0.055,
    message: "Your mouse have traveled the height of a mouse (5.5 cm).",
  },
  {
    distance: 0.1,
    message:
      "Your mouse have traveled the height of a basketball hoop (10 cm).",
  },
  {
    distance: 0.15,
    message: "Your mouse have traveled the length of a notebook (15 cm).",
  },
  {
    distance: 0.5,
    message: "Your mouse have traveled the height of a refrigerator (50 cm).",
  },
  {
    distance: 1,
    message: "Your mouse have traveled the height of a doorway (1 m).",
  },
  {
    distance: 1.5,
    message: "Your mouse have traveled the length of a bed (1.5 m).",
  },
  {
    distance: 4.2,
    message: "Your mouse have traveled the length of a car (4.2 m).",
  },
  {
    distance: 5.5,
    message: "Your mouse have traveled the height of a giraffe (5.5 m).",
  },
  {
    distance: 10,
    message: "Your mouse have traveled the height of a telephone pole (10 m).",
  },
  {
    distance: 10,
    message: "Your mouse have traveled the length of a bus (10 m).",
  },
  {
    distance: 20,
    message:
      "Your mouse have traveled the height of a five-story building (20 m).",
  },
  {
    distance: 25,
    message: "Your mouse have traveled the length of a train car (25 m).",
  },
  {
    distance: 50,
    message: "Your mouse have traveled the height of a rocket (50 m).",
  },
  {
    distance: 100,
    message: "Your mouse have traveled the height of the Eiffel Tower (100 m).",
  },
  {
    distance: 110,
    message: "Your mouse have traveled the length of a football field (110 m).",
  },
  {
    distance: 195,
    message: "Your mouse have traveled the length of the Titanic (195 m).",
  },
  {
    distance: 200,
    message:
      "Your mouse have traveled the height of the Washington Monument (200 m).",
  },
  {
    distance: 300,
    message:
      "Your mouse have traveled the height of the Statue of Liberty (300 m).",
  },
  {
    distance: 400,
    message:
      "Your mouse have traveled the height of the Empire State Building (400 m).",
  },
  {
    distance: 500,
    message: "Your mouse have traveled the height of the Burj Khalifa (500 m).",
  },
  { distance: 1000, message: "Your mouse have traveled 1 kilometer (1000 m)." },
  {
    distance: 2000,
    message: "Your mouse have traveled 2 kilometers (2000 m).",
  },
  {
    distance: 2750,
    message:
      "Your mouse have traveled the length of the Golden Gate Bridge (2.75 km).",
  },
  {
    distance: 4000,
    message:
      "Your mouse have traveled the length of the Great Wall of China section (4 km).",
  },
  {
    distance: 5000,
    message: "Your mouse have traveled 5 kilometers (5000 m).",
  },
  {
    distance: 10000,
    message: "Your mouse have traveled 10 kilometers (10000 m).",
  },
];

// Inicializa a lista de marcos
function initializeMilestoneList() {
  milestoneList.innerHTML = "";
  milestones.forEach((milestone, index) => {
    const milestoneItem = document.createElement("li");
    milestoneItem.textContent = milestone.message;
    milestoneItem.dataset.index = index;
    milestoneList.appendChild(milestoneItem);
  });
}

// Atualiza a visibilidade da lista de marcos
function updateMilestoneVisibility() {
  const milestoneItems = milestoneList.getElementsByTagName("li");
  for (const item of milestoneItems) {
    item.style.opacity = showAllMilestones ? "1" : "0";
  }
}

// Inicializa a lista de marcos
initializeMilestoneList();

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
    // Encontra o item correspondente na lista de marcos
    const milestoneItem = milestoneList.querySelector(
      `[data-index="${milestoneIndex}"]`
    );
    if (milestoneItem) {
      // Aplica a classe highlight para o fade in
      milestoneItem.classList.add("highlight");

      // Remove a classe highlight e adiciona fade-out após 5 segundos
      setTimeout(() => {
        milestoneItem.classList.remove("highlight");
        milestoneItem.classList.add("reached");
      }, 5000);
    }

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

// Função para alternar a exibição de todos os marcos
toggleMilestonesButton.addEventListener("click", () => {
  showAllMilestones = !showAllMilestones;
  toggleMilestonesButton.innerText = showAllMilestones
    ? "Hide Milestones"
    : "Show Milestones";
  updateMilestoneVisibility();
});

document.addEventListener("mousemove", logMovement);
