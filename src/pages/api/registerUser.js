const registerUser = async function(req, res){
    const res2 = await fetch("https://native-plants-backend.herokuapp.com/u/register", {
        method: 'POST',
        body: JSON.stringify({
            username: req.body.username,
            email: req.body.email,
            name: req.body.name,
            password: req.body.password,
            bio: req.body.bio,
            phone_number: req.body.number,
            website: req.body.website
        }),
        headers: { "Content-Type": "application/json" }
    })
    const response = await res2.json()
    console.log(response)
    res.status(201).send({
        msg: "OK"
    })
}

export default registerUser;