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
      element = await getApi(blogsUrl+"/"+id,["_embed"]);
    }else if(type==="product"){
      element = await getApi(productsUrl+"/"+id,["_embed"]);
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

    loadComments(id)

    opacityBlur = document.querySelector(".opacityBlur")
      if(opacityBlur){opacityBlur.addEventListener("click",()=>toggleText())}
      addModalClick(document.querySelectorAll(".image"))
    }
  }
}


async function loadComments(id){
  comments = await getApi(commentUrl+id)
  let html =""
  const commentContainer = document.querySelector(`#comments-container`)
  if(comments.length===0){
    commentContainer.innerHTML="No comments yet"
    return
  }
  comments.forEach(element => {
    if(element.parent===0){
    console.log(element.content.rendered)
    html+=`
      <div class="comment">
        <span>${cleanTime(element.date)} wrote ${element.author_name}  </span>
        <p>${cleanData(element.content.rendered)}</p>
        <span id='comment${element.id}'></span>
        <div id='newCommentContainer${element.id}' class="reply-container flex-column comment-reply">
          <button onclick='newComment(${element.id})'>Reply to ${element.author_name}</button>
        </div>
      </div>
    `;
    console.log(html)
    }
  });
  commentContainer.innerHTML+=html
    comments.forEach(element => {
    if(element.parent>0){
      hook = commentContainer.querySelector("#comment"+element.parent)
      hook.innerHTML+=`<div class="comment-reply">
        <span>${cleanTime(element.date)} replied ${element.author_name}  </span>
        <p>${cleanData(element.content.rendered)}</p>
        <span id='comment${element.id}'></span>
        
      </div>
`;
  }
  
  });

}
function newComment(id){
  hook = document.querySelector('#newCommentContainer'+id)
  hook.innerHTML=`
    <textarea type="text" id="messageContainer${id}" class="input" name="message"></textarea>
    <button>Post reply</button>
   `;
  hook.querySelector("button").addEventListener("click",() =>postComment(hook,id))
}
function postComment (hook,id){
  inputField = hook.querySelector("textarea")
  if(inputField.value.length>0){
    replyPlace = document.querySelector("#comment"+id)
    replyPlace.innerHTML+=`<div class="comment-reply">
          <span>You replied</span>
          <p>${inputField.value}</p>
        </div>`
    hook.innerHTML=""
  }
}