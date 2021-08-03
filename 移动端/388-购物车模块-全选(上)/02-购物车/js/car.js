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
    })
});