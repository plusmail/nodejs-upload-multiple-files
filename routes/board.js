const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");
const {uploadController, upload} = require("../middleware/upload");
const {getPagingDataCount, getPagination, getPagingData} = require("../controllers/pagination");
const path = require("path");
const multer = require("multer");
const fs = require('fs');
const {board} = require('../models')
const sequelize = require("sequelize");


router.get('/', async (req, res, next) => {
    let searchkeyword = ""; // 미구현

    const contentSize = 5 // 한페이지에 나올 개수
    const currentPage = Number(req.query.currentPage) || 1; //현재페이
    const {limit, offset} = getPagination(currentPage, contentSize);

    const list =
        await board.findAll({
            raw: true,
            order: [
                ["id", "DESC"]
            ],
            limit, offset
        });
    const listCount =
        await board.findAndCountAll({
            raw: true,
            order: [
                ["id", "DESC"]
            ],
            limit, offset
        });

    const {count: totalItems, rows: tutorials} = listCount;



    console.log("111111111", totalItems, tutorials);

    const pagingData = getPagingDataCount(totalItems, currentPage, limit);

    console.log("22222222", pagingData);

    let cri = currentPage;
    res.render('board/index', {searchkeyword, list:tutorials, pagingData})
  })
  
  
  // 데이터 조회
  router.get('/listget', async (req, res, next) => {
    let searchkeyword = "";
  
    const contentSize = 5 // 한페이지에 나올 개수
    const currentPage = Number(req.query.currentPage) || 1; //현재페이
    const {limit, offset} = getPagination(currentPage, contentSize);
  
    const list =
        await board.findAll({
            raw: true,
            order: [
                ["id", "DESC"]
            ],
            limit, offset
        });
    const listCount =
        await board.findAndCountAll({
            attributes:["id","title","content","writer","passwd",
                [
                    sequelize.fn
                    (
                        "DATE_FORMAT",
                        sequelize.col("regdate"),
                        "%Y-%m-%d %H:%i:%s"
                    ),
                    "regdate",
                ],
            ],
            raw: true,
            order: [
                ["id", "DESC"]
            ],
            limit, offset
        });
  
    const {count: totalItems, rows: tutorials} = listCount;
  
    const pagingData = getPagingDataCount(totalItems, currentPage, limit);
    let cri = currentPage;
  
    console.log("Board list ", tutorials);

    if(totalItems > 0 ){
        res.status(200).json({msg:"seccess", searchkeyword, cri, list:tutorials, pagingData})
    }else{
        res.status(401).json({mesg:"nothing"})
    }
  })
  
  //등록하기
  router.post('/', upload.array("files"), async (req, res, next) => {
  // userHeader 에서 필요한 변수들
    let searchkeyword = "";
  // boardtype 계획중 
    let {boardtype, userid, title, content, password} = req.body;
  
    console.log("Board post files->>>>>", req.files);

    const files = [];
    for (const file of req.files) {
        files.push({filename: file.filename, url: `/custimg/${file.filename}`});
    }
    body = {
        raw: true,
        title,
        content,
        writer: userid,
        passwd: password,
        image: files,
    }
  
    const custRegister = await board.create(body);
  
    return res.status(200).json({"msg" : "success"});
  
  });
  
  
  
  //상세보기
  router.get('/detail/:id', async (req, res, next) => {
 
    console.log('----쿼리에서 id 추출----', req.params.id);

    const {id} = req.params;
    const {searchkeyword, searchtype} = req.query
  
    let Board =
        await board.findOne({
            raw: true,
            where: {
                id
            }
        });
    console.log('----게시글 상세보기----', Board);
    return res.status(200).json({"list": Board, "msg" : "success"});
  
  })
    
  
  // 수정하기
  router.put('/:id', upload.array("files"), async (req, res, next) => {
  
    const {id} = req.params;
    const {searchkeyword, searchtype} = req.query
    let {boardtype, userid, title, content, password} = req.body;
  
    console.info("BoardEdit 1->", req.body);
  
    console.log("BoardEdit->>>>>", req.files);
    const files = [];
    for (const file of req.files) {
        files.push({filename: file.filename, url: `/custimg/${file.filename}`});
    }
  
    console.info("BoardEdit 2->", files);
  
    const checkPwd = await board.findOne({
        attributes: ["passwd"],
        where : {
            id
        }
    })
  
    console.info("BoardEdit 3->", password, checkPwd.passwd);
  
    if( password === checkPwd.passwd){
        const body = {
            raw: true,
            title,
            content,
            writer: userid,
            passwd: password,
            image: files,
        }
  
        const update = await board.update(body, {
            where: {
                id,
            }
        });
  
        console.info("BoardEdit 4->", update);
  
        if(update){
            return res.status(200).json({"msg": "success"});
        }else{
            return res.status(204).json({"msg":"password not equal"});
        }
    }else{
        console.info("BoardEdit 5->", "비번 불일치");
  
        return res.status(405).json({"msg": "notexist"})
    }
  
  });
  
  
  
  //삭제하기
  router.delete('/:id', async (req, res, next) => {
  
    const {id} = req.params;
    const {password} = req.body;
    let boardId = req.query.id
  
    console.log("delete----->", password);
  
    const checkPwd = await board.findOne({
        attributes: ["passwd"],
        where : {
            id
        }
    })
  
    if( checkPwd !== null && password === checkPwd.passwd){
        board.destroy({
            where: {
                id,
            }
        }).then((result) => {
            console.log(result);
            return res.status(200).json({"msg":"deletesuccess"});
        }).catch((err) => {
            return res.status(500).json({"msg":"deletefiled"});
            console.log(err);
            next(err);
        })
    }else{
        return res.status(300).json({"msg":"passwordcheck"});
    }
    
  });
   
  
  module.exports = router;