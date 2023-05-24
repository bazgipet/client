const express = require('express')
require('../db/mongoose')
const path = require('path')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const User = require('../models/user')
const Recipe = require('../models/recipe')

const secretKey = 'my-secret-key';

const app = express()

// setting up a storage and instance of multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.json())
app.use(express.static(path.join(__dirname, '../../build')));


function parseIngredients(text) {
    const regex_amount = /([0-9]+)/g;
    const regex_name = /^[^(]*/g;

    const txt_arr = text.split(';')
    const final_arr = []
    for (let part of txt_arr) {
        let obj = {}
        let ingredient_name = part.match(regex_name)
        if (ingredient_name.length !== 0) {
            obj.ing_name = ingredient_name[0]
        } else {
            obj.ing_name = "Not provided or syntax error - server.js/parseIngredients function"
        }
        let ingredient_amount = part.match(regex_amount)
        if (ingredient_amount.length !== 0) {
            obj.ing_amount = parseInt(ingredient_amount[0], 10)
        } else {
            obj.ing_amount = 0
        }
        final_arr.push(obj)
    }

    return final_arr
}


app.post('/api/register-user', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const usr_registered = await User.findOne({ email })
        if (usr_registered) {
            throw new Error('User with this email already registered.')
        }
        // Create a new user with the provided name, email, and password
        const user = new User({ name, email, password });

        // Save the user to the database
        await user.save();

        const payload = {
            name,
            email,
            password
        };

        // Generate and sign the token
        const token = jwt.sign(payload, secretKey);

        // Return the token in the response
        res.json({ msg: "User sucessfuly created.", token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})


app.post('/api/register-recipe', upload.single("file"), async (req, res) => {
    try {


        const token = req.header('Authorization').replace('Bearer ', '')
        if (!token) {
            throw new Error('No token provided.')
        }
        const decoded = jwt.verify(token, secretKey);

        // loading an image 
        if (!req.file) {
            throw new Error('You must provide a file.')
        }

        let img = {
            data: req.file.buffer,
            contentType: req.file.mimetype
        };

        const user = await User.findOne({ email: decoded.email })
        if (!user) {
            throw new Error('No user id found by given token.')
        }
        const userId = user._id;

        const { name, description, prepare_time, work, ingredients, total_amount } = req.body;

        console.log(name, description, prepare_time, work, ingredients, total_amount)

        console.log(parseIngredients(ingredients))

        // Create a new recipe with the provided properties
        const recipe = new Recipe({
            creater: userId,
            name,
            description,
            prepare_time,
            work: work.split(';'),
            ingredients: parseIngredients(ingredients),
            total_amount,
            img
        });

        // Save the recipe to the database
        await recipe.save();

        res.status(201).json({ message: 'Recipe created successfully' });
    } catch (error) {
        res.status(404).json({ error });
    }
})

app.post('/api/login-user', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email, password })

        if (!user) {
            throw new Error('No user with given credentials found.')
        }

        const payload = {
            name: user.name,
            email: user.email,
            password: user.password
        };

        // Generate and sign the token
        const token = jwt.sign(payload, secretKey);

        // Return the token in the response
        res.json({ msg: "User sucessfuly logged.", token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})


app.get('/api/get-image', async (req, res) => {
    try {
        const recipe = await Recipe.findOne({ name: 'Sun Rise' })

        if (!recipe) {
            return res.status(404).send('Recipe not found')
        }

        if (!recipe.img){
            return res.status(404).send('Recipe has no img')
        }

        // Set the Content-Type header to the image MIME type
        res.setHeader('Content-Type', recipe.img.contentType)

        // Send the image binary data to the client
        res.send(recipe.img.data)

    } catch (error) {
        console.log(error)
        res.status(400).send({ error })
    }
})

app.get('/api/decode-token', (req, res) => {
    if (!req.body.token) {
        throw new Error('No token provided.')
    }

    const decoded = jwt.verify(req.body.token, secretKey);

    res.send(decoded)
})

// Define a route for generating a JWT
app.get('/api/generate-token', (req, res) => {
    // Define the payload to be included in the token
    const payload = {
        userId: 1234,
        email: 'user@example.com'
    };

    // Generate and sign the token
    const token = jwt.sign(payload, secretKey);

    // Return the token in the response
    res.json({ token });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../build', 'index.html'));
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})