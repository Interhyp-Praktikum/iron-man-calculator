/* eslint-disable */

let summedUpStats;
const selectedItems = {
  selectedHelmet: undefined,
  selectedArms: undefined,
  selectedBody: undefined,
  selectedLegs: undefined
};

const calculateStat = ({
  selectedHelmet,
  selectedBody,
  selectedLegs,
  selectedArms,
  helmetWeight = 0.5,
  bodyWeight = 1,
  key
}) => {
  const helmetValue = selectedHelmet ? selectedHelmet[key] : 0;
  const bodyValue = selectedBody ? selectedBody[key] : 0;
  const legsValue = selectedLegs ? selectedLegs[key] : 0;
  const armsValue = selectedArms ? selectedArms[key] : 0;
  return (
    (helmetValue * helmetWeight +
      bodyValue * bodyWeight +
      legsValue +
      armsValue) /
    4
  );
};

const updateSummedUpStats = () => {
  const helmetPrice = selectedItems.selectedHelmet
    ? selectedItems.selectedHelmet.Price
    : 0;
  const bodyPrice = selectedItems.selectedBody
    ? selectedItems.selectedBody.Price
    : 0;
  const legsPrice = selectedItems.selectedLegs
    ? selectedItems.selectedLegs.Price
    : 0;
  const armsPrice = selectedItems.selectedArms
    ? selectedItems.selectedArms.Price
    : 0;
  var finalPrice = helmetPrice + bodyPrice + legsPrice + armsPrice;
  document.getElementById("amount").innerText = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR"
  }).format(finalPrice);

  summedUpStats = {
    Strength: calculateStat({
      selectedArms: selectedItems.selectedArms,
      selectedBody: selectedItems.selectedBody,
      selectedHelmet: selectedItems.selectedHelmet,
      selectedLegs: selectedItems.selectedLegs,
      key: "Strength"
    }),
    Agility: calculateStat({
      selectedArms: selectedItems.selectedArms,
      selectedBody: selectedItems.selectedBody,
      selectedHelmet: selectedItems.selectedHelmet,
      selectedLegs: selectedItems.selectedLegs,
      key: "Agility"
    }),
    Speed: calculateStat({
      selectedArms: selectedItems.selectedArms,
      selectedBody: selectedItems.selectedBody,
      selectedHelmet: selectedItems.selectedHelmet,
      selectedLegs: selectedItems.selectedLegs,
      key: "Speed"
    }),
    Price: calculateStat({
      selectedArms: selectedItems.selectedArms,
      selectedBody: selectedItems.selectedBody,
      selectedHelmet: selectedItems.selectedHelmet,
      selectedLegs: selectedItems.selectedLegs,
      key: "Price"
    }),
    Protection: calculateStat({
      selectedArms: selectedItems.selectedArms,
      selectedBody: selectedItems.selectedBody,
      selectedHelmet: selectedItems.selectedHelmet,
      selectedLegs: selectedItems.selectedLegs,
      key: "Protection"
    }),
    Weight: calculateStat({
      selectedArms: selectedItems.selectedArms,
      selectedBody: selectedItems.selectedBody,
      selectedHelmet: selectedItems.selectedHelmet,
      selectedLegs: selectedItems.selectedLegs,
      key: "Weight"
    })
  };
};

window.mute = function () {
  var BgMusic = document.getElementById("Backgroundmusic");
  var unmutedemoji = "🔊";
  var mutedemoji = "🔇";
  var MuteButton = document.getElementById("Pika");
  if (BgMusic.muted) {
    MuteButton.innerText = unmutedemoji;
    BgMusic.play();
    BgMusic.muted = false;
  } else {
    MuteButton.innerText = mutedemoji;
    BgMusic.muted = true;
    BgMusic.pause();
  }
};

window.reset = function () {
  location.reload();
};

window.changeItemsInGrid = (allElements, selectedElementKey) => {
  const gitter = document.querySelector(".grid");
  gitter.innerHTML = allElements
    .map((element, index) => {
      const buttonelement = allElements[index];
      const selectedElement = selectedItems[selectedElementKey];
      const background =
        buttonelement === selectedElement ? "background-color:#fefefe" : "";

      return `<button style="${background}" class="grid-button" id="${index}">
            <img class="grid-image" src="/assets/${element.Image}"/>
        </button>`;
    })
    .join("");

  document.querySelectorAll(".grid-button").forEach(
    (select) =>
      (select.onclick = (button) => {
        const selectedElement = allElements[button.target.id];
        var gridbuttons = document.querySelectorAll(".grid-button");
        gridbuttons.forEach((button) => {
          var buttonElement = allElements[button.id];
          if (buttonElement != selectedElement) {
            button.style.backgroundColor = "transparent";
          } else {
            button.style.backgroundColor = "#fefefe";
          }
        });

        selectedItems[selectedElementKey] = selectedElement;
        updateSummedUpStats();
        updatepreview();
        updateChartData([
          summedUpStats.Strength,
          summedUpStats.Speed,
          summedUpStats.Agility,
          summedUpStats.Weight,
          summedUpStats.Protection
        ]);
      })
  );
};

const ctx = document.getElementById("myChart");
const myChart = new Chart(ctx, {
  type: "radar",
  data: {
    labels: ["Strength", "Speed", "Agility", "Weight", "Protection"],
    datasets: [
      {
        label: "Statistics",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        pointBackgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(75, 192, 192, 1)"
        ],

        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(75, 192, 192, 1)"
        ],
        color: "#ffffff",
        borderWidth: 1
      }
    ]
  },
  options: {
    responsive: false,
    maintainAspectRatio: true,
    scale: {
      min: 0,
      max: 10
    },
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      r: {
        pointLabels: {
          color: "white",
          font: {
            size: 15
          }
        },
        grid: {
          color: "transparent"
        },
        angleLines: {
          color: "white"
        },
        ticks: {
          callback: function () {
            return "";
          },
          backdropColor: "rgba(0, 0, 0, 0)"
        }
      }
    }
  }
});

window.updateChartData = (data) => {
  myChart.data.datasets[0].data = data;
  myChart.update();
};

var Helmbild = document.querySelector("#helmet");
var Armbild = document.querySelector("#arms");
var Beinbild = document.querySelector("#legs");
var Körperbild = document.querySelector("#body");

function updatepreviewimage(Bild, Element) {
  var anzugteil = selectedItems[Element];
  if (anzugteil) {
    Bild.src = "/assets/" + anzugteil.Image;
    Bild.style.top = anzugteil.Position.top + "px";
    Bild.style.left = anzugteil.Position.left + "px";
    Bild.style.width = anzugteil.Position.width + "px";
    if (anzugteil.Position.height) {
      Bild.style.height = anzugteil.Position.height + "px";
    }
    if (anzugteil.Position.width) {
      Bild.style.width = anzugteil.Position.width + "px";
    }
  }
}

function updatepreview() {
  updatepreviewimage(Beinbild, "selectedLegs");
  updatepreviewimage(Körperbild, "selectedBody");
  updatepreviewimage(Armbild, "selectedArms");
  updatepreviewimage(Helmbild, "selectedHelmet");
}
