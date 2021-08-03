$(function () {
   //1.全选 全不选功能模块
   //就是把全选按钮(checkall)的状态赋值给三个小的摁钮(j-checkbox)就可以了
   //事件可以狗屎运chande
   $(".checkall").change(function () {
       // $(this).prop("checked");
       console.log($(this).prop("checked"));
       $(".j-checkbox, .checkall").prop("checked",$(this).prop("checked"));
   });
   //2. 如果小复选框被选中的个数等于3， 就应该吧全选按钮悬赏，否则全选按钮不选
    $(".j-checkbox").change(function () {
        // if(被选中的小的复选框的个数 ===3){
        //     就选中全选摁钮
        // }else {
        //     就不选中全选摁钮
        // }


        // console.log($(".j-checkbox:checked").length);
        if($(".j-checkbox:checked").length ===$(".j-checkbox").length){
            // $(".j-checkbox").length 是所有小复选框的个数
            $(".checkall").prop("checked",true);
        }else {
            $(".checkall").prop("checked",false);
        }
    });
    //3.增减商品数量模块，首先声明 一个变量，当我们点击+号(increment)，就让这个值++，然后赋值给文本框。
    $(".increment").click(function () {
        //得到当前兄弟文本框的值
        var n = $(this).siblings(".itxt").val();
        console.log(n);
        n++;
        $(this).siblings(".itxt").val(n);
        //3.计算小计模块 根据文本框的值  乘以当前商品的价格 就是商品的小计
        // 当前商品的价格p
        var p =$(this).parent().parent().siblings(".p-price").html();
        p = p.substr(1);
        console.log(p);
        //小计模块
        $(this).parent().parent().siblings(".p-sum").html("￥"+p*n);


    });
    //减去商品件数
    $(".decrement").click(function () {
        //得到当前兄弟文本框的值
        var n = $(this).siblings(".itxt").val();
        console.log(n);
        if (n ==1){
            return false;
        }
        n--;
        $(this).siblings(".itxt").val(n);
        // 当前商品的价格p
        var p =$(this).parent().parent().siblings(".p-price").html();
        p = p.substr(1);
        console.log(p);
        //小计模块
        $(this).parent().parent().siblings(".p-sum").html("￥"+p*n);
    });
});