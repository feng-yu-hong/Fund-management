module.exports = {
    //注册
    //获取账单
  GET_BILL: function() {
    return "/api/user/order/query"
  },
  //添加账单
  POST_FORM:function(){
    return "/api/user/order/add"
  },
  //删除账单
  POST_DELETE:function(){
    return "/api/user/order/delete"
  },
  //编辑账单
  POST_UPDATA:function(){
    return "/api/user/order/update"
  }
}