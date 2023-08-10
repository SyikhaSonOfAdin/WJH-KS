// LOGIN
async function user_validation() {
    const email = document.getElementById('email').value ;
    const password = document.getElementById('password').value ;

    try {
        const response = await fetch('/Model/login', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : 'email=' + email + '&password=' + password
        })
        if (response.ok) {
            const data = await response.json()
            if (data.login === 'success') {
                window.location.href = '/' ;
            } else {
                const warn = document.getElementById('warning');
                warn.classList.replace('hidden', 'flex') ;
            }
        }
    } catch (error) {
        console.log(error) ;
    }
}

const form = document.getElementById('login-form').addEventListener('submit', (event) => {
    event.preventDefault();
    user_validation();

})