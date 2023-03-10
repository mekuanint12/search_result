document.getElementById('search-input').addEventListener('keyup', async (e) => {
    // selecting elements from the DOM
    const searchResults = document.getElementById('search-results');
    const errorMessage = document.getElementById('error-message');

    try {
        errorMessage.textContent = '';
        
        const userInput = e.target.value;

        // Clear the searchResults element if userInput is empty
        if (userInput.trim() === '') {
            searchResults.innerHTML = '';
            return;
        }

        const response = await fetch('https://jsonplaceholder.typicode.com/comments?postId=3');
        const results = await response.json();

        const filteredResults = results.filter((result) => {
            return result.name.toLowerCase().includes(userInput.toLowerCase())
        });

        if (filteredResults.length === 0) {
            searchResults.textContent = 'No results are found with this name';
        } else {
            searchResults.innerHTML = ''; 
            filteredResults.forEach((result) => {
                const resultElement = document.createElement('div');
                resultElement.textContent = result.name;
                searchResults.appendChild(resultElement);
            });
        }

    } catch (error) {
        errorMessage.textContent = error.message;
    }
});
