// Get element where content is located
const body = document.getElementById('main') ;


//  Search mechanism
const search = document.getElementById('searchBar').addEventListener('submit', async (event) => {
    event.preventDefault();
    try {
        const response = await fetch('/Model/home', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : 'email=' + email + '&password=' + password
        }) ;
        if (response.ok) {
            const data = await response.text() ;
            body.innerHTML = data ;
        }
    } catch (error) {
        console.log(error) ;
    }
})