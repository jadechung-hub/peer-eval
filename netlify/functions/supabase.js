exports.handler = async (event) => {
  const { action, table, data } = JSON.parse(event.body)
  
  try {
    const response = await fetch(
      `https://rxjdhgbczubyukyciahw.supabase.co/rest/v1/${table}`,
      {
        method: action === 'insert' ? 'POST' : 'GET',
        headers: {
          'apikey': 'sb_publishable_7ehCkkr7aawuJSIOb_DGCA_hWsgLMGs',
          'Authorization': 'Bearer sb_publishable_7ehCkkr7aawuJSIOb_DGCA_hWsgLMGs',
          'Content-Type': 'application/json'
        },
        body: action === 'insert' ? JSON.stringify(data) : undefined
      }
    )
    
    return {
      statusCode: 200,
      body: JSON.stringify(await response.json())
    }
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.message })
    }
  }
}
