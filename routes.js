const routes = require('next-routes')

                                                    // Name   Page      Pattern
module.exports = routes()                           // ----   ----      -----
.add('index')                                       // index  index     /index
.add('channel', '/:slug.:id', 'channel')            // channel   channel    /:slug:id
.add('podcast', '/:slugChannel.:idChannel/:slug.id', 'podcast' )
