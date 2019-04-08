define(['mui', 'flexible'], function (mui) {
    let inpAll=document.querySelectorAll("input");
    console.log(inpAll);
    let sub=document.querySelector(".adduse");
   
    console.log(sub)
    function init() {
        mui.init();
      
        if(location.search.slice(1)){
             let obj=JSON.parse('{"'+location.search.slice(1).replace(/=/g,'":"').replace(/&/g,'","')+'"}');
            let id=obj.id;
            console.log(id);
            getData("/api/getDataone","get",id)
            sub.addEventListener('tap',updataFn);
        }else{
            sub.addEventListener('tap',adddataFn);
        }

    }

    function adddataFn(){
        let name=inpAll[0].value.trim();
        let phone=inpAll[1].value;
        let number=inpAll[2].value;
        let address=inpAll[3].value;
        let adrscont=inpAll[4].value;
        if(!name || !phone || !address||!adrscont){
            return alert("信息不完整")
        }

        let opt={
            name:name,
            phone:phone,
            number:number,
            address:address,
            adrscont:adrscont,
        }

        mui.ajax("/api/addData", {
            type:"post",
            data:opt,
            success(rs) {
                if (!rs) {
                    return;
                }
                console.log(rs);
                if(rs.code==1){
                    alert("添加成功")
                   location.href="index.html";
                }
                
            }
        })
    }

    function updataFn(){
       let name=inpAll[0].value;
       let phone=inpAll[1].value;
       let number=inpAll[2].value;
       let address=inpAll[3].value;
       let adrscont=inpAll[4].value;
       let opt={
           name:name,
           phone:phone,
           number:number,
           address:address,
           adrscont:adrscont,
           id:id
       }
       mui.ajax("/api/upData", {
        type:"post",
        data:opt,
        success(rs) {
            if (!rs) {
                return;
            }
            console.log(rs);
            if(rs.code==1){
               location.href="index.html";
            }
            
        }
    })
    }

    function rander(data){
       inpAll[0].value=data[0].name;
       inpAll[1].value=data[0].phone;
       inpAll[2].value=data[0].number;
       inpAll[3].value=data[0].address;
       inpAll[4].value=data[0].adrscont;
    }

    function getData(url,type,id) {
        mui.ajax(url, {
            type:type,
            data:{
                _id:id
            },
            success(rs) {
                if (!rs) {
                    return;
                }
                console.log(rs);
                if(rs.code==1){
                    rander(rs.result);
                }
                console.log(rs);
                
            }
        })
    }


    // function liandong(){
    //     (function($, doc) {
    //         $.init();
    //         $.ready(function() {
    //             /**
    //              * 获取对象属性的值
    //              * 主要用于过滤三级联动中，可能出现的最低级的数据不存在的情况，实际开发中需要注意这一点；
    //              * @param {Object} obj 对象
    //              * @param {String} param 属性名
    //              */
                
              
    //             var cityPicker3 = new $.PopPicker({
    //                 layer: 3
    //             });
    //             cityPicker3.setData(cityData3);
    //             var showCityPickerButton = doc.getElementById('showCityPicker3');
    //             var cityResult3 = doc.getElementById('cityResult3');
    //             showCityPickerButton.addEventListener('tap', function(event) {
    //                 cityPicker3.show(function(items) {
    //                     cityResult3.innerText = "你选择的城市是:" + _getParam(items[0], 'text') + " " + _getParam(items[1], 'text') + " " + _getParam(items[2], 'text');
    //                     //返回 false 可以阻止选择框的关闭
    //                     //return false;
    //                 });
    //             }, false);
    //         });
    //     })(mui, document);
    // }

 
    init();
});