# 使用方法

```
<link rel="stylesheet" href="page.css">
<script src="page.js"></script>
```
需要在想要放置分页插件的地方添加元素：

```
<div class="zyl-page"></div>
```

之后在js中调用初始化page类，例子如下。click是点击按钮的回调函数，两个输入参数分别是event对象和要跳转到的页码。context是回调函数的上下文，默认为window
```
var option = {
    currentPage:1,  //必传参数，初始页面的页码
    itemPerPage: 10, //必传参数，每页显示的消息条数
    totalItem: 101, //必传参数，总共的消息条数
    click:function(e,clickedPage){
        console.log(clickedPage,e)
        console.log(this.a)
    },
    context:this
}
var mypage = new Page(option);
```
