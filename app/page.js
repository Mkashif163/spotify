"use client";

import React, { useEffect, useState } from "react";
import Countries from "./component/Countries";

export default function Home() {
  const [playlistsByCountry, setPlaylistsByCountry] = useState({});
  const [filter, setFilter] = useState("featured");

  useEffect(() => {
    async function getAccessToken() {
      const tokenEndpoint = "https://accounts.spotify.com/api/token";
      const clientId = "b180920d0d0f411b98bfdeedab00615a";
      const clientSecret = "4292c7c09db34ad99b169c3d86ff2196";

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

    async function getPlaylistsByCountry(countryCode) {
      try {
        const accessToken = await getAccessToken();
        let response;

        if (filter === "featured") {
          response = await fetch(
            `https://api.spotify.com/v1/browse/featured-playlists?country=${countryCode}`,
            {
              headers: {
                Authorization: "Bearer " + accessToken,
              },
            }
          );
        } else {
          const categoryId = filter;
          response = await fetch(
            `https://api.spotify.com/v1/browse/categories/${categoryId}/playlists?country=${countryCode}`,
            {
              headers: {
                Authorization: "Bearer " + accessToken,
              },
            }
          );
        }

        const data = await response.json();

        // Check if 'data.playlists' exists before accessing 'items'
        const playlists = data.playlists ? data.playlists.items : [];

        // Update state with playlists for the current country
        setPlaylistsByCountry((prevPlaylists) => ({
          ...prevPlaylists,
          [countryCode]: playlists,
        }));
      } catch (error) {
        console.error("Error:", error);
      }
    }

    async function getAllPlaylists() {
      // List of countries to fetch playlists for
      const countries = [
        "US",
        "GB",
        "DZ",
        "AR",
        "AU",
        "BH",
        "BR",
        "CA",
        "CL",
        "CO",
        "CZ",
        "DK",
        "DO",
        "FI",
        "FR",
        "DE",
        "GR",
        "HK",
        "IS",
        "IN",
        "ID",
        "IE",
        "IL",
        "IT",
        "JP",
        "JO",
        "KW",
        "LB",
        "MY",
        "MX",
        "MA",
        "NL",
        "NZ",
        "NO",
        "OM",
        "PS",
        "PH",
        "PL",
        "PT",
        "QA",
        "RO",
        "SA",
        "SG",
        "ZA",
        "KR",
        "ES",
        "SE",
        "CH",
        "TW",
        "TH",
        "TN",
        "TR",
        "AE",
        "VN",
      ];

      // Fetch playlists for each country
      for (const country of countries) {
        await getPlaylistsByCountry(country);
      }
    }

    // Fetch playlists for all countries on page load
    getAllPlaylists();
  }, [filter]);

  // Existing function to handle filter change
  const changeFilter = (value) => {
    setFilter(value);
  };

  return (
    <>
      <header className="text-white-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-white-900 mb-4 md:mb-0">
            <span className="ml-3 text-2xl sm:text-4xl md:text-3xl lg:text-3xl xl:text-5xl">
              Spotify World Browser
            </span>
          </a>

          <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
            <a className="mr-5 hover:text-white-900">Select Filter</a>
            <a className="mr-5 hover:text-white-900">
              <select
                name="section"
                onchange="changeFilter(this.value)"
                className="text-white bg-gray-800 border-0 px-3 py-2 focus:outline-none rounded text-base mt-4 md:mt-0"
                onChange={(e) => changeFilter(e.target.value)}
              >
                <option value="featured" selected>
                  Featured
                </option>
                <option value="toplists">Top Lists</option>
                <option value="0JQ5DAqbMKFQ00XGBls6ym">Hip-Hop</option>
                <option value="0JQ5DAqbMKFEC4WFtoNRpw">Pop</option>
                <option value="0JQ5DAqbMKFKLfwjuJMoNC">Country</option>
                <option value="0JQ5DAqbMKFxXaXKP7zcDp">Latin</option>
                <option value="0JQ5DAqbMKFDXXwE9BDJAr">Rock</option>
                <option value="0JQ5DAqbMKFLVaM30PMBm4">Summer</option>
                <option value="0JQ5DAqbMKFAXlCG6QvYQ4">Workout</option>
                <option value="0JQ5DAqbMKFEZPnFQSFB1T">R&amp;B</option>
                <option value="0JQ5DAqbMKFHOzuVTgTizF">Dance/Electronic</option>
                <option value="0JQ5DAqbMKFEOEBCABAxo9">Netflix</option>
                <option value="0JQ5DAqbMKFCWjUTdzaG0e">Indie</option>
                <option value="0JQ5DAqbMKFzHmL4tf05da">Mood</option>
                <option value="0JQ5DAqbMKFCuoRTxhYWow">Sleep</option>
                <option value="0JQ5DAqbMKFy0OenPG51Av">
                  Christian &amp; Gospel
                </option>
                <option value="0JQ5DAqbMKFDTEtSaS4R92">Regional Mexican</option>
                <option value="0JQ5DAqbMKFLb2EqgLtpjC">Wellness</option>
                <option value="0JQ5DAqbMKFFzDl7qN9Apr">Chill</option>
                <option value="0JQ5DAqbMKFPw634sFwguI">EQUAL</option>
                <option value="0JQ5DAqbMKFCfObibaOZbv">Gaming</option>
                <option value="0JQ5DAqbMKFF9bY76LXmfI">Frequency</option>
                <option value="0JQ5DAqbMKFFoimhOqWzLB">
                  Kids &amp; Family
                </option>
                <option value="0JQ5DAqbMKFA6SOHvT3gck">Party</option>
                <option value="0JQ5DAqbMKFIVNxQgRNSg0">Decades</option>
                <option value="0JQ5DAqbMKFImHYGo3eTSg">Fresh Finds</option>
                <option value="0JQ5DAqbMKFAJ5xb0fwo9m">Jazz</option>
                <option value="0JQ5DAqbMKFCbimwdOYlsl">Focus</option>
                <option value="0JQ5DAqbMKFAUsdyVjCQuL">Romance</option>
                <option value="0JQ5DAqbMKFy78wprEpAjl">
                  Folk &amp; Acoustic
                </option>
                <option value="0JQ5DAqbMKFGvOw3O4nLAf">K-Pop</option>
                <option value="0JQ5DAqbMKFRieVZLLoo9m">Instrumental</option>
                <option value="0JQ5DAqbMKFLjmiZRss79w">Ambient</option>
                <option value="0JQ5DAqbMKFFtlLYUHv8bT">Alternative</option>
                <option value="0JQ5DAqbMKFIRybaNTYXXy">In the car</option>
                <option value="0JQ5DAqbMKFPrEiAOxgac3">classNameical</option>
                <option value="0JQ5DAqbMKFIpEuaCnimBj">Soul</option>
                <option value="0JQ5DAqbMKFDBgllo2cUIN">Spotify Singles</option>
                <option value="0JQ5DAqbMKFRY5ok2pxXJ0">
                  Cooking &amp; Dining
                </option>
                <option value="0JQ5DAqbMKFAjfauKLOZiv">Punk</option>
                <option value="0JQ5DAqbMKFQIL0AXnG5AK">Pop culture</option>
                <option value="0JQ5DAqbMKFQiK2EHwyjcU">Blues</option>
                <option value="0JQ5DAqbMKFQVdc2eQoH2s">Desi</option>
                <option value="0JQ5DAqbMKFQ1UFISXj59F">Arab</option>
                <option value="0JQ5DAqbMKFOOxftoKZxod">RADAR</option>
                <option value="0JQ5DAqbMKFJw7QLnM27p6">Student</option>
                <option value="0JQ5DAqbMKFziKOShCi009">Anime</option>
                <option value="0JQ5DAqbMKFRKBHIxJ5hMm">Tastemakers</option>
                <option value="0JQ5DAqbMKFNQ0fGp4byGU">Afro</option>
                <option value="comedy">Comedy</option>
                <option value="0JQ5DAqbMKFDkd668ypn6O">Metal</option>
                <option value="0JQ5DAqbMKFObNLOHydSW8">Caribbean</option>
                <option value="0JQ5DAqbMKFFsW9N8maB6z">Funk &amp; Disco</option>
              </select>
            </a>
          </nav>
        </div>
      </header>

      {Object.entries(playlistsByCountry).map(([countryCode, playlist]) => (
        <Countries
          key={countryCode}
          country={countryCode}
          playlist={playlist}
        />
      ))}
    </>
  );
}
