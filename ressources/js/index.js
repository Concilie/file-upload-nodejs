const formUpload = document.querySelector('#formUpload')
formUpload.addEventListener('submit', async (e) => {
    e.preventDefault();
    let fd = new FormData()
    fd.append('uploaded_file', uploadFile.files[0])
    const response = await fetch("/upload", {
                                        method: 'POST',
                                        body: fd,
                                        });
   const data = await response.json()
   console.log(data)                                     
   if(data.status === 400) {
        $.notify("An error occured when uploading !", {
            style: 'bootstrap',
            className: 'danger',
            position: "t c"
        });
   } else {
    $.notify("Success !", {
        style: 'bootstrap',
        className: 'success',
        position: "t c"
    });
   }          


})
