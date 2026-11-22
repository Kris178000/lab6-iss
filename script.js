let apiURL = "https://api.wheretheiss.at/v1/satellites/25544?units=kilometers";
let refreshButton = document.querySelector("#refresh-button");
let hemisphere = document.querySelector("#hemisphere");

async function getISS() {
  refreshButton.disabled = true;

  try {
    let response = await fetch(apiURL);
    if (!response.ok) {
      throw new Error("Request failed.");
    }

    let data = await response.json();

    document.querySelector("#latitude").textContent = data.latitude.toFixed(2);
    document.querySelector("#longitude").textContent = data.longitude.toFixed(2);
    document.querySelector("#speed").textContent = data.velocity.toFixed(0);
    document.querySelector("#altitude").textContent = data.altitude.toFixed(1);
    document.querySelector("#update-time").textContent =
      "API time: " + new Date(data.timestamp * 1000).toUTCString();

    if (data.latitude > 0) {
      hemisphere.textContent = "Northern hemisphere";
      document.body.className = "north";
    } else if (data.latitude < 0) {
      hemisphere.textContent = "Southern hemisphere";
      document.body.className = "south";
    } else {
      hemisphere.textContent = "At the equator";
      document.body.className = "equator";
    }

  } catch (error) {
    console.log(error);
  }

  setTimeout(function () {
    refreshButton.disabled = false;
  }, 1100);
}

refreshButton.addEventListener("click", getISS);
getISS();
