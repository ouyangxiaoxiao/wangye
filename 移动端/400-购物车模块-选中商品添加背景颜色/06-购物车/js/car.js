$(function () {
    //1.全选 全不选功能模块
    //就是把全选按钮(checkall)的状态赋值给三个小的摁钮(j-checkbox)就可以了
    //事件可以使用change
    $(".checkall").change(function () {
        // $(this).prop("checked");
        console.log($(this).prop("checked"));
        $(".j-checkbox, .checkall").prop("checked", $(this).prop("checked"));
        //判断是否是全选状态
        if($(this).prop("checked")){
            //让所有的商品添加 添加 check-cart-item 类名
            $(".cart-item").addClass("check-cart-item");
        }else {
            //check-cart-item 移除
            $(".cart-item").removeClass("check-cart-item");

        }
    });
    //2. 如果小复选框被选中的个数等于3， 就应该吧全选按钮悬赏，否则全选按钮不选
    $(".j-checkbox").change(function () {
        // if(被选中的小的复选框的个数 ===3){
        //     就选中全选摁钮
        // }else {
        //     就不选中全选摁钮
        // }


        // console.log($(".j-checkbox:checked").length);
        if ($(".j-checkbox:checked").length === $(".j-checkbox").length) {
            // $(".j-checkbox").length 是所有小复选框的个数
            $(".checkall").prop("checked", true);
        } else {
            $(".checkall").prop("checked", false);
        }
        if($(this).prop("checked")){
            //让当前的商品添加 添加 check-cart-item 类名
            $(this).parents(".cart-item").addClass("check-cart-item");
        }else {
            //check-cart-item 移除
            $(this).parents(".cart-item").removeClass("check-cart-item");

        }
    });
    //3.增减商品数量模块，首先声明 一个变量，当我们点击+号(increment)，就让这个值++，然后赋值给文本框。
    $(".increment").click(function () {
        //得到当前兄弟文本框的值
        var n = $(this).siblings(".itxt").val();

        n++;
        console.log(n);
        $(this).siblings(".itxt").val(n);
        //3.计算小计模块 根据文本框的值  乘以当前商品的价格 就是商品的小计
        // 当前商品的价格p
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        p = p.substr(1);
        // console.log(p);
        var price = (p * n).toFixed(2);
        //可以让我们保留2位小数
        //小计模块
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + price);
        getSum()


    });
    //减去商品件数
    $(".decrement").click(function () {
        //得到当前兄弟文本框的值
        var n = $(this).siblings(".itxt").val();

        if (n == 1) {
            return false;
        }
        n--;
        console.log(n);
        $(this).siblings(".itxt").val(n);
        // 当前商品的价格p
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        p = p.substr(1);
        // console.log(p);
        //小计模块
        // parents(".p-num") 返回指定的祖先元素
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + (p * n).toFixed(2));
        getSum()
    });
    //4.用户修改文本框的值 计算 小计模块
    $(".itxt").change(function () {
        var n = $(this).val();
        //当前商品的单价
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        p = p.substr(1);
        // console.log(p);
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + (p * n).toFixed(2));
        getSum()
    });

    //5.计算总计和总额模块
    getSum();

    function getSum() {
        var count = 0; //计算总件数
        var money = 0; //计算总价钱
        $(".itxt").each(function (i, ele) {
            count += parseInt($(ele).val());
        });
        $(".amount-sum em").text(count);
        $(".p-sum").each(function (i, ele) {
            money += parseFloat($(ele).text().substr(1));
        });
        $(".price-sum em").text("￥" + money.toFixed(2));
    }

    //6.删除商品模块
    //（1）商品后面的删除按钮
    $(".p-action a").click(function () {
        //删除的当前商品
        $(this).parents(".cart-item").remove();
        getSum();
    });
    //（2）删除选中的商品
    $(".remove-batch").click(function () {
        //删除的是小复选框选中的商品
        //冒号后面是判断是否被选中
        $(".j-checkbox:checked").parents(".cart-item").remove();
        getSum();
    });
    //（3）清空购物车 删除全部商品
    $(".clear-all").click(function () {
        $(".cart-item").remove();
        getSum();
    })
});