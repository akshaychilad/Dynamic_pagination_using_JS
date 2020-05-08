let tabs,tabContent,pages,page=0;

          function loadTabs() {
              const promise= new Promise((resolve,reject)=>{
                  const req=new XMLHttpRequest();

                  req.onreadystatechange=function(){
                      if(req.status=='200' && req.readyState=='4'){
                          resolve(JSON.parse(this.responseText))
                      }
                  }
                  req.open("GET","./js/data.json",true);
                  req.send();
            })

             promise.then((result)=>{
                data=result
                createTabs();
              })
              }
              loadTabs();


                function createTabs(){
                  const tabNav = [];
                  const pageNav = [];
                  const tabsWrapper = document.querySelector("#tabs");

                  data.forEach((element, index) => {
                    tabNav.push(`<li class="${index==0 ? 'active' : null}">${element.tabName}</li>`);
                    pageNav.push(`<li class="${index==0 ? 'active' : null}">${index + 1}</li>`);
                      
                });

              tabsWrapper.innerHTML = `<ul class="tabsNav">
               ${tabNav.join("")}
               </ul>
              <div class="tabContent">
                ${data[page].tabData}
              </div>
              <div id="pagenation">
              <span onclick="prev()"> Prev </span>
              <ul>
              ${pageNav.join("")}
              </ul>
              <span onclick="next()"> Next </span>
              </div>`;
              initTabs();
                }
                


            function initTabs() {
               tabs = document.querySelectorAll(".tabsNav li");
               tabContent = document.querySelector(".tabContent");
               pages = document.querySelectorAll("#pagenation li");


              data.forEach((element, index) => {
                tabs[index].onclick = () => showTabs(index);
                pages[index].onclick = () => showTabs(index);
                
                
              });
            }

              showTabs = index => {
                resetTabs();
                // tabContent=document.querySelector(".tabContent")
                page = index;
                tabs[page].className = "active";
                pages[page].className = "active";
                console.log(data[page].tabData)
                tabContent.innerHTML = data[page].tabData;
              }

              resetTabs = () => {
                // console.log(tabContent);
                data.forEach((element, index) => {
                  tabs[index].className = "";
                  pages[index].className = "";
                  //  tabContent[index].style.display = "none";
                });
              }

            
            function prev(){
              console.log("Prev")
                if(page!=0){
                page-=1;
                showTabs(page);
                }
            }

            function next(){
              console.log("Next");
                if(page<tabs.length-1){
                page+=1;
                showTabs(page);
                }
            }