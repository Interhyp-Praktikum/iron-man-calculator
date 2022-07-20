/* eslint-disable */

let summedUpStats;

const selectedItems = {
  selectedHelmet: window.helme[0],
  selectedArms: window.arme[0],
  selectedBody: window.körper[0],
  selectedLegs: window.beine[0]
};

const calculateStat = ({
  selectedHelmet,
  selectedBody,
  selectedLegs,
  selectedArms,
  helmetWeight = 0.5,
  bodyWeight = 2,
  key
}) => {
  return (
    (selectedHelmet[key] * helmetWeight +
      selectedBody[key] * bodyWeight +
      selectedLegs[key] +
      selectedArms[key]) /
    4
  );
};

const updateSummedUpStats = () => {
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

window.changeItemsInGrid = (allElements, selectedElementKey) => {
  const gitter = document.querySelector(".grid");
  gitter.innerHTML = allElements
    .map(
      (element, index) =>
        `<button class="grid-button" id="${index}">
            <img class="grid-image" src="/assets/${element.Image}"/>
        </button>`
    )
    .join("");
  document.querySelectorAll(".grid-button").forEach(
    (select) =>
      (select.onclick = (button) => {
        const selectedElement = allElements[button.target.id];
        selectedItems[selectedElementKey] = selectedElement;
        updateSummedUpStats();
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
            size: 10
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
