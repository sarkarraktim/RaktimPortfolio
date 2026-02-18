class UploadPage_Settings{
  // Form:
  the_form = document.querySelector('form');
  // itemName:
  itemName = document.getElementById('itemName');
  itemName_errDisplay = document.getElementById('itemName_errDisplay');
  // itemId:
  itemId = document.getElementById('itemId');
  itemid_errDisplay = document.getElementById('itemid_errDisplay');
  // File:
  chooseItem = document.getElementById('chooseItem');
  chooseItemName = document.getElementById('chooseItemName');
  chooseItemRender = document.getElementById('chooseItemRender');
  // inputfile default value:
  defaultvalue = 'No file selected'
  // Submit Display:
  formSubmitDisplay = document.getElementById('formSubmitDisplay');
  // temporary file storage:
  TempFileStrore = null;
  
  constructor(){
    this.AlpahbetOnlyInput();
    this.NumericOnlyInput();
    this.InputFileButton();
    this.SubmitFormSetting();
  };


  // #region (Input Settings):
  AlpahbetOnlyInput(){
    const {itemName, itemName_errDisplay} = this;
    itemName.addEventListener('input', (e) => {
      /** @type {HTMLInputElement} */
      let et = e.target;
      const checkinput = /[^A-Za-z0-9\s\_\-]/g;
      if(checkinput.test(et.value)){
        itemName_errDisplay.innerText = 'Special Characters not allow';
        et.value = et.value.replace(checkinput, '');
      }else{
        itemName_errDisplay.innerText = '';
      }
    });
  };
  
  NumericOnlyInput(){
    const {itemId, itemid_errDisplay} = this;
    itemId.addEventListener('input', (e)=>{
      /** @type {HTMLInputElement} */
      let et = e.target;
      const checkinput = /[^0-9]/g;
      if(checkinput.test(et.value)){
        itemid_errDisplay.innerText = 'Only Number keys allow';
        et.value = et.value.replace(checkinput, '');
      } else {        
        itemid_errDisplay.innerText = '';
      }
    });
  };

  InputFileButton(){
    const {chooseItem, chooseItemName, chooseItemRender} = this;
    chooseItem.onclick = () => {
      const inputF = document.createElement('input');
      inputF.type = 'file';
      inputF.name = 'ItemFILE';
      inputF.accept = '.jpeg,.jpg,.png,.svg,.pdf'
      inputF.onchange = () => {
        const file = inputF.files[0];
        const allowext = /\.(jpeg|jpg|png|svg|pdf)$/i.test(file.name)
        if(!allowext){
          chooseItemName.innerHTML = '<p class="text-[red] font-bold">This file type is not supported</p>';
          chooseItemRender.innerHTML = "";
        } else {
          chooseItemName.innerText = file.name;
          const render = new FileReader();
          render.onload = () => {
            if(file.name.toLowerCase().endsWith('.pdf')){
              chooseItemRender.innerHTML = `<img src="../assets/img/pdfIcon.svg" alt="${file.name}" class="w-32">`;
            } else {
              chooseItemRender.innerHTML = `<img src="${render.result}" alt="${file.name}" class="w-32">`;
            }
          }
          render.readAsDataURL(file);
          this.TempFileStrore = file;
          console.log(this.TempFileStrore)
        }
      };
      inputF.oncancel = () => {
        chooseItemName.innerText = this.defaultvalue;
        chooseItemRender.innerHTML = '';
        this.TempFileStrore = null;
        console.clear()
      };
      inputF.click();
    };
  };

  // #endregion

  // #region (Form Settings):
  SubmitFormSetting() {
    const {the_form, itemName, itemName_errDisplay, itemId, itemid_errDisplay, chooseItemName, chooseItemRender, formSubmitDisplay} = this;
    the_form.addEventListener('submit', async (e)=>{
      e.preventDefault();
      let isValid = true;
      
      /*Invalid*/
      if(itemName.value.length == 0) {
        itemName_errDisplay.innerText = 'Please enter item name';
        isValid = false;
      }else{
        itemName_errDisplay.innerText = '';
      }
      
      if(itemId.value.length == 0){
        itemid_errDisplay.innerText = 'Please enter item id';
        isValid = false;
      }else{
        itemid_errDisplay.innerText = '';
      }

      if(this.TempFileStrore === null) {
        chooseItemName.innerHTML = `<p class="text-[red] font-bold">Please Select a file</p>`;
        isValid = false;
      } else {
        chooseItemName.style.color = 'white'
      }

      /*Valid*/
      if(isValid){
        const res = await this.FormdataSetting();
        if (res.type === 'uploadDone'){
          formSubmitDisplay.innerText = res.message || 'Uploaded';
          formSubmitDisplay.style.visibility = 'visible';
          setTimeout(() => {
            the_form.reset();
            chooseItemName.innerText = this.defaultvalue;
            chooseItemRender.innerHTML = ''
            formSubmitDisplay.style.visibility = 'hidden';
            this.TempFileStrore = null;
            console.clear()
          }, 1000);
        }

      }
    })
  }
  
  async FormdataSetting() {
    const {itemName, itemId, itemName_errDisplay, itemid_errDisplay} = this
    const fd = new FormData();
    fd.append('ItemNAME', itemName.value);
    fd.append('ItemID', itemId.value);
    fd.append('ItemFILE', this.TempFileStrore);
    
    const res = await fetch('/upload', {
      method: 'POST',
      body: fd,
    });

    if(!res.ok) {
      const b_err = await res.json();
      if (b_err.type === 'NameCought') {
        itemName_errDisplay.innerText = b_err.message;
        return b_err;
      }
      if(b_err.type === 'IdCought'){
        itemid_errDisplay.innerText = b_err.message;
        return b_err;
      }
    }else{
      const data = await res.json();
      return data;
    }

  }
  // #endregion
}

(function _() {
  new UploadPage_Settings()
})();

function to_items_page() {
  window.location.href = '/items'
}