const dataload = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories')
    const data = await response.json()
    const tabcontainer = document.getElementById('tabcontainer')
    data.data.forEach((categories) => {
        const div = document.createElement('div')
        div.innerHTML = `
        <div class="tabs tabs-boxed">
  
             <a onclick="handleload('${categories.category_id}')" class="tab tab-active">${categories.category}</a>
       </div>
   
  
   `
        tabcontainer.appendChild(div)
    })



}
const handleload = async (categoryid) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryid}`)
    const data = await response.json()

    const cardcontainer = document.getElementById('cardcontainer')
    cardcontainer.innerHTML = ''

    if (data.data && data.data.length > 0) {
    data.data?.forEach((news) => {
    

        const postedDateSeconds = parseInt(news.others.posted_date, 10);

        const postedTime = isNaN(postedDateSeconds)
            ? '' // If "posted_date" is missing or not a number, display an empty string
            : `Posted ${Math.floor(postedDateSeconds / 3600)}h ${Math.floor((postedDateSeconds % 3600) / 60)}m ago`;
        const verifyIcon = news.authors[0].verified
            ? '<img class="w-6" src="./verified.png" alt="">'
            : '';



        const div = document.createElement('div')

        div.innerHTML = `
        <div id="cardcontainer" class="grid grid-cols-4 gap-2">
        <div class="card lg:w-72 lg:h-96 bg-base-100 shadow-xl grid l">
            <figure><img src=${news.thumbnail} alt="Shoes" /></figure>
            <div class="card-body">
            
              <div class="flex items-center gap-3">
                <img class="w-10 h-10 rounded-[50%] rounded-full" src=${news.authors[0].profile_picture} alt="">
                <h2 class="font-semibold">${news.title}</h2>
              </div>
   <div class="relative">
              
   <div class="flex items-center gap-2">
   <h1>${news.authors[0].profile_name}</h1>
   ${verifyIcon}
 </div>
 
 <div class="absolute bottom-40 left-32 border w-32 text-xs  bg-black bg-opacity-80 text-white ">
         
          
           ${postedTime ? `<p>${postedTime}</p>` : ''}
           </div> 
           <p>${news.others?.views} Views</p>
          
      
          
           <div class="card-actions ">
             
           </div>
         </div>
       </div>
    </div>
   </div>
        `
        cardcontainer.appendChild(div)
    })
}else {
    // Display a message when no data is available
    const noDataMessage = document.createElement('div');
    noDataMessage.innerHTML = ` <div class="">
    <img class="m-auto" src="./Icon.png" alt="">
    <p class="font-extrabold text-4xl text-center">Oops!! Sorry, There is no  content here</p>
</div>`;
    cardcontainer.appendChild(noDataMessage);
  }
}
dataload()
