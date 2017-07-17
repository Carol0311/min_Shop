/**
 * Created by Administrator on 2017/7/14.
 */
function encrypt(str){
    return require('crypto').creatHash('md5').update(str).update(str).digest('hex');
}
console.log(encrypt("2570071993@qq.com"));
