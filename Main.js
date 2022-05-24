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

class Main {
    constructor(src) {
        this.list=new Map();
        
    };
    findMatch(age, gender, food, rating, pricing) {
        let food_type;
        if(this.list.has(food))
            food_type=this.list.get(food);
        else
            food_type=[];
        let ar=[];
        let score=0;
        for(r of food_type) {
            score=0;
            if(Math.abs(r.pricing-pricing)<200)
                score++;
            if(Math.abs(r.age-age)<5)
                score++;
            if(r.gender==gender)
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

