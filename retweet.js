var twit=require('twit');
var config=require('./config');
var T=new twit(config);
var tweet,randomtweet;
var retweet=function(){
    var params={
    q: '#Chandler',
    result_type:'recent',
    lang:'en'
    }
    T.get('search/tweets',params,function(err,data){
        if(!err){
            tweet=data.statuses;
            randomtweet=random(tweet);
            var retweetId=randomtweet.id_str;
            if(typeof randomtweet!='undefined')
            {
                T.post('statuses/retweet/:id',{
                    id:retweetId
                },function(err,response){
                    if(response){
                        console.log('Retweeted!!!');
                    }
                    if(err){
                        console.log("Something went wrong!!!");
                    }
                }
                );
            }
        }
    else{
        console.log("something went wrong while searching...");
    }
    });
}

retweet();
setInterval(retweet,3000000);

var favtweet=function(){
    var params={
        q:'#Chandler',
        result_type:'recent',
        lang:'en'
    }
    T.get('search/tweets',params,function(err,data){
        tweet=data.statuses;
        randomtweet=random(tweet);
        if(typeof randomtweet!='undefined'){
            T.post('favorites/create',{id:randomtweet.id_str},function(err,response){
                if(err){
                    console.log("Cannot be fav");
                }
                else{
                    console.log("fav marked");
                }
            });
        }
    });
}

favtweet();
setInterval(favtweet,600000);
function random(arr){
    var index=Math.floor(Math.random()*arr.length);
    return arr[index];
};



