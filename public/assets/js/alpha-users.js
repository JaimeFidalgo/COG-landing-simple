const newUser = {
    user: document.getElementById('beta-users-name').value,
    mail: document.getElementById('beta-users-email').value,
    address: document.getElementById('beta-users-address').value,
}

function pruebaemail(valor) {
    re = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
    if (!re.exec(valor)) {


        return false;
    } else {
        return true;
    }}


    async function sendBetaUsers() {
        const newUser = {
            user: document.getElementById('beta-users-name').value,
            mail: document.getElementById('beta-users-email').value,
            address: document.getElementById('beta-users-address').value,
        }
        let a = true;
        let b = true;
        let c = true;
        console.log('me has dado click')
        console.log(newUser)
        let d = pruebaemail(newUser.mail);


        if (newUser.user.length == 0 || newUser.mail.length == 0 || newUser.address.length == 0) {
            alert('User Name, e-mail and ETH-address are required to submit the form')
        } else if (newUser.address.length != 42) {
            alert('Introduce a valid ETH-Address. (x42 characters)')
        } else if (!d) {
            alert('Please, introduce a valid E-mail');
        } else {


            const alphaUsers = await fetch('https://www.chainsofglory.com/api/alpha-users')
                .then(response => response.json())
                .then(data => {
                    for (let i = 0; i < data.length; i++) {
                        if (newUser.user == data[i].user) {
                            a = false;

                            alert('User Name is already used. Please introduce a valid User Name')

                            break

                        } else {
                            a = true;
                        }

                    }

                    for (let i = 0; i < data.length; i++) {
                        if (newUser.mail == data[i].mail) {
                            alert('E-mail is already used. Please introduce a valid E-mail')
                            b = false;
                            break


                        } else {
                            b = true;
                        }

                    }

                    for (let i = 0; i < data.length; i++) {
                        if (newUser.address == data[i].address) {
                            alert('ETH-Address is already used. Please introduce a valid ETH-Address')
                            c = false;
                            break

                        } else {
                            c = true;
                        }

                    }
                })

            if (a && b && c) {


                const fetchData = await fetch('https://www.chainsofglory.com/api/alpha-users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newUser)// no puedo enviar a la api un objeto, tengo que enviar un json.
                    // igual que cuando recibo el json tengo que convertirlo a objeto
                    // mode: 'no-cors'

                }).then(alert('Thanks for register. Your data have been properly submited'))

                fetchData;

            }
        }

    };



