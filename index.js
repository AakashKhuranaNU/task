async function handleRequest(request) {
  const init = {
    headers: {
      'content-type': type,
    },
  }
  const init1 = {
    headers: {
      'content-type': 'text/html;charset=UTF-8',
    },
  }
  const responses = await Promise.all([fetch(url1, init), fetch(url2, init)])
  const results = await Promise.all([gatherResponse(responses[0])])
  console.log("test",results[0].variants[0])
  var a=results[0].variants[0]
  var b=results[0].variants[1]
  const responses1 = await Promise.all([fetch(a, init)])
  const results1 = await Promise.all([gatherResponse(responses1[0])])
  // console.log(results1)
  const responses2 = await Promise.all([fetch(b, init)])
  const results2 = await Promise.all([gatherResponse(responses2[0])])
  // console.log(results2)
  const TEST_RESPONSE = new Response(results1,init1) 
  const CONTROL_RESPONSE = new Response(results2,init1)
  let group = Math.random() < 0.5 ? 'test' : 'control' // 50/50 split
  let response = group === 'control' ? CONTROL_RESPONSE : TEST_RESPONSE
  return response
    
}
addEventListener('fetch', event => {
  return event.respondWith(handleRequest(event.request))
})
/**
 * gatherResponse awaits and returns a response body as a string.
 * Use await gatherResponse(..) in an async function to get the response body
 * @param {Response} response
 */
async function gatherResponse(response) {
  const { headers } = response
  const contentType = headers.get('content-type')
  if (contentType.includes('application/json')) {
    console.log("yes1")
    return await response.json()
  } else if (contentType.includes('application/text')) {
    console.log("yesy2")
    return await response.text()
  } else if (contentType.includes('text/html')) {
    console.log("yesy3")
    return await response.text()
  } else {
    console.log("yesy4")
    return await response.json()
  }
}
/**
 * Example someHost is set up to return JSON responses
 * Replace url1 and url2  with the hosts you wish to
 * send requests to
 * @param {string} url the URL to send the request to
 */
const someHost = 'https://cfw-takehome.developers.workers.dev/api/variants'
const url1 = someHost  
const url2 = someHost  
const type = 'application/json;charset=UTF-8'