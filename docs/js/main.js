const l=document.querySelector(".js__header_form"),d=document.querySelector(".js__principal_list"),m=document.querySelector(".js__input_button"),u=document.querySelector(".js__input_text"),i=document.querySelector(".js__favourites_list");let c=[],s=[];const h=e=>{const t=document.createElement("li");t.classList.add("card"),t.setAttribute("data-ident",`${e._id}`);const a=document.createElement("img");a.classList.add("card-image"),a.src=`${e.imageUrl}`,a.alt=`${e.name}`,a.title="Add character to favourites";const n=document.createElement("h3"),r=document.createTextNode(`${e.name}`);n.appendChild(r),n.classList.add("card-name"),d.appendChild(t),t.appendChild(a),t.appendChild(n),t.addEventListener("click",f)},p=e=>{const t=document.createElement("li");t.classList.add("favourites-cards"),t.setAttribute("data-ident",`${e._id}`);const a=document.createElement("img");a.classList.add("card-image"),a.src=`${e.imageUrl}`,a.alt=`${e.name}`,a.title="Favourite-card";const n=document.createElement("h3"),r=document.createTextNode(`${e.name}`);n.appendChild(r),n.classList.add("card-name"),i.appendChild(t),t.appendChild(a),t.appendChild(n)},o=()=>{d.innerHTML="";for(const e of c)h(e)},C=()=>{i.innerHTML="";for(const e of s)p(e)},f=e=>{const t=e.currentTarget;t.classList.toggle("favourites");const a=parseInt(t.dataset.ident),n=c.find(r=>r._id===a);s.push(n),C(),console.log(a),console.log(c),console.log(t),console.log(s),console.log(n)},g=()=>{let t=u.value.replace(/ /g,"%20");fetch(`//api.disneyapi.dev/character?name=${t}`).then(a=>a.json()).then(a=>{c=a.data,o()})};l.addEventListener("submit",e=>{e.preventDefault()});m.addEventListener("click",g);fetch("//api.disneyapi.dev/character?pageSize=50").then(e=>e.json()).then(e=>{c=e.data,o(),c.indexOf(t=>{t.imageUrl===-1&&(imgCharacters.src=`https://via.placeholder.com/200x170/ff/666/?text=${character.name}`)})});
//# sourceMappingURL=main.js.map
