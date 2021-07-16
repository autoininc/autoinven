module.exports = function(app,db){
    var express = require('express');
    var router = express.Router();

    const pv_myWH = require('./pv_MyWH');
    const pv_EnrollWH = require('./pv_EnrollWH');

    var check = (req, res, next) => {
        var type = req.session['type'];
        if (!type) res.render('Alert/needLogin');
        else if (type === 'provider') next();
        else res.render('Alert/cannotAccess');
    };
    router.use(check);

    router.get('/',function(req,res,next){
        res.render('User/Provider/pv_EnrollWH',{'app':app,'session':req.session,'db':db});
    });

    router.get('/EnrollWH',function(req,res,next){
        res.render('User/Provider/pv_EnrollWH',{'app':app,'session':req.session,'db':db});
    });

    router.post('/EnrollWH',function(req,res,next){
        if (!req.session['memberID']) {
            console.log('errortype8');
            res.send("errortype8");
        } else {
            let upLoadFile = req.files;
            let fileName = req.files.profile_img.name;
            var fileExt = fileName.substring(fileName.lastIndexOf('.'), fileName.length).toLowerCase();
            fileName = new Date().getTime().toString() + fileExt;
            upLoadFile.profile_img.mv(
                `./Public/Upload/${fileName}`,
                function(err){
                    if(err){
                        res.send(err);
                        console.log('file mv error' + err);
                    }
                    pv_EnrollWH.EnrollWH(req,res,app,db,fileName);
                }
            )
        }
    });

    router.post('/MyWarehouse/Buy/Ans',function(req,res,next){
        pv_myWH.ReqBuyAns(req,res,app,db);
    });

    router.post('/MyWarehouse/Enroll/Ans',function(req,res,next){
        pv_myWH.ReqEnrollAns(req,res,app,db);
    });

    router.post('/MyWarehouse/IoT/Ans',function(req,res,next){
        pv_myWH.ReqIoTAns(req,res,app,db);
    });
    router.get('/MyWarehouse',function(req,res,next){
        var enrollItems = pv_myWH.RequestForEnroll(req,res,app,db);
        var requestItems = pv_myWH.RequestForBuy(req,res,app,db);
        var wList = pv_myWH.Mywarehouse(req,res,app,db);
        enrollItems = JSON.parse(enrollItems);
        requestItems = JSON.parse(requestItems);
        wList = JSON.parse(wList);
        console.log(JSON.stringify(requestItems));
        res.render('User/Provider/pv_MyWH',{'app':app,'session':req.session,'db':db,'enrollItems':enrollItems,'requestItems':requestItems,'wList':wList});
    });

    return router;
};
