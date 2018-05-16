# wenjuan网post请求内容
首先get请求 https://www.wenjuan.com/s/*** 获取返回的网页

## 表单数据
- total_answers_str    *为答题编号、网页中取*
- pconvert_data    *为{}*
- finish_status    *为1*
- timestr    *网页中取*
- idy_uuid    *网页中取*
- svc
- project_version    *为3*
- s_code
- s_func_id    *网页中取*
- vvv    *网页中取*
- rand_int    *网页中取*
- question_captcha_map_str    *为{}*
- _xsrf    *网页中取*

### svc和s_code的获取
#### svc
观察到网页中370~400存在eval("s1(10)***"),即大量的s1。于是全文搜索"s1",找到了一个js文件引用处
```
<script type="text/javascript" src="https://static-wenjuan.b0.upaiyun.com/static/js/translate/zh_CN/s1.js?v=2757ab07bedf484178119740f0a05e60"></script>
```
于是将s1.js下载到本地

全文搜索svc后找到有处有点兴趣(第14行左右，左右是因为便于读代码我把一些特征处规范了格式)
```
"svc":et([get_oid(project),uuid,timestr],ev)
```
在et参数的[get_oid(project),uuid,timestr]中，uuid和timestr应该就是返回网页中取得的，get_oid(project)暂不知是什么。

重新看了看post的表单，svc是32位字符串，猜测MD5加密

于是搜索MD5，大概在第3行左右
```
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36);};if(!''.replace(/^/,String)){while(c--)d[c.toString(a)]=k[c]||c.toString(a);k=[function(e){return d[e];}];e=function(){return '\\w+';};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('4 8(a,b){1 d,e,c="";5(d=0;d<a.7/b;d++)e=a.g(d*b),c+=e;3 c}4 h(9,6){1 f=k;3 i("f = j"+6),f(9)}4 l(a){1 c,b="";5(c=0;c<a.7;c++)b+=8(a[c],2);3 m(b)}',23,23,'|var||return|function|for|v|length|slice_str|sa|||||||charAt|et|eval|ef|null|ef1|hex_md5'.split('|'),0,{}));
```
发现function(p,a,c,k,e,d)似乎是对js进行了加密，百度找到个方法
https://blog.csdn.net/cainiaoxiaozhou/article/details/8960561
仿照着解码后得到三个函数(js混淆加密)
```
function slice_str(a, b) {
    var d, e, c = "";
    for (d = 0; d < a.length / b; d++) e = a.charAt(d * b),
    c += e;
    return c
}
function et(sa, v) {
    var f = null;
    return eval("f = ef" + v),
    f(sa)
}
function ef1(a) {
    var c, b = "";
    for (c = 0; c < a.length; c++) b += slice_str(a[c], 2);
    return hex_md5(b)
}
```
根据上述可以想到et([get_oid(project),uuid,timestr],ev)中是将[get_oid(project),uuid,timestr]和ev传入et函数，最后执行ef1返回MD5加密后的值，也就是我们要找的svc

再次浏览返回网页发现多处project_id或proj_id，于是猜想get_oid(project)的值也许就是project_id

而在et中我发现其只是将sa传给了一个叫'ef'+v的函数(下面不就有个ef1嘛)

于是直接将 project_id,uuid和timestr组成列表后传入ef1，发现返回值就是svc

#### s_code
在s1.js中全文搜索s_code后也看到一处(大概第10行)
```
var code='var s_code = '+func_name+'('+rand_int+')';
eval(code);
```
由eval知道有s_code=func_name(rand_int)这个执行过程，而就在返回网页中存在着func_name以及rand_int

那么现在问题就是这个func在哪了。

在s1.js中搜寻func_name，仅仅只有两个地方，内容还一样。搜寻rand_int也不外乎还是那几个地方。

把返回网页中所有引用的可能是隐藏func的js都查了一遍也没找到什么信息...

最后只能再次把搜寻范围拉回到get请求返回的网页。

这网页中最显眼可疑的还是那串s1,对比两份不同的返回网页,发现s1那串开头还挺相似的。

在网上搜索后发现一篇也在做同样事情的博客
https://blog.csdn.net/oscarli/article/details/79351127

以及一个打破僵局的网页回答
https://wx.jdcloud.com/zixun/question-99476.html

回答者提出s1即为如下函数
```
function s1(v) { return String.fromCharCode(v)}
```
于是将这串s1用第一层eval执行后得到了函数体
```
function HLWKvqUl(p430) {
    return 4*5+2+9+3-1-7*8+p430;
}
```
代入rand_int验证，结果就是需要的s_code

到此时，post表单的数据都有来历了。

## 总结一下
1. js混淆加密后会出现如下形态的代码块，通过特征方法(如关键字md5)能在大段js中找到关键的混淆加密块。
```
function(p,a,c,k,e,d){e=function(c){return c.toString(36);};if(!''.replace(/^/,String)){while(c--)d[c.toString(a)]=k[c]||c.toString(a);k=[function(e){return d[e];}];e=function(){return '\\w+';};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('4 8(a,b){1 d,e,c="";5(d=0;d<a.7/b;d++)e=a.g(d*b),c+=e;3 c}4 h(9,6){1 f=k;3 i("f = j"+6),f(9)}4 l(a){1 c,b="";5(c=0;c<a.7;c++)b+=8(a[c],2);3 m(b)}',23,23,'|var||return|function|for|v|length|slice_str|sa|||||||charAt|et|eval|ef|null|ef1|hex_md5'.split('|'),0,{})
```
2. eval配合一些转字符函数可能用来隐藏关键的函数体

   此例中就使用了s1(v) = String.fromCharCode(v)将函数体变成了一长串重复s1的字符串。

## 附录
1. MD5在线加密
https://md5jiami.51240.com/
2. js混淆加密解密
http://tool.chinaz.com/js.aspx
3. 相关文件
   [s1.js](./files/s1.js.txt)
   [js解密后的三个function](./files/functions_mark.js)
   [get到的网页](./files/2018.05.17 04-45-14 get.html)
   [上面get后手动post的数据](./files/2018.05.17 04-45-14 post.png)
   [另一个get到的网页](./files/2018.05.17 04-45-14 another get.html)
