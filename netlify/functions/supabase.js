const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  'https://rxjdhgbczubyukyciahw.supabase.co',
  'sb_publishable_7ehCkkr7aawuJSIOb_DGCA_hWsgLMGs'
)

exports.handler = async (event) => {
  try {
    const { action, table, data } = JSON.parse(event.body)
    
    let result
    
    if (action === 'select') {
      const { data: rows, error } = await supabase.from(table).select('*')
      if (error) throw error
      result = rows
    } else if (action === 'insert') {
      const { data: rows, error } = await supabase.from(table).insert(data).select()
      if (error) throw error
      result = rows
    }
    
    return {
      statusCode: 200,
      body: JSON.stringify(result || [])
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    }
  }
}
