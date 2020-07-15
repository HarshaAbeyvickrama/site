// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBnRT0yHNfu7u-2RoYGwBMKP4Se-T5Cgis",
    authDomain: "mate-15935.firebaseapp.com",
    databaseURL: "https://mate-15935.firebaseio.com",
    projectId: "mate-15935",
    storageBucket: "mate-15935.appspot.com",
    messagingSenderId: "16023078075",
    appId: "1:16023078075:web:d376c5600421e63886159e",
    measurementId: "G-P8GMGM9S0M"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const db=firebase.firestore();

//=============================Send data from excel to firebase=====================================

function send(){
    for(let i=0;i<rowObject.length;i++){
        let id=rowObject[i].ID;
        db.collection('ChannelBasics').doc(id).set({
            Name: rowObject[i].NAME,
            ID: rowObject[i].ID,
            
        });
    }
}

//=======================Retrieve all documents from channelBasics========================================

function getAll(){
    var channelData=null;
    db.collection('ChannelBasics').get().then((snapshot) =>{
        console.log(snapshot.docs.length)
        channelData=snapshot.docs;

        
    });
    return channelData;
}



//=========object containing a single channel data======================
function ChannelData(id,name,country,customURL,description,publishedAt,subscribers,thumbnail,uploadsID,videoCount,viewCount){
    this.id=id;
    this.name=name;
    this.country=country;
    this.customURL=customURL;
    this.description=description;
    this.publishedAt=publishedAt;
    this.subscribers=subscribers;
    this.thumbnail=thumbnail;
    this.uploadsID=uploadsID;
    this.videoCount=videoCount;
    this.viewCount=viewCount;
}
//==================Insert data to ChannelDetails==============================================
var count=0;
function addChannelDetails(data){
        db.collection('ChannelDetails').doc(data.id.toString()).set({
            Name:data.name, 
            ID:data.id,
            Country:data.country,
            CustomURL:data.customURL,
            Description:data.description,
            PublishedAt:data.publishedAt,
            Subscribers:data.subscribers,
            Thumbnail:data.thumbnail,
            UploadsID:data.uploadsID,
            VideoCount:data.videoCount,
            ViewCount:data.viewCount
        })
}

function test(){
  
    for(var i=1;i<6;i++){
      addChannelDetails(new ChannelData(i,i,i,i,i,i,i,i,i,i,i,i));
    }
}

