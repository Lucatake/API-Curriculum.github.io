window.onload = () =>{
    document.getElementById('arq').addEventListener('change', imageHandler, false);
    document.getElementById('btn_pdf').addEventListener('click', retrurnJson, false);

}

imageHandler = (e) => {
    const reader = new FileReader();
    
    reader.readAsDataURL(e.target.files[0]);

    let formData = new FormData();
    formData.append("file", e.target.files[0]);
    let url = "http://127.0.0.1:3002/api/analyze/";
    //let url = "http://127.0.0.1:3002/apitest";
    axios
      .post(url, formData, {
        headers: {
          "content-type": "application/pdf",
          "Ocp-Apim-Subscription-Key": "267a6513a34b45bb8c045a7099016532",
        },
      })
      .then((res) => {
        console.log(res);
        let rec = res.data.output[0].fields;
      });
  };


  State = {
    analyzing: true,
    nome: "",
    email: "",
    periodo: "",
    curso: "",
    telefone: "",
  };

  
retrurnJson = (e) => {
  console.log("teste");
    let url = "http://127.0.0.1:3002/api/json/";
    axios
      .get(url)
      .then((res) => {
        console.log(res);
        let rec = res.data.output[0].fields;

      State=({
        analyzing: false,
        nome: rec.Nome.value + rec.Sobrenome.value,
        email: rec.Email.value,
        periodo: rec.Periodo.value,
        curso: rec.Curso.value,
        telefone: rec.Telefone.value,
      });
  };