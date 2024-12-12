document.getElementById('login-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch ('/login', {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        })

        if(response.ok){
            console.log('Logged in success')
            window.location.href = '/admin';
            //move to admin page

        } else {
            const err = await response.text();
            alert(err);
        }
        
    } catch (error) {
        console.error('Error during login :' , error);
        alert('An error occured while logging in')
    }    
})