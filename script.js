// Spotify API credentials
const clientId = "b180920d0d0f411b98bfdeedab00615a";
const clientSecret = "4292c7c09db34ad99b169c3d86ff2196";

// Spotify API endpoints
const tokenEndpoint = "https://accounts.spotify.com/api/token";
const featuredPlaylistsEndpoint =
  "https://api.spotify.com/v1/browse/featured-playlists";
const categoryPlaylistsEndpoint =
  "https://api.spotify.com/v1/browse/categories/{category_id}/playlists";

// Function to get access token
async function getAccessToken() {
  const response = await fetch(tokenEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
    },
    body: "grant_type=client_credentials",
  });

  const data = await response.json();
  return data.access_token;
}

// Function to get playlists based on the selected filter
async function getPlaylists(filter, countryCode) {
  try {
    const accessToken = await getAccessToken();
    let response;

    if (filter === "featured") {
      if (countryCode) {
        response = await fetch(
          featuredPlaylistsEndpoint + `?country=${countryCode}`,
          {
            headers: {
              Authorization: "Bearer " + accessToken,
            },
          }
        );
      } else {
        response = await fetch(featuredPlaylistsEndpoint, {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        });
      }
    } else {
      const categoryId = filter;
      response = await fetch(
        categoryPlaylistsEndpoint.replace("{category_id}", categoryId) +
          `?country=${countryCode}`,
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      );
    }

    const data = await response.json();
    return data.playlists.items;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

function displayPlaylists(playlists, country, containerId) {
  const playlistsHtml = playlists
    .map((playlist) => {
      return `<div class="swiper-slide p-4">
        <div class="rounded-lg "> 
        <a href="${playlist.external_urls.spotify}">
          <img alt="${playlist.name}" class="h-full w-full" src="${playlist.images[0].url}">
          </a>
        </div>
      </div>`;
    })
    .join("");

  const playlistsContainer = document.getElementById(containerId);

  // Replace content with new playlists
  playlistsContainer.innerHTML = `
    <div class="mb-10">
      <h2 class="text-xl font-semibold mb-3">Top Playlists ${country}</h2>
      <div class="swiper-container">
        <div class="swiper-wrapper">${playlistsHtml}</div>
      </div>
    </div>`;

  // Initialize Swiper
  new Swiper(".swiper-container", {
    slidesPerView: 5,
  });
}

async function init() {
  const initialFilter = "featured";

  // Get the selected countries from the div elements
  const countryElements = document.querySelectorAll("#featuredPlaylists div");
  const countries = Array.from(countryElements).map((element) =>
    element.getAttribute("value")
  );

  // Fetch and display playlists for Pakistan and US
  const playlistsGlobal = await getPlaylists(initialFilter);
  displayPlaylists(playlistsGlobal, "Global", "globalContainer");

  const playlistsUSA = await getPlaylists(initialFilter, "US");
  displayPlaylists(playlistsUSA, "USA (United States)", "usaContainer");

  const playlistsUK = await getPlaylists(initialFilter, "GB");
  displayPlaylists(playlistsUK, "United Kingdom", "ukContainer");

  const playlistsAlgeria = await getPlaylists(initialFilter, "DZ");
  displayPlaylists(playlistsAlgeria, "Algeria", "algeriaContainer");

  const playlistsArgentina = await getPlaylists(initialFilter, "AR");
  displayPlaylists(playlistsArgentina, "Argentina", "argentinaContainer");

  const playlistsAustralia = await getPlaylists(initialFilter, "AU");
  displayPlaylists(playlistsAustralia, "Australia", "australiaContainer");

  const playlistsBahrain = await getPlaylists(initialFilter, "BH");
  displayPlaylists(playlistsBahrain, "Bahrain", "bahrainContainer");

  const playlistsBrazil = await getPlaylists(initialFilter, "BR");
  displayPlaylists(playlistsBrazil, "Brazil", "brazilContainer");

  const playlistsCanada = await getPlaylists(initialFilter, "CA");
  displayPlaylists(playlistsCanada, "Canada", "canadaContainer");

  const playlistsChile = await getPlaylists(initialFilter, "CL");
  displayPlaylists(playlistsChile, "Chile", "chileContainer");

  const playlistsColombia = await getPlaylists(initialFilter, "CO");
  displayPlaylists(playlistsColombia, "Colombia", "colombiaContainer");

  const playlistsCzechRepublic = await getPlaylists(initialFilter, "CZ");
  displayPlaylists(playlistsCzechRepublic, "Czech Republic", "czechContainer");

  const playlistsDenmark = await getPlaylists(initialFilter, "DK");
  displayPlaylists(playlistsDenmark, "Denmark", "denmarkContainer");

  const playlistsDominicanRepublic = await getPlaylists(initialFilter, "DO");
  displayPlaylists(
    playlistsDominicanRepublic,
    "Dominican Republic",
    "dominicanContainer"
  );

  const playlistsFinland = await getPlaylists(initialFilter, "FI");
  displayPlaylists(playlistsFinland, "Finland", "finlandContainer");

  const playlistsFrance = await getPlaylists(initialFilter, "FR");
  displayPlaylists(playlistsFrance, "France", "franceContainer");

  const playlistsGermany = await getPlaylists(initialFilter, "DE");
  displayPlaylists(playlistsGermany, "Germany", "germanyContainer");

  const playlistsGreece = await getPlaylists(initialFilter, "GR");
  displayPlaylists(playlistsGreece, "Greece", "greeceContainer");

  const playlistsHongKong = await getPlaylists(initialFilter, "HK");
  displayPlaylists(playlistsHongKong, "Hong Kong", "hongkongContainer");

  const playlistsIceland = await getPlaylists(initialFilter, "IS");
  displayPlaylists(playlistsIceland, "Iceland", "icelandContainer");

  const playlistsIndia = await getPlaylists(initialFilter, "IN");
  displayPlaylists(playlistsIndia, "India", "indiaContainer");

  const playlistsIndonesia = await getPlaylists(initialFilter, "ID");
  displayPlaylists(playlistsIndonesia, "Indonesia", "indonesiaContainer");

  const playlistsIreland = await getPlaylists(initialFilter, "IE");
  displayPlaylists(playlistsIreland, "Ireland", "irelandContainer");

  const playlistsIsrael = await getPlaylists(initialFilter, "IL");
  displayPlaylists(playlistsIsrael, "Israel", "israelContainer");

  const playlistsItaly = await getPlaylists(initialFilter, "IT");
  displayPlaylists(playlistsItaly, "Italy", "italyContainer");

  const playlistsJapan = await getPlaylists(initialFilter, "JP");
  displayPlaylists(playlistsJapan, "Japan", "japanContainer");

  const playlistsJordan = await getPlaylists(initialFilter, "JO");
  displayPlaylists(playlistsJordan, "Jordan", "jordanContainer");

  const playlistsKuwait = await getPlaylists(initialFilter, "KW");
  displayPlaylists(playlistsKuwait, "Kuwait", "kuwaitContainer");

  const playlistsLebanon = await getPlaylists(initialFilter, "LB");
  displayPlaylists(playlistsLebanon, "Lebanon", "lebanonContainer");

  const playlistsMalaysia = await getPlaylists(initialFilter, "MY");
  displayPlaylists(playlistsMalaysia, "Malaysia", "malaysiaContainer");

  const playlistsMexico = await getPlaylists(initialFilter, "MX");
  displayPlaylists(playlistsMexico, "Mexico", "mexicoContainer");

  const playlistsMorocco = await getPlaylists(initialFilter, "MA");
  displayPlaylists(playlistsMorocco, "Morocco", "moroccoContainer");

  const playlistsNetherlands = await getPlaylists(initialFilter, "NL");
  displayPlaylists(playlistsNetherlands, "Netherlands", "netherlandsContainer");

  const playlistsNewZealand = await getPlaylists(initialFilter, "NZ");
  displayPlaylists(playlistsNewZealand, "New Zealand", "newzealandContainer");

  const playlistsNorway = await getPlaylists(initialFilter, "NO");
  displayPlaylists(playlistsNorway, "Norway", "norwayContainer");

  const playlistsOman = await getPlaylists(initialFilter, "OM");
  displayPlaylists(playlistsOman, "Oman", "omanContainer");

  const playlistsPalestine = await getPlaylists(initialFilter, "PS");
  displayPlaylists(playlistsPalestine, "Palestine", "palestineContainer");

  const playlistsPhilippines = await getPlaylists(initialFilter, "PH");
  displayPlaylists(playlistsPhilippines, "Philippines", "philippinesContainer");

  const playlistsPoland = await getPlaylists(initialFilter, "PL");
  displayPlaylists(playlistsPoland, "Poland", "polandContainer");

  const playlistsPortugal = await getPlaylists(initialFilter, "PT");
  displayPlaylists(playlistsPortugal, "Portugal", "portugalContainer");

  const playlistsQatar = await getPlaylists(initialFilter, "QA");
  displayPlaylists(playlistsQatar, "Qatar", "qatarContainer");

  const playlistsRomania = await getPlaylists(initialFilter, "RO");
  displayPlaylists(playlistsRomania, "Romania", "romaniaContainer");

  const playlistsSaudiArabia = await getPlaylists(initialFilter, "SA");
  displayPlaylists(playlistsSaudiArabia, "Saudi Arabia", "saudiContainer");

  const playlistsSingapore = await getPlaylists(initialFilter, "SG");
  displayPlaylists(playlistsSingapore, "Singapore", "singaporeContainer");

  const playlistsSouthAfrica = await getPlaylists(initialFilter, "ZA");
  displayPlaylists(
    playlistsSouthAfrica,
    "South Africa",
    "southafricaContainer"
  );

  const playlistsSouthKorea = await getPlaylists(initialFilter, "KR");
  displayPlaylists(playlistsSouthKorea, "South Korea", "southkoreaContainer");

  const playlistsSpain = await getPlaylists(initialFilter, "ES");
  displayPlaylists(playlistsSpain, "Spain", "spainContainer");

  const playlistsSweden = await getPlaylists(initialFilter, "SE");
  displayPlaylists(playlistsSweden, "Sweden", "swedenContainer");

  const playlistsSwitzerland = await getPlaylists(initialFilter, "CH");
  displayPlaylists(playlistsSwitzerland, "Switzerland", "switzerlandContainer");

  const playlistsTaiwan = await getPlaylists(initialFilter, "TW");
  displayPlaylists(playlistsTaiwan, "Taiwan", "taiwanContainer");

  const playlistsThailand = await getPlaylists(initialFilter, "TH");
  displayPlaylists(playlistsThailand, "Thailand", "thailandContainer");

  const playlistsTunisia = await getPlaylists(initialFilter, "TN");
  displayPlaylists(playlistsTunisia, "Tunisia", "tunisiaContainer");

  const playlistsTurkey = await getPlaylists(initialFilter, "TR");
  displayPlaylists(playlistsTurkey, "Turkey", "turkeyContainer");

  const playlistsUAE = await getPlaylists(initialFilter, "AE");
  displayPlaylists(playlistsUAE, "United Arab Emirates", "uaeContainer");

  const playlistsVietnam = await getPlaylists(initialFilter, "VN");
  displayPlaylists(playlistsVietnam, "Vietnam", "vietnamContainer");
}

// Function to handle filter change
async function changeFilter(selectedFilter) {
  // Fetch and display playlists for Pakistan and US
  const playlistsGlobal = await getPlaylists(selectedFilter);
  displayPlaylists(playlistsGlobal, "Global", "globalContainer");

  const playlistsUSA = await getPlaylists(selectedFilter, "US");
  displayPlaylists(playlistsUSA, "USA (United States)", "usaContainer");

  const playlistsUK = await getPlaylists(selectedFilter, "GB");
  displayPlaylists(playlistsUK, "United Kingdom", "ukContainer");

  const playlistsAlgeria = await getPlaylists(selectedFilter, "DZ");
  displayPlaylists(playlistsAlgeria, "Algeria", "algeriaContainer");

  const playlistsArgentina = await getPlaylists(selectedFilter, "AR");
  displayPlaylists(playlistsArgentina, "Argentina", "argentinaContainer");

  const playlistsAustralia = await getPlaylists(selectedFilter, "AU");
  displayPlaylists(playlistsAustralia, "Australia", "australiaContainer");

  const playlistsBahrain = await getPlaylists(selectedFilter, "BH");
  displayPlaylists(playlistsBahrain, "Bahrain", "bahrainContainer");

  const playlistsBrazil = await getPlaylists(selectedFilter, "BR");
  displayPlaylists(playlistsBrazil, "Brazil", "brazilContainer");

  const playlistsCanada = await getPlaylists(selectedFilter, "CA");
  displayPlaylists(playlistsCanada, "Canada", "canadaContainer");

  const playlistsChile = await getPlaylists(selectedFilter, "CL");
  displayPlaylists(playlistsChile, "Chile", "chileContainer");

  const playlistsColombia = await getPlaylists(selectedFilter, "CO");
  displayPlaylists(playlistsColombia, "Colombia", "colombiaContainer");

  const playlistsCzechRepublic = await getPlaylists(selectedFilter, "CZ");
  displayPlaylists(playlistsCzechRepublic, "Czech Republic", "czechContainer");

  const playlistsDenmark = await getPlaylists(selectedFilter, "DK");
  displayPlaylists(playlistsDenmark, "Denmark", "denmarkContainer");

  const playlistsDominicanRepublic = await getPlaylists(selectedFilter, "DO");
  displayPlaylists(
    playlistsDominicanRepublic,
    "Dominican Republic",
    "dominicanContainer"
  );

  const playlistsFinland = await getPlaylists(selectedFilter, "FI");
  displayPlaylists(playlistsFinland, "Finland", "finlandContainer");

  const playlistsFrance = await getPlaylists(selectedFilter, "FR");
  displayPlaylists(playlistsFrance, "France", "franceContainer");

  const playlistsGermany = await getPlaylists(selectedFilter, "DE");
  displayPlaylists(playlistsGermany, "Germany", "germanyContainer");

  const playlistsGreece = await getPlaylists(selectedFilter, "GR");
  displayPlaylists(playlistsGreece, "Greece", "greeceContainer");

  const playlistsHongKong = await getPlaylists(selectedFilter, "HK");
  displayPlaylists(playlistsHongKong, "Hong Kong", "hongkongContainer");

  const playlistsIceland = await getPlaylists(selectedFilter, "IS");
  displayPlaylists(playlistsIceland, "Iceland", "icelandContainer");

  const playlistsIndia = await getPlaylists(selectedFilter, "IN");
  displayPlaylists(playlistsIndia, "India", "indiaContainer");

  const playlistsIndonesia = await getPlaylists(selectedFilter, "ID");
  displayPlaylists(playlistsIndonesia, "Indonesia", "indonesiaContainer");

  const playlistsIreland = await getPlaylists(selectedFilter, "IE");
  displayPlaylists(playlistsIreland, "Ireland", "irelandContainer");

  const playlistsIsrael = await getPlaylists(selectedFilter, "IL");
  displayPlaylists(playlistsIsrael, "Israel", "israelContainer");

  const playlistsItaly = await getPlaylists(selectedFilter, "IT");
  displayPlaylists(playlistsItaly, "Italy", "italyContainer");

  const playlistsJapan = await getPlaylists(selectedFilter, "JP");
  displayPlaylists(playlistsJapan, "Japan", "japanContainer");

  const playlistsJordan = await getPlaylists(selectedFilter, "JO");
  displayPlaylists(playlistsJordan, "Jordan", "jordanContainer");

  const playlistsKuwait = await getPlaylists(selectedFilter, "KW");
  displayPlaylists(playlistsKuwait, "Kuwait", "kuwaitContainer");

  const playlistsLebanon = await getPlaylists(selectedFilter, "LB");
  displayPlaylists(playlistsLebanon, "Lebanon", "lebanonContainer");

  const playlistsMalaysia = await getPlaylists(selectedFilter, "MY");
  displayPlaylists(playlistsMalaysia, "Malaysia", "malaysiaContainer");

  const playlistsMexico = await getPlaylists(selectedFilter, "MX");
  displayPlaylists(playlistsMexico, "Mexico", "mexicoContainer");

  const playlistsMorocco = await getPlaylists(selectedFilter, "MA");
  displayPlaylists(playlistsMorocco, "Morocco", "moroccoContainer");

  const playlistsNetherlands = await getPlaylists(selectedFilter, "NL");
  displayPlaylists(playlistsNetherlands, "Netherlands", "netherlandsContainer");

  const playlistsNewZealand = await getPlaylists(selectedFilter, "NZ");
  displayPlaylists(playlistsNewZealand, "New Zealand", "newzealandContainer");

  const playlistsNorway = await getPlaylists(selectedFilter, "NO");
  displayPlaylists(playlistsNorway, "Norway", "norwayContainer");

  const playlistsOman = await getPlaylists(selectedFilter, "OM");
  displayPlaylists(playlistsOman, "Oman", "omanContainer");

  const playlistsPalestine = await getPlaylists(selectedFilter, "PS");
  displayPlaylists(playlistsPalestine, "Palestine", "palestineContainer");

  const playlistsPhilippines = await getPlaylists(selectedFilter, "PH");
  displayPlaylists(playlistsPhilippines, "Philippines", "philippinesContainer");

  const playlistsPoland = await getPlaylists(selectedFilter, "PL");
  displayPlaylists(playlistsPoland, "Poland", "polandContainer");

  const playlistsPortugal = await getPlaylists(selectedFilter, "PT");
  displayPlaylists(playlistsPortugal, "Portugal", "portugalContainer");

  const playlistsQatar = await getPlaylists(selectedFilter, "QA");
  displayPlaylists(playlistsQatar, "Qatar", "qatarContainer");

  const playlistsRomania = await getPlaylists(selectedFilter, "RO");
  displayPlaylists(playlistsRomania, "Romania", "romaniaContainer");

  const playlistsSaudiArabia = await getPlaylists(selectedFilter, "SA");
  displayPlaylists(playlistsSaudiArabia, "Saudi Arabia", "saudiContainer");

  const playlistsSingapore = await getPlaylists(selectedFilter, "SG");
  displayPlaylists(playlistsSingapore, "Singapore", "singaporeContainer");

  const playlistsSouthAfrica = await getPlaylists(selectedFilter, "ZA");
  displayPlaylists(playlistsSouthAfrica,"South Africa","southafricaContainer");

  const playlistsSouthKorea = await getPlaylists(selectedFilter, "KR");
  displayPlaylists(playlistsSouthKorea, "South Korea", "southkoreaContainer");

  const playlistsSpain = await getPlaylists(selectedFilter, "ES");
  displayPlaylists(playlistsSpain, "Spain", "spainContainer");

  const playlistsSweden = await getPlaylists(selectedFilter, "SE");
  displayPlaylists(playlistsSweden, "Sweden", "swedenContainer");

  const playlistsSwitzerland = await getPlaylists(selectedFilter, "CH");
  displayPlaylists(playlistsSwitzerland, "Switzerland", "switzerlandContainer");

  const playlistsTaiwan = await getPlaylists(selectedFilter, "TW");
  displayPlaylists(playlistsTaiwan, "Taiwan", "taiwanContainer");

  const playlistsThailand = await getPlaylists(selectedFilter, "TH");
  displayPlaylists(playlistsThailand, "Thailand", "thailandContainer");

  const playlistsTunisia = await getPlaylists(selectedFilter, "TN");
  displayPlaylists(playlistsTunisia, "Tunisia", "tunisiaContainer");

  const playlistsTurkey = await getPlaylists(selectedFilter, "TR");
  displayPlaylists(playlistsTurkey, "Turkey", "turkeyContainer");

  const playlistsUAE = await getPlaylists(selectedFilter, "AE");
  displayPlaylists(playlistsUAE, "United Arab Emirates", "uaeContainer");

  const playlistsVietnam = await getPlaylists(selectedFilter, "VN");
  displayPlaylists(playlistsVietnam, "Vietnam", "vietnamContainer");
}
init();
