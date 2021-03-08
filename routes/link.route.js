const { Router } = require('express')
const shortid = require('shortid')
const Link = require('../models/link')
const auth = require('../middleware/auth.middleware')
const config = require('../config/default.json')

router = Router()

router.post('/generate', auth, async (request, response) => {
  try {
    const baseUrl = config.get("baseUrl")
    const { from } = request.body

    const existing = await Link.findOne({ from })
    if (existing) return response.json({ link: existing })

    const code = shortid.generate()
    const to = baseUrl + '/to/' + code
    const link = new Link({
      from, to, code,
      owner: request.user.userId
    })
    await link.save()

    return response.status(201).json({ link })
  } catch (error) {
    response.status(500).json({ message: "Anything is wrong, please try later" })
  }
})

router.get('/', auth, async (request, response) => {
  try {
    const links = await Link.find({ owner: request.user.userId })
    response.json(links)
  } catch (error) {
    response.status(500).json({ message: "Anything is wrong, please try later" })
  }
})

router.get('/:id', auth, async (request, response) => {
  try {
    const link = await Link.findById(request.params.id)
    response.json(link)
  } catch (error) {
    response.status(500).json({ message: "Anything is wrong, please try later" })
  }
})

module.exports = router
