class ItemsPageSettings {
  items_div = document.getElementById('items_div');
  loadingHeader = document.getElementById('loadingHeader');  

  constructor() {
    this.APIserve();
  }

  async APIserve() {
    const {items_div, loadingHeader} = this;
    
    try {
      const startTime = performance.now();
      const res = await fetch('/api/items', {method: 'GET'});
      loadingHeader.style.display = 'flex'
      const fetchTime = performance.now() - startTime;

      const animationDuration = (fetchTime + 1000) / 3000;
      loadingHeader.style.animationDuration = `${animationDuration}s`;
      const fetchApiDelay = fetchTime + 100;
      setTimeout(() => {
        loadingHeader.style.display = 'none'
      }, fetchApiDelay);

      if(!res.ok){
        const err = await res.json();
        items_div.innerText = err.message;
        items_div.style.justifyContent = 'center';
        return err;
      }
      const { APIdata } = await res.json();
      
      (function loadAPIdata(param) {
        
        items_div.innerHTML = '';

        // sort API by ID:
        param.sort((a, b)=>{
          const aID = Number(a.b_iID);
          const bID = Number(b.b_iID);
          if(!Number.isNaN(aID) && !Number.isNaN(bID)) return aID - bID;
        })

        param.forEach((e) => {
          
          const Boxcard = document.createElement('div');
          Boxcard.className = 'Boxcard';
          Boxcard.innerHTML = `<div class="Boxcardchild bg-[#e1e96dd2] w-45 min-h-50 flex flex-col justify-center items-center border rounded gap-1 "></div>`
          const Boxcardchild = Boxcard.querySelector('.Boxcardchild')

          // #region Item Name:
          const itemName = document.createElement('div');
          itemName.className = 'itemName';
          itemName.innerHTML = `<p class="mt-1 w-full font-bold text-[16px] text-center  ">${e.b_iName}</p>`;
          // #endregion Item Name:

          // #region Item ID:
          const itemId = document.createElement('div');
          itemId.innerHTML = `<p>${e.b_iID}</p>`
          // #endregion Item ID

          // #region Item Image:
          const itemImage = document.createElement('div');
          itemImage.className = 'itemImage';
          /** @type {string} */
          const file = e.b_fileurl;
          if(file.toLowerCase().endsWith('.pdf')){
            itemImage.innerHTML = `<img src="../assets/img/pdfIcon.svg" alt="${e.b_iName}" class="w-32">`;
          } else {
            itemImage.innerHTML = `<img src="${e.b_fileurl}" alt="${e.b_iName}" class="w-32">`;
          }
          // #endregion Item Image

          // #region Delete Item:
          const deleteButt = document.createElement('button');
          deleteButt.type = 'button';
          deleteButt.className = 'deleteButt';
          deleteButt.innerHTML = `<div class="w-32 h-8 bg-[#0044ff] text-[white] flex justify-center items-center rounded hover:cursor-pointer hover:bg-[#3367f8] active:scale-95 mb-1.5 ">Delete</div>`;

          deleteButt.addEventListener('click', ()=>{
            setTimeout(async() => {
              if(!confirm('Delete this item')) return;
              
              const res = await fetch(`/api/file/${encodeURIComponent(e.b_id)}`, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ items: e.b_id })
              })
              
              if(!res.ok) {
                alert('Can not delete this item');
              } else {
                const Bstatus = await res.json(); 
                alert(Bstatus.message);
                Boxcard.remove();
              }
            }, 150);

          });
          // #endregion Delete Item

          Boxcardchild.append(itemId, itemName, itemImage, deleteButt);
          items_div.append(Boxcard);  
          
        });
      })(APIdata);
      
    } catch (error) {
      console.log(error.message)
    }

  } 
}

(function _(){
  new ItemsPageSettings();
})();

function to_upload_page() {
  window.location.href = '/'
}