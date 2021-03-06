exports.RequestForIoT = function (req, res,app,db) {
  var items="{";
  let results = db.query("SELECT * from Warehouse, Provider, Member WHERE Warehouse.warehouseID=Provider.warehouseID and Provider.memberID=Member.memberID and Warehouse.iotStat='W';");
  console.log(results);
  if(results.length > 0) {
      var step;
      for(step =0;step<results.length;step++){
          items+= ("\"item"+step+"\":");
          var obj="{"+
              "\"warehouseID\" :"+ results[step].warehouseID+","+              
              "\"reqType\" :\"" + "ReqEnrollIoT"+"\","+
              "\"memberID\" :\""+ results[step].memberID+"\","+
              "\"national\" :\""+ results[step].national +"\","+
              "\"CN\" :\""+ results[step].CN +"\","+
              "\"address\" :\""+ results[step].address +"\","+
              "\"name\" :\""+ results[step].name +"\""+
          "}";
          items+=obj;
          if(step+1<results.length)items+="," 
      }
  }
  items +="}";
  return items;
}

exports.withAnswer = function(req,res,app,db){
  var warehouseID = req.body.warehouseID;
  var reqType = req.body.reqType;
  var answer = req.body.answer;
  var mysql = require('mysql');
  var connection = mysql.createConnection(require('../Module/db').info);
  connection.connect();
  if(answer=="Approve"){
    if(reqType=="ReqEnrollIoT"){
      connection.query(`UPDATE Warehouse SET iotStat='Y' WHERE warehouseID=${warehouseID}`,function (error, results, fields) {
        if(error){
          console.log(error);
          res.send(false);
          connection.end();
        } else {
          res.send(true);
          connection.end();
        }
      });
    }
  } else if(answer=="Reject"){
    connection.query(`UPDATE Warehouse SET iotStat='N' WHERE warehouseID=${warehouseID}`,function (error, results, fields) {
      if(error){
        console.log(error);
        res.send(false);
        connection.end();
      } else {
        res.send(true);
        connection.end();
      }
    });
  }
}