const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const path = require('path')

const app = express()
app.use(express.json({extended: true}))
app.use('/api/auth', require('./routes/auth.route'))
app.use('/api/link', require('./routes/link.route'))
app.use('/to', require('./routes/redirect.route'))

if (process.env.NODE_ENV === 'production'){
	app.use('/', express.static(path.join(__dirname, 'client', 'build')))
	app.get('*', (request, response) => response.sendFile(path.join(__dirname, 'client', 'build', 'index.html')))
}

const PORT = config.get('port') || 3000
async function start() {
	try {
		await mongoose.connect(config.get('mongoUri'), {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true
		})
		app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
	} catch (error) {
		console.log('Server error', error.message)
		process.exit(1)
	}
}
start()
