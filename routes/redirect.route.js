const {Router} = require('express')
const Link = require('../models/link')

const router = Router()
router.get('/:code', async (request, response) => {
  try{
    const link = await Link.findOne({code: request.params.code})

    if(link){
      ++link.clicks
      await link.save()
      return response.redirect(link.from)
    }

    response.status(404).json('Link does not exist')
  }catch(error) {}
})
module.exports = router
