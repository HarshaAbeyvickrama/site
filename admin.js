
let selectedFile;
//console.log(window.XLSX);
document.getElementById('input').addEventListener("change", (event) => {
    selectedFile = event.target.files[0];
})

let data=[{
    "name":"jayanth",
    "data":"scd",
    "abc":"sdef"
}]

var rowObject=null;
document.getElementById('button').addEventListener("click", () => {
    XLSX.utils.json_to_sheet(data, 'out.xlsx');
    if(selectedFile){
        let fileReader = new FileReader();
        fileReader.readAsBinaryString(selectedFile);
        fileReader.onload = (event)=>{
         let data = event.target.result;
         let workbook = XLSX.read(data,{type:"binary"});
         //console.log(workbook);
         workbook.SheetNames.forEach(sheet => {
              rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
              //console.log(rowObject[5].ID);
              //document.getElementById("jsondata").innerHTML = JSON.stringify(rowObject,undefined,4)
              for(let i=0;i<rowObject.length;i++){
                console.log(rowObject[i].NAME);
                console.log(rowObject[i].ID);
            }
         });
        }
    }
});

//const db=firebase.firestore();


function send(){
    for(let i=0;i<rowObject.length;i++){
        let id=rowObject[i].ID;
        db.collection('ChannelBasics').doc(id).set({
            Name: rowObject[i].NAME,
            ID: rowObject[i].ID,
            
        });
    }
    
}
var channelData=null;
function getAll(){
    
    db.collection('ChannelBasics').get().then((snapshot) =>{
        console.log(snapshot.docs)
        //channelData=snapshot.docs;
        
    });
    return channelData;
}

