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

// "svc":et([get_oid(project),uuid,timestr],ev)
// et(["5afc38c4a320fc9daad65596", "f48b61782caffef1175547921a2de1bd", "2018-05-17 01:25:12"], ev)

// 用function ev1 跑 ev1([project_id, uuid, timestr]) 得到 svc

// 