define(['mui', 'flexible'], function (mui) {
    let container=document.querySelector(".container");
    let adduse=document.querySelector(".adduse")
    // let btns=document.querySelectorAll(".opration>span")
    function init() {
        mui.init();
        getData("/api/getData","get");
    }

    function bindEvent(){
        adduse.addEventListener("tap",addFn);
        //修改 删除
        mui(".opration").on("tap","span",oprationFn);
    }

    function oprationFn(){
        // console.log(this.innerHTML);
        let dataid=this.getAttribute("data-id");
        let parent=this.parentNode.parentNode.parentNode.parentNode;
        let childs=this.parentNode.parentNode.parentNode;
        if(this.innerHTML=="删除"){
            var btnArray = ['否', '是'];
            mui.confirm('您确定删除地址吗？', '确认框', btnArray, function(e) {
                if (e.index == 1) {
                    // info.innerText = '你刚确认MUI是个好框架';
                    getData("/api/revData","get",dataid);
                    parent.removeChild(childs);
                } else {
                    // info.innerText = 'MUI没有得到你的认可，继续加油'
                }
            })
           


           
        }else if(this.innerHTML=="修改"){
            location.href="add.html?id="+this.getAttribute("data-id");
        }
    }

    function addFn(){
        location.href="add.html";
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
                
            }
        })
    }

    function rander(data) {
        if(!data.length){
            return;
        }
        container.innerHTML=data.map((item,index)=>{
            return `
            <li>
            <p class="namePhone">
                <span>${item.name}</span>
                <span>${item.phone}</span>
            </p>
            <div class="address">
            ${item.address}<br/>${item.adrscont}
            </div>
            <div class="btnsCont">
                <p class="setOne">
                    <span class="checkBox ${index==0?"active":""}"></span>设为默认地址
                </p>
                <p class="opration">
                    <span id="deladd" data-id="${item._id}">删除</span>
                    <span data-id="${item._id}">修改</span>
                </p>
            </div>
        </li> 
            `
        }).join("")

        bindEvent();
    }

    init();
});