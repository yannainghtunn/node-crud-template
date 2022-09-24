const fs = require("fs");
const path = require("path");

const MODEL_TEXT = fs.readFileSync(path.join(__dirname, 'model.js'));
const ROUTE_TEXT = fs.readFileSync(path.join(__dirname, 'crud_routes.js'));

const args = process.argv.slice(2);


const MODEL_NAME = args[0];
const TABLE_NAME = args[1];
const TABLE_ID = args[2];


if(MODEL_NAME==undefined || TABLE_ID==undefined || TABLE_NAME==undefined) {
    console.log("Example:");
    console.log("  node crud_generator.js model_name table_name table_id");
    return;
}


const model_path="../db/models/model_"+MODEL_NAME+".js";
const route_path="../routers/v1/routes/"+MODEL_NAME+".js";
const output_model = MODEL_TEXT.toString().replaceAll("MODEL_NAME",MODEL_NAME).replaceAll("TABLE_ID",TABLE_ID).replaceAll("TABLE_NAME",TABLE_NAME);
const output_crud = ROUTE_TEXT.toString().replaceAll("MODEL_PATH","../../"+model_path);

fs.writeFileSync(model_path,output_model);
fs.writeFileSync(route_path,output_crud);

console.log(`MODEL:==> ${model_path}`);
console.log(`ROUTE:==> ${route_path}`);

console.log("----------- DONE ------------");

//MODEL_TEXT
console.log();