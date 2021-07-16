exports.EnrollWH = function(req,res,app,db,fileName){
  var mysql = require('mysql');
  var connection = mysql.createConnection(require('../Module/db').info);
  connection.connect();
  var limEightDigit = /^(\d{1,8})/; //8자리 정수만 받는 정규식
  var onlyNum = /^[0-9]*$/;         //숫자만 받는 정규식
  var engishDigit = /^[a-zA-Z0-9]+$/;    //영어 대소문자 및 숫자 받는 정규식
  var fileInfo = {
    "warehouseID":req.body.warehouseID,
    "filename": fileName
  };
  var attr = {
    "warehouseID": req.body.warehouseID,
    "warehouseName": req.body.warehouseName,
    "enrolledDate": new Date(),
    "zipcode": req.body.zipcode,
    "address": req.body.address,
    "latitude": req.body.lat,
    "longitude": req.body.lng,
    "landArea": req.body.landArea,
    "floorArea": req.body.floorArea,
    "useableArea":  req.body.floorArea,
    "price": req.body.price,
    "infoComment": req.body.infoComment,
    "etcComment" :req.body.etcComment,
    "iotStat" : "N"  // pv_EnrollWH.ejs - iotStat 구현되면 수정
  };

  //예외처리를 위한 정규식
  if (limEightDigit.test(attr.warehouseID) == false) {
    res.send("errortype1");
    console.log('errortype1');
  } else if (onlyNum.test(attr.landArea) == false ) {
    res.send("errortype2");
    console.log('errortype2');
  } else if (onlyNum.test(attr.floorArea) == false) {
    res.send("errortype3");
    console.log('errortype3');
  } else if (onlyNum.test(attr.price) == false) {
    res.send("errortype4");
    console.log('errortype4');
  } else if ((engishDigit.test(attr.warehouseName) || (engishDigit.test(attr.infoComment)) || (engishDigit.test(attr.etcComment))) == false) {
    res.send("errortype6");
  } else {
      connection.query('INSERT INTO FileInfo SET ?' , fileInfo, function (error, results, fields) {
        if (error) {
            console.log("error ocurred FileInfo error", error);
            res.redirect('/Provider/EnrollWH');
        }
        else{
          var item = {
            "warehouseID": req.body.warehouseID,
            "warehouseName": req.body.warehouseName,
            "enrolledDate": new Date(),
            "zipcode": req.body.zipcode,
            "address": req.body.address,
            "latitude": req.body.lat,
            "longitude": req.body.lng,
            "landArea": req.body.landArea,
            "floorArea": req.body.floorArea,
            "useableArea":  req.body.floorArea,
            "price": req.body.price,
            "infoComment": req.body.infoComment,
            "etcComment" :req.body.etcComment,
            "iotStat" : "N"  // pv_EnrollWH.ejs - iotStat 구현되면 수정
        }
        let reqResult = db.query('SELECT * from RequestForEnroll ORDER BY reqID DESC');
        //let logResult = db.query('SELECT * from Log ORDER BY logID DESC');
        var reqno = 1;
        var logno = 1;
        if(reqResult.length>0)
          reqno = reqResult[0].reqID+1;
        connection.query('INSERT INTO Warehouse SET ?' , item, function (error, results, fields) {
            if (error) {
              if (error.message.indexOf('ER_DUP_ENTRY') === 0) {
                console.log('errortype7');
                res.send("errortype7");
              } else {
                console.log("error ocurred Warehouse set error", error.message);
                res.redirect('/Provider/EnrollWH');
              }
            } else {
                var reqItem ={
                  "reqID":reqno,
                  "reqDate":new Date(),
                  "reqType":"ReqEnrollPV",
                  "providerID":req.session['memberID'],
                  "warehouseID":req.body.warehouseID,
                  "logID":logno
                };

                connection.query('INSERT INTO RequestForEnroll SET ?' , reqItem, function (error, results, fields) {
                  if (error) {
                    console.log("error ocurred RequsetForEnroll error", error);
                    res.send("errortype5");
                  }
                  else{
                    console.log('errortype0');
                    res.send("errortype0");
                    //res.redirect('/Provider/MyWarehouse');
                  }
                });
              }
          });
        }
    });
  }
}
