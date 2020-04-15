const request=function(options){
  return new Promise(function(resolve,reject){
    const requestOptions = {
      url:options.url,
      method: 'Get' || options.method,
      data: options.data,
      success:resolve,
      fail:reject
    };
    wx.request(requestOptions);
  });
}

module.exports={
  request:request
}