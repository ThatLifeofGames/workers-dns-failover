// Configuration
const site = ''
const newIP = ''
const cloudflareAuthKey = ''
const cloudflareAuthEmail = ''
const zoneID = ''
const dnsID = ''
const wwwDnsID = ''


addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  try {

    let status = await fetch('https://' + site)

    if (status.ok) {

      // Site is functional, no DNS update required.

      return new Response('Site is functioning, DNS not updated.', {status: 200})

    } else {

      // Site is not functioning (non 200-299 response), update DNS starting with non www.

      options = {
        'type': 'A',
        'name': site,
        'content': newIP,
        'ttl': '1',
        'proxied': true
      }

      init = {
        body: JSON.stringify(options),
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Email': cloudflareAuthEmail,
          'X-Auth-Key': cloudflareAuthKey,
        }
      }
      
      await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneID}/dns_records/${dnsID}`, init)
      
      // Update www. subdomain too

      options = {
        'type': 'A',
        'name': 'www.' + site,
        'content': newIP,
        'ttl': '1',
        'proxied': true
      }

      init = {
        body: JSON.stringify(options),
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Email': cloudflareAuthEmail,
          'X-Auth-Key': cloudflareAuthKey,
        }
      }
      
      let respon = await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneID}/dns_records/${wwwDnsID}`, init)
      
      return new Response('Success, DNS updated.' + await respon.text(), {status: 200})
    }   
  
  } catch(err) {

  return new Response('error ' + err, {status: 500})

}
}
