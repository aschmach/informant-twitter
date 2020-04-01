const moment = require ('moment-timezone')
const URL = require ('url')
module.exports = {updateSource}

function updateSource (source, response) {
  // console.log({source})
  try {
    if (!source.process_flags) {
      source.process_flags = {}
    }
    if (!source.source_domain) {
      const {hostname} = URL.parse(source.source_url)
      source.source_domain = hostname
    }
    updatePreviousPull (source, response)
    source.markModified('process_flags')
    return source.save((error, updatedSource) => {
        if (error) {
            return
        } else {
            return
        }
    })
  } catch(e) {
    console.log({e})
  }

}

function updatePreviousPull (source, response) {
  let error = true
  const {links, extras} = response
  let links_count
  if (links && links.length) {
    links_count = links.length
    error = false
  }
  const date = moment().tz('America/Chicago').toISOString()

  source.process_flags.previous_pull = {
    date,
    links,
    links_count,
    extras,
    error 
  }
}