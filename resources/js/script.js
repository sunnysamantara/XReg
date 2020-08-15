// jshint esnext:true
/*
  * Toggle for the main section id "first"
  * checked : The calling element is checked or not
  * cname : class of the element to be toggled
*/
var dimage = {};
var simage = {};
var himage = {};
function hide(checked,cname) {
  cname = "#"+cname;
  if (checked){
      $(cname).css("display","flex");
    }
    else {
      $(cname).css("display","none");
    }
}
/*
  * Create primary set of Checkbox that are hidden by hide function
  * url : url of the google sheet
  * id : page of the google sheet
  * name : id of the parent element to be attached
  * cname : class of the input same as id of calling class
*/
function createCheck(url,id,name,cname){
  drive({sheet:url,tab:id}).then(data => {
    if(data.length){
        data.forEach(items =>{
            let div = document.getElementById(name);
            let p = document.createElement('p');
            let input = document.createElement('input');
            input.setAttribute("type","checkbox");
            input.className = cname;
            let temp = (items.name.replace(/\s/g,''));
            input.id = temp;
            input.classList.add(temp);
            card = "#" + temp ;
            $(document).on("change",card,function(){
              let cname = "#"+temp+'-box';
              if (this.checked){
                $(cname).css("display","flex");
                $("#"+temp+'-check').prop("checked", true);
              }
              else {
                $(cname).css("display","none");
                $("#"+temp+'-check').prop("checked", false);
              }
            });
            p.appendChild(input);
            let label = document.createElement('label');
            label.setAttribute('for',input.id);
            label.innerText = items.name;
            p.appendChild(input);
            p.appendChild(label);
            div.appendChild(p);
        });
    }
  });
}
/*
  * Create card view hierarchy of container >box >inner >inner-con     >image & input .....
  * url : url of the google sheet
  * id : page of the google sheet
  * name : id of the parent element to be attached
  * max : the total number of coloumn in the google sheet except image
  * rating: show start in card
*/
function createCard(url,id,name,max,rating=true,rbutton=false){
  drive({sheet:url,tab:id}).then(data => {
      if(data.length){
          data.forEach(items =>{
              let con = document.getElementById(name);
              let box = document.createElement('div');
              let temp = items.name.replace(/\s/g,'')
              box.className = 'box';
              box.id = temp +'-box';
              con.appendChild(box);
              
              let inner = document.createElement('div');
              inner.className = 'inner';
              box.appendChild(inner);
              
              let innerCon = document.createElement('div');
              innerCon.className = 'inner-con';
              inner.appendChild(innerCon);

              if(rbutton){
                let bin = document.createElement('div');
                bin.className = "rbutton"
                let inner_bin = document.createElement('div');
                for(let i=0; i<4; i++){
                  let inner_label = document.createElement('label');
                  let inner_input = document.createElement('input');
                  inner_input.setAttribute("type","radio");
                  inner_input.name = "map";
                  switch(i){
                    case 0: inner_input.value = 's&d';
                              inner_label.innerHTML ="&nbsp; S&D &nbsp;";
                              break;
                    case 1: inner_input.value = 'hrdpnt';
                              inner_label.innerHTML ="&nbsp; Hardpoint &nbsp;";
                              break;
                    case 2: inner_input.value = 'dom';
                              inner_label.innerHTML ="&nbsp; Domination &nbsp;";
                              break;
                    default: inner_input.value = 'default';
                              inner_label.innerHTML ="&nbsp; Map &nbsp;";
                  }
                  inner_input.className = "inner"+temp ;
                  inner_bin.appendChild(inner_label);
                  inner_label.appendChild(inner_input);
                }
                bin.appendChild(inner_bin);
                innerCon.appendChild(bin);
                
              }

              let img = document.createElement('img');
              img.className = 'image';
              img.setAttribute("alt",temp);
              img.src = items.image ;
              innerCon.appendChild(img);

              let input = document.createElement('input');
              input.setAttribute("type","checkbox");
              input.className = "checkbox";
              input.id = temp +'-check';
              let card = "#"+ temp +'-check';
              let cname = "#"+temp+'-box'
              $(document).on("change",card,function(){
                if(this.checked){
                  $("#"+temp).prop("checked", true);
                  $(cname).css("display","flex");
                }
                else{
                  $("#"+temp).prop("checked", false);
                  $(cname).css("display","none");
                }
              });
              innerCon.appendChild(input);

              let edata = Object.values(items);
              let ext = 0 ;
              Object.keys(items).forEach(ovalue =>{
                let div = document.createElement('div');
                inner.appendChild(div);
                if(!ext){
                  div.className = "title";
                  div.innerText = edata[ext]
                }
                else if(ext<max){
                  let right = document.createElement('div');
                  let left = document.createElement('div');
                  div.appendChild(left);
                  div.appendChild(right);
                  div.className = "data";
                  right.className = "right";
                  left.className = "left";
                  let sample = ovalue.charAt(0).toUpperCase() + ovalue.slice(1) ;
                  if(sample.match(/\d+$/))
                    sample = sample.toLocaleUpperCase().slice(0,-1);
                  left.innerText = sample ;
                  if(ext == max-1 && rating){
                    let star = edata[ext];
                    star = (star >= 5) ? 5 : star ;
                    let unstar = 5 - star ;
                    if(star){
                      for(var i = 0; i< star; i++){
                        html ='<i class="fas fa-star up">';
                        $(".inner .data").last().append(html);
                      }
                    }
                    if(unstar){
                      for(var i = 0; i< unstar; i++){
                        html ='<i class="fas fa-star down">';
                        $(".inner .data").last().append(html);
                      }
                    }
                  }
                  else{
                    right.innerText = edata[ext];
                  }
                }
                ext = ext +1 ;
              });
          });
      }
    });
}
