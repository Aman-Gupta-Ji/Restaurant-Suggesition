class Restro {
    constructor(g, a, f, r, n, p) {
        this.gender=g;
        this.age=a;
        this.food=f;
        this.rating=r;
        this.name=n;
        this.pricing=p;
    }
}

class Processor {
    constructor(src) {
        this.list=new Map();
        let fs = require('fs');
        let g, a, f, r, n, p;
        let data= fs.readFileSync(src).toString();
        const lines= data.split('\n').slice(1);
        for(let line of lines) {
            const words=line.split(',');
            if(words.length!=7)
                continue;
            g=words[1].charAt(0);
            a=parseInt(words[2]);
            f=words[3].toLowerCase();
            r=parseFloat(words[4]);
            n=words[5];
            p=parseFloat(words[6]);
            if(!this.list.has(f))
                this.list.set(f,new Array());
            this.list.get(f).push(new Restro(g,a,f,r,n,p));
        }
    }
    findMatch(age, gender, food, rating, pricing) {
        let food_type;
        if(this.list.has(food))
            food_type=this.list.get(food);
        else
            food_type=[];
        let ar=[];
        let score=0;
        for(let r of food_type) {
            score=0;
            if(Math.abs(r.pricing-pricing)<200)
                score++;
            if(Math.abs(r.age-age)<5)
                score++;
            if(r.gender==gender)
                score++;
            if(Math.abs(r.rating-rating)<1)
                score++;
            ar.push([score,r]);
        }
        ar.sort((x,y)=>{
            if(x[0]!=y[0])
                return y[0]-x[0];
            return y[1].rating-x[1].rating;
        });
        let ret=[];
        for(let i=0, size=ar.length; i<=5 && i<size; i++)
            ret.push(ar[i][1]);
        return ret;
    }
}

// var processor= new Processor("restro.csv");

// console.log(processor.findMatch(20,'M','traditional food',4.1,900));
console.log("Here");
function ShowMatch() {
    console.log("Hello");
    let age=document.forms["registration-form"]["Age"].value;
    let gender=document.forms["registration-form"]["genderlist"].value.charAt(0);
    let food=document.forms["registration-form"]["foodlist"].value.toLowerCase();
    let rating=document.forms["registration-form"]["Rating"].value;
    let pricing=document.forms["registration-form"]["Pricing"].value;
    console.log(age,gender,food,rating,pricing);
    // const res=processor.findMatch(age,gender,food,rating,pricing);
    let out="";
    const res=[];
    for(let r of res)
        out+="<p style='color:green;textsize:20px;'>"+r.name+" : Rs."+r.pricing+"  - "+r.rating+"</p><br>";
    if(out==="")
        out="<h3 syle='color:red;'>No Restaurant Found</h3>";
    document.getElementById("output").innerHTML=out;
}