/**
 * @param {import('express').Response} res
 */
export const get_items_page_ctrl = (req, res) => {
  res.render('items_page', (err, html)=> {
    if(err){
      res.send('Item page not found');
    } else {
      res.send(html);
    }
  })
}