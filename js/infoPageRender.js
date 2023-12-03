async function infoPageRender(place,type){
  const queryString = document.location.search;
  const params = new URLSearchParams(queryString);
  const id = params.get("id");
  let element;
  let template;
  
  let speedLoadElement = []
  speedLoadElement = await JSON.parse(localStorage.getItem('speedLoad'))
  document.querySelector(`#${place}`).classList.add("info-page")

  if(speedLoadElement && id===JSON.stringify(speedLoadElement.id)){
    console.log('speedLoad')
    element = speedLoadElement
  }else{
    if(type==="blog"){
      element = await getApi(blogsUrl+"/"+id);
    }else if(type==="product"){
      element = await getApi(productsUrl+"/"+id);
      console.log(element)
    }
  }
  if(element){
    if(type==="blog"){
      template = blogPageTemplate(element)
    }else if(type==="product"){
      template = productPageTemplate(element);
    }

    renderPage(place,template)
    function renderPage(place,template){
    document.querySelector(`#${place}`).innerHTML=`${template}`;

    loadComments(id,place)

    opacityBlur = document.querySelector(".opacityBlur")
      if(opacityBlur){opacityBlur.addEventListener("click",()=>toggleText())}
      addModalClick(document.querySelectorAll(".image"))
    }
  }
}


async function loadComments(id,place){
  replies = await getApi(commentUrl+id)
  console.log(replies)
  let html =""
  replies.forEach(element => {
    html+=`
      <div class="comment">
        <span>${cleanTime(element.date)} wrote ${element.author_name}  </span>
        <p>${cleanData(element.content.rendered)}</p>
      </div>
    `;
  });
  document.querySelector(`#${place}`).innerHTML+=html
}