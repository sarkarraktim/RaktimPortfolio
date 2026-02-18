
/**
 * @param {import('express').Response}res
 */
export const get_upload_page_ctrl = (req, res) =>{
  res.render('upload_page', (err, html)=>{
    if(err){
      res.send('Page not found')
    }
    res.send(html)
  })
}