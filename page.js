var Page = (function(window,document){
    var _current;
    var _totalPage;
    var _itemPerPage;
    var _totalItem;
    var _fn;
    var _window = 3;
    var _context = window;
    
    var $pageItemContainer; 

    var $container;
    var $pagination;
    var $input;

    function page(options){
        _current = options.currentPage;
        _itemPerPage = options.itemPerPage;
        _totalItem = options.totalItem;
        _fn = options.click;
        _context = options.context;
        this.init();
        this.initEvent();
        
    }
    page.prototype.init = function(){
        $container = document.querySelector('.zyl-page');
        $pagination = document.createElement('ul');
        $pagination.innerHTML = '<li class = "zyl-page__botton"'+'data-page="before">上一页</li>'+'<li class="pageitems-container"></li>'+ '<label for ="jump" class="jump-label">跳转到<label/><input id="jump" class="page-input" tpye="number"/>'+'<li class = "zyl-page__botton next"'+'data-page="next">下一页</li>';
        $pageItemContainer = $pagination.querySelector('.pageitems-container');
        _totalPage = Math.ceil(_totalItem/_itemPerPage); //计算总页数

        this.update();
        $container.appendChild($pagination);
    }
    //自定义点击回调函数
    page.prototype.initEvent = function(){
        var t = this;
        $pagination.addEventListener('click',function(e){
            if(e.target.classList.contains('zyl-page__item')){
                var to_page = parseInt(e.target.dataset.page);
                _current = to_page;
                t.update();
                _fn.call(_context,e,to_page);
            }else if(e.target.classList.contains('zyl-page__botton')){
                var type = e.target.dataset.page;
                if(type=='before'){
                    if(_current!=1){   
                        var to_page = --_current;
                        t.update();
                        _fn.call(_context,e,to_page);
                    }
                } else if(type == 'next'){
                    if(_current!=_totalPage){
                        var to_page = ++_current;
                        t.update();
                        _fn.call(_context,e,to_page);
                    }
                }
            }
        },false)
        $input = $pagination.querySelector('input');
        $input.addEventListener('keydown',function(e){
            if(e && e.keyCode == 13){
                var inputText = parseInt(this.value);
                if(Number.isInteger(inputText)){
                    if(inputText>=1 && inputText<=_totalPage){
                        _current = inputText;
                        _fn.call(_context,e,_current);
                    }else{
                        alert('请输入一个有效数字')
                    }
                }else{
                    alert('请输入一个有效数字')
                }
            }
        },false)
    }
    //更新页码
    page.prototype.update = function(){
        var step = Math.ceil((_window-1)/2);
        var before = (_current - step) > 1 ? (_current - step) : 1;
        var next = (_current + step) < _totalPage ? (_current + step) : _totalPage;

        var before_flag = false;
        var next_flag = false;

        $pageItemContainer.innerHTML = '';
        var tpl = '';
        for(var i=1;i<=_totalPage;i++){
            if(i==_current){
                tpl += '<li class = "zyl-page__item on"' + 'data-page="'+i+'">'+i+'</li>';
            }else if(i == before || i == next || i==1 || i == _totalPage){
                tpl += '<li class = "zyl-page__item"' + 'data-page="'+i+'">'+i+'</li>';
            }else if(!before_flag && before>2 && i<before){
                tpl += '<span class="ellipsis">...</span>';
                before_flag = true;
            }else if(!next_flag && next<_totalPage-1 && i>next){
                tpl += '<span class="ellipsis">...</span>';
                next_flag = true;
            }
        }
        $pageItemContainer.innerHTML = tpl;
    }
    return page;
})(window,document)


window.a = 'a';
var option = {
    currentPage:1,
    itemPerPage: 10,
    totalItem: 101,
    click:function(e,clickedPage){
        console.log(clickedPage,e)
        console.log(this.a)
    },
    context:this
}
var mypage = new Page(option);
console.log(mypage)

