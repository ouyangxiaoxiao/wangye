var html = "";
    $.ajax({
        type: "get",
        // url: "test01.php",
        url: "https://api.cloud.taozhi.online/album-management/client//content/allOrFree/resalb2020080404543p8agkxw?page=1&size=999&menuId=0&isQueryFree=false",
        success: function (data) {
            // console.log(data);
            data = (data.data);
            // console.log(data.length);
            for (k in data) {
                vid = ((data[k]).vid);
                // console.log(vid);
                $.ajax({
                    type: "get",
                    url: "https://api.cloud.taozhi.cn/common/aliVod/common//play/getPlayInfo?videoId=" + vid,
                    success: function (data2) {
                        for (k in data2) {
                            // console.log((data2[k]));
                            // console.log((data2[k]).requestId);
                            title = (((data2[k]).videoBase).title);
                            playURL = ((((data2[k]).playInfoList)[1]).playURL);
                            console.log(title);
                            console.log(playURL);
                            //用模板字符串将key value,拼接到html字符串中。
                            // html+=`<li>${title} :${playURL}</li>`;
                            html+= `<li value="${playURL}"><span>	${title}	</span><span>	小学科学课	</span><span>	小学	五年级	兴趣爱好	</span></li>`;
                        }
                        // $("#div1 ul").html(html);
                        $(".kcxq ul").html(html);

                    }

                })

            }

        }

    });




