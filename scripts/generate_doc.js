const LogisticNodeModel = require("../db/models/model_logistic_node");
const Knex = require("knex");
const { Model } = require("objection");

// Load Env Variables.
require('dotenv').config();

 // Database Conneciton
const knexConfig = require("../knexfile").development;
const knexConnection = Knex(knexConfig);
Model.knex(knexConnection);
const config = require("./doc_config");

const baseUrl = config.baseUrl;
const apis = config.apiDoc;

run();
async function run() {
    let result = "== [[Api Documentation]] ==\n";
    for (let [key, value] of Object.entries(apis)){
        result+=`=== ${value[0]} ===\n`;
        const v=await value[1].query().columnInfo();
        const primary_key=value[1].idColumn;
        result+=MODEL_DEF(v);
        result+="\n";
        result+=GETALL_METHOD(key,v,primary_key);
        result+="\n";
        result+=GETBYID_METHOD(key,v,primary_key);
        result+="\n";
        result+=CREATE_METHOD(key,v,primary_key);
        result+="\n";
        result+=UPDATE_METHOD(key,v,primary_key);
        result+="\n";
        result+=DELETE_METHOD(key);
        result+="\n";
    }
    const fs=require("fs");
    fs.writeFileSync("output.txt",result);
    console.log("== > output.txt file [generated]");
    process.exit()
}
function MODEL_DEF(model) {
    let str="  '''MODEL'''\n";
    for (let [key1,valu2] of Object.entries(model)) {        
        str+= `  <b style="color:blue;">${key1}</b> : type(<b style="color:green;">${valu2['type']}</b>) ${valu2['defaultValue']==null?"":`default(<b style="color:purple;">${valu2['defaultValue']}</b>) `} ${valu2['nullable']?'<b style="color:red;">nullable</b>':""} \n`;
    }
    return str;
}

function GETALL_METHOD(endpoint) {
    let str="'''GET ALL INFORMATION'''\n\n";
    str+=`<b style="color:green">GET</b> ${baseUrl}${endpoint}\n`;
    return str;
}
function GETBYID_METHOD(endpoint) {
    let str="'''GET BY ID'''\n\n";
    str+=`<b style="color:green">GET</b> ${baseUrl}${endpoint}/:id\n`;
    return str;
}
function CREATE_METHOD(endpoint,model,primary_key) {
    let str="'''CREATE BY BODY_MODEL'''\n\n";
    str+=`<b style="color:purple">POST</b> ${baseUrl}${endpoint}\n`;
    str+="  '''Request'''\n";
    str+=`  { MODEL OBJECT Without ${primary_key} }\n\n`;
    str+="  '''Response'''\n";
    str+='  {\n';
    str+='   message: "Successfully Created",\n';
    str+=`   result: MODEL OBJECT with ${primary_key}\n`;
    str+='   status: 200\n';
    str+='  }\n\n';
    return str;
}
function UPDATE_METHOD(endpoint,model,primary_key) {
    let str="'''UPDATE BY ID and  BODY_MODEL'''\n\n";
    str+=`<b style="color:orange">PUT</b> ${baseUrl}${endpoint}/:id\n`;
    str+="  '''Request'''\n";
    str+=`  { MODEL OBJECT Without ${primary_key} }\n\n`;
    str+="  '''Response'''\n";
    str+='  {\n';
    str+='   message: "Successfully Updated",\n';
    str+='   status: 200\n';
    str+='  }\n\n';
    return str;
}
function DELETE_METHOD(endpoint) {
    let str="'''DELETE BY ID'''\n\n";
    str+=`<b style="color:red">DELETE</b> ${baseUrl}${endpoint}/:id\n`;
    str+="  '''Response'''\n";
    str+='  {\n';
    str+='   message: "Successfully Deleted",\n';
    str+='   status: 200\n';
    str+='  }\n\n';
    return str;
}

