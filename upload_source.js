const qiniu = require('qiniu'),  //npm i qiniu -S
      { keys, bucket, files } = require('./configs/qiniu');

qiniu.conf.ACCESS_KEY = keys.ak;
qiniu.conf.SECRET_KEY = keys.sk;

// 为什么这里要用立即执行函数? => node服务一运行, 这段脚本就会执行, 上传也就完成了 => 即打包时我们就能上传
;(() => {

  function uploadtoken(bucket, key) {
    // key: 文件前缀 + 文件名
    var policy = new qiniu.rs.PutPolicy({ isPrefixalScope: 1, scope: bucket + ':' + key });
    return policy.uploadToken();
  }

  const config = new qiniu.conf.Config(),
        putExtra = new qiniu.form_up.PutExtra(),
        formUploader = new qiniu.form_up.FormUploader(config);


  files.map(async (file) => {
    const upToken = uploadtoken(bucket.name, file.name);

    try {
      // putFile => 放入文件
    	formUploader.putFile(upToken, file.name, file.path, putExtra, (err, data) => {
        if (err) {
          console.log('Failed to upload data.(101)');
          console.log(err);
          return;
        } 

        console.log('Data has been uploaded successfully.');
        console.log(data);
      })
    } catch (err) {
    	console.log('Failed to upload data.(102)');
      console.log(err);
    }
  });
})();