function hide(checked,cname) {
  cname = "#"+cname;
  if (checked){
      $(cname).css("display","flex");
    }
    else {
      $(cname).css("display","none");
    }
}

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

function createCard(url,id,name,max){
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

              let img = document.createElement('img');
              img.className = 'image';
              img.setAttribute("alt","rc");
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
                  left.innerText = ovalue.charAt(0).toUpperCase() + ovalue.slice(1) ;
                  if(ext == max-1){
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
