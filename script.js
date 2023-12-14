   // Spotify API credentials
   const clientId = 'b180920d0d0f411b98bfdeedab00615a';
   const clientSecret = '4292c7c09db34ad99b169c3d86ff2196';

   // Spotify API endpoints
   const tokenEndpoint = 'https://accounts.spotify.com/api/token';
   const featuredPlaylistsEndpoint = 'https://api.spotify.com/v1/browse/featured-playlists';
   const categoryPlaylistsEndpoint = 'https://api.spotify.com/v1/browse/categories/{category_id}/playlists';

   // Function to get access token
   async function getAccessToken() {
       const response = await fetch(tokenEndpoint, {
           method: 'POST',
           headers: {
               'Content-Type': 'application/x-www-form-urlencoded',
               'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
           },
           body: 'grant_type=client_credentials',
       });

       const data = await response.json();
       return data.access_token;
   }

   // Function to get playlists based on the selected filter
   async function getPlaylists(filter, countryCode) {
       try {
           const accessToken = await getAccessToken();
           let response;

           if (filter === 'featured') {
               if (countryCode) {
                   response = await fetch(featuredPlaylistsEndpoint + `?country=${countryCode}`, {
                       headers: {
                           'Authorization': 'Bearer ' + accessToken,
                       },
                   });
               } else {
                   response = await fetch(featuredPlaylistsEndpoint, {
                       headers: {
                           'Authorization': 'Bearer ' + accessToken,
                       },
                   });
               }
           } else {
               const categoryId = filter;
               response = await fetch(categoryPlaylistsEndpoint.replace('{category_id}', categoryId) + `?country=${countryCode}`, {
                   headers: {
                       'Authorization': 'Bearer ' + accessToken,
                   },
               });
           }

           const data = await response.json();
           return data.playlists.items;

       } catch (error) {
           console.error('Error:', error);
           return [];
       }
   }

   // Function to display playlists
   function displayPlaylists(playlists, country, containerId) {
       const playlistsHtml = playlists.map(playlist => {
           return `<div class="p-4 md:w-1/6 sm:mb-0 mb-6 ">
   <div class="rounded-lg h-40  overflow-hidden">
       <img alt="${playlist.name}" class="object-cover object-center h-full w-full" src="${playlist.images[0].url}">
   </div>
   <h2 class="text-lg font-medium title-font  mt-5">${playlist.name}</h2>
   <p class="text-base leading-relaxed mt-1">${playlist.description}</p>
   <a class="text-indigo-500 inline-flex items-center mt-3" href="${playlist.external_urls.spotify}" target="_blank">Listen on Spotify
       <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
           class="w-4 h-4 ml-2" viewBox="0 0 24 24">
           <path d="M5 12h14M12 5l7 7-7 7"></path>
       </svg>
   </a>
</div>`;
       }).join('');

       const playlistsContainer = document.getElementById(containerId);

       // Replace content with new playlists
       playlistsContainer.innerHTML = `<div class="mb-10"><h2 class="text-4xl font-semibold mb-3">Top Playlists ${country}</h2><div class="flex flex-wrap sm:-m-2 -mx-2 -mb-4 -mt-2">${playlistsHtml}</div></div>`;
   }

   async function init() {
       const initialFilter = 'featured';

       // Get the selected countries from the div elements
       const countryElements = document.querySelectorAll('#featuredPlaylists div');
       const countries = Array.from(countryElements).map(element => element.getAttribute('value'));

       // Fetch and display playlists for Pakistan and US
       const playlistsGlobal = await getPlaylists(initialFilter);
       displayPlaylists(playlistsGlobal, 'Global', 'globalContainer');

       const playlistsPK = await getPlaylists(initialFilter, 'PK');
       displayPlaylists(playlistsPK, 'Pakistan', 'pkContainer');

       const playlistsUS = await getPlaylists(initialFilter, 'US');
       displayPlaylists(playlistsUS, 'US', 'usContainer');
   }

   // Function to handle filter change
   async function changeFilter(selectedFilter) {
       // Fetch and display playlists for Pakistan and US
       const playlistsGlobal = await getPlaylists(selectedFilter);
       displayPlaylists(playlistsGlobal, 'Global', 'globalContainer');

       const playlistsPK = await getPlaylists(selectedFilter, 'PK');
       displayPlaylists(playlistsPK, 'Pakistan', 'pkContainer');

       const playlistsUS = await getPlaylists(selectedFilter, 'US');
       displayPlaylists(playlistsUS, 'US', 'usContainer');
   }

   // Call the init function to load global playlists initially
   init();