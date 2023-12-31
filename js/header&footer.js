document.querySelector("header").innerHTML=`${headerTemplate()}`
document.querySelector("footer").innerHTML=`${footerTemplate()}`
if(document.title==="Store"){
    document.querySelector(".pc .storeLink").classList.add("active")
    document.querySelector(".mobile .storeLink").classList.add("active")
}
if(document.title==="Meeple Galaxy"){
    document.querySelector(".pc .homeLink").classList.add("active")
    document.querySelector(".mobile .homeLink").classList.add("active")
}
if(document.title==="Blogs"){
    document.querySelector(".pc .blogLink").classList.add("active")
    document.querySelector(".mobile .blogLink").classList.add("active")
}
if(document.title==="Contact us"){
    document.querySelector(".pc .contactLink").classList.add("active")
    document.querySelector(".mobile .contactLink").classList.add("active")
}

const modal = document.querySelector("#modal-container")

if(modal){
    modal.innerHTML=`${modalTemplate()}`
}

 const searchField = document.querySelector('#search')

if(searchField){
    searchField.innerHTML= `
    <div class="flex-column">
        <input id="search-input"></input>
        <section id="search-container" class="flex-row flex-wrap"></section> 
    </div>
    `;
searchContainer = document.querySelector("#search-container")
searchContainer.innerHTML =""
searchInput = document.querySelector("#search-input")
}

document.querySelector("#headerLinkButton").addEventListener("click",()=>{
    document.querySelector("#header .mobile").classList.toggle("hide")
    document.querySelector(".headerLinks.mobile").scrollIntoView({
          
          });
    });
window.addEventListener("scroll",()=>{
  if(window.scrollY>400){
    mobileMenu =document.querySelector("#header .mobile")
    if(mobileMenu){
      mobileMenu.classList.add("hide")        

    }
  }
});