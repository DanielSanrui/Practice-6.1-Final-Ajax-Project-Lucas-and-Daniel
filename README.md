# Practice-6.1-Final-Ajax-Project-Lucas-and-Daniel

## **1. Connection to the Deezer API**

The Deezer API connects to our project via public API keys accessible to everyone.  
- **Base URL:** `https://deezerdevs-deezer.p.rapidapi.com/`  
- **Headers Required:**
  - `X-RapidAPI-Key`: Public API key for authentication.
  - `X-RapidAPI-Host`: Specifies the API host.  

Our project uses these keys to authenticate requests and retrieve song data based on user input.

---

## **2. Project File Structure**

The project is divided into three primary files, each serving a distinct purpose:

### **2.1 File: [index.html](index.html)**
- **Purpose:**  
  Contains the layout and structure of the webpage. It includes elements such as the search bar, buttons, and containers for displaying results.  

### **2.2 File: [style.css](style.css)**
- **Purpose:**  
  Handles the visual styling of the webpage, including:
  - Colors.
  - Typography.
  - Spacing and alignment.  

This file ensures the interface is visually appealing and user-friendly.  

### **2.3 File: [app.js](app.js)**
- **Purpose:**  
  Contains all the JavaScript logic for the project, including:
  - Event listeners for user interactions.
  - API integration and data handling.
  - DOM manipulation to display results dynamically.  

---

## **3. Functionality Overview**

### **3.1 Variables**
- `let musics = [];`  
  Stores the array of song data retrieved from the API.  

- `let id;`  
  Tracks the currently selected song.

---
### **3.2 Event Listeners**
#### **3.2.1 Search on Keypress**
```javascript
document.querySelector('#search').addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    Search();
  }
});
```
- `Description:`
Listens for the Enter keypress in the search field (#search) to trigger the Search() function.
#### **3.2.2 Search on Button Click**
```javascript
document.querySelector('#buttonSearch').addEventListener('click', Search);
```
- `Description:`
Listens for a click event on the search button (#buttonSearch) and triggers the Search() function.
### **3.3 Main Function: Search()**
This function performs the core functionality of searching for songs, handling results, and updating the UI.

#### **3.3.1 Clearing Previous Results**
```javascript
document.querySelectorAll('#results > div').forEach(div => div.remove());
```
- `Description:`
Removes any previous search results before performing a new search.
#### **3.3.2 Capturing User Input**
```javascript
const music = document.querySelector('#search').value;
```
- `Description:`
Retrieves the value entered in the search field.
#### **3.3.3 Configuring the API Request**
```javascript
const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${music}`;
const headers = {
  'X-RapidAPI-Key': 'YOUR_API_KEY',
  'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
};
```
- `Description:`
Constructs the API request URL and specifies the required headers for authentication.
#### **3.3.4 Making the Request**
```javascript
fetch(url, { method: 'GET', headers })
```
- `Description:` 
Sends a GET request to the Deezer API to fetch the search results.
#### **3.3.5 Handling the Response**
- **Validating the Response:**

```javascript

if (!response.ok) {
  throw new Error(`HTTP error! Status: ${response.status}`);
}
```
Throws an error if the API response is unsuccessful.

- **Processing the Data:**

```javascript
const results = data.data;
```
Extracts the array of song results from the API response.
#### **3.3.6 Favourite feature**
By clicking the "Add to Favorites" button, the song is saved in LocalStorage, making it accessible when the page is reloaded and displayed at the bottom of the page.


```javascript

function addToFavorites(index) {
  const music = musics[index];
  if (!favorites.some((fav) => fav.id === music.id)) {
    favorites.push(music);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    renderFavorites();
  }
}
```

Remove function:
```javascript
function removeFromFavorites(index) {
  favorites.splice(index, 1);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  renderFavorites();
}
```


#### **3.3.7 Displaying Results**
- **Case: No Results Found:**

```javascript

if (!results || results.length === 0) {
  const noResults = document.createElement('div');
  noResults.className = 'noResults';
  noResults.textContent = 'No results found';
  document.querySelector('#results').appendChild(noResults);
}
```
Displays a message if no songs match the search query.

- **Case: Results Found:**

    - **Removing Duplicates:**

```javascript

const setResult = new Set();
const filterResults = results.filter(result => {
  const duplicated = setResult.has(result.title);
  setResult.add(result.title);
  return !duplicated;
});
```
Ensures that songs with duplicate titles are removed from the displayed results.

- **Rendering Results:**

```javascript

filterResults.forEach((music, index) => {
  musics[index] = music;
  const resultDiv = document.createElement('div');
  resultDiv.id = music.id;
  resultDiv.className = 'result';
  resultDiv.innerHTML = `
    <img src="${music.artist.picture}" alt="Artist image">
    <h3 id="title${index}" class="title">${music.title}</h3>
    <div class="author">${music.artist.name}</div>
    <div id="content${music.id}" class="content"></div>`;
  document.querySelector('#results').appendChild(resultDiv);
});
```
Dynamically creates and appends elements for each result.

### **3.4 Managing Selection and Preview**
**Click Event on a Result**
```javascript
resultDiv.addEventListener('click', function () {
  document.querySelectorAll('.content').forEach(content => content.innerHTML = '');
  document.querySelector('#selected')?.setAttribute('id', id);
  id = this.id;
  this.id = 'selected';
  const selectedMusic = musics.find(m => m.id === parseInt(id));
  const contentDiv = document.querySelector(`#content${id}`);
  contentDiv.innerHTML = `
    <audio src="${selectedMusic.preview}" controls>
      <p>Your browser does not support this audio element</p>
    </audio>`;
});
```
- `Description:`
Updates the selected song and displays a preview with an audio player.
## **4. Contribution Details**
The work was divided equally among team members:

- `Design` (HTML & CSS): Both members collaborated to design and style the webpage.
- `Logic` (JavaScript): Both members contributed to implementing the functionality and API integration.

Each team member contributed 50% to the practice and the documentation.


GitHub Repository: https://github.com/DanielSanrui/Practice-6.1-Final-Ajax-Project-Lucas-and-Daniel.git
