import java.util.*;
import java.io.*;
import javafx.util.*;

class Restro {
    char gender;    
    int age;
    String food;
    float pricing;
    float rating;
    String name;
    Restro(char g, int a, String f, float r, String n, float p) {
        gender=g;
        age=a;
        food=f;
        rating=r;
        name=n;
        pricing=p;
    }
}
class Main {
    static HashMap<String,ArrayList<Restro>> list; // < key: food preferences, value : ArrayList<Restro> >
    static void readData(String src) {
        String nextLine[];
        char g;
        int a;
        float r, p;
        String f, n;
        String line, splitBy=",";
        try {
            BufferedReader br = new BufferedReader(new FileReader(src));  
            line=br.readLine();
            while ((line = br.readLine()) != null) {
                nextLine = line.split(splitBy);
                if(nextLine.length!=7)
                    continue;
                g=nextLine[1].charAt(0);
                a=Integer.parseInt(nextLine[2]);
                f=nextLine[3].toLowerCase();
                r=Float.parseFloat(nextLine[4]);
                n=nextLine[5];
                p=Float.parseFloat(nextLine[6]);
                if(!list.containsKey(f))
                    list.put(f, new ArrayList<Restro>());
                list.get(f).add(new Restro(g, a, f, r, n, p));
            }
            br.close();
        }
        catch(Exception e)  {
            System.out.println(e.toString());
        }
    }
    static ArrayList<Restro> findMatch(int age, char gender, String food, float rating, float pricing) {
        PriorityQueue<Pair<Integer,Restro>> pq=new PriorityQueue<Pair<Integer,Restro>>(new Comparator<Pair<Integer,Restro>> () {
            @Override
            public int compare(Pair<Integer,Restro> e1, Pair<Integer,Restro> e2) {
                if(e1.getKey()!=e2.getKey())
                    return e2.getKey()-e1.getKey();
                return (int)(e2.getValue().rating-e1.getValue().rating);
            }
        });
        int score;
        ArrayList<Restro> food_type=list.getOrDefault(food, new ArrayList<Restro>());
        for(Restro r: food_type) {
            score=0;
            if(r.gender==gender)
                score++;
            if(Math.abs(r.age-age)<5)
                score++;
            if(Math.abs(r.rating-rating)<1)
                score++;
            if(Math.abs(r.pricing-pricing)<200)
                score++;
            pq.add(new Pair<Integer,Restro>(score,r));
        }
        ArrayList<Restro> ret=new ArrayList<Restro>();
        for(int i=5; i>=0 && !pq.isEmpty(); i--)
            ret.add(pq.poll().getValue());
        return ret;
    }
    public static void main(String arg[]) {
        list=new HashMap<String,ArrayList<Restro>>();
        readData("D:\\Restro\\DataBase\\restro.csv");
        Scanner sc=new Scanner(System.in);
        Scanner nm=new Scanner(System.in);
        System.out.println("Enter your age, gender, food preference, rating , pricing:");
        int age=nm.nextInt();
        char gender=Character.toUpperCase(sc.nextLine().charAt(0));
        String food=sc.nextLine().toLowerCase();
        float rating=nm.nextFloat();
        float pricing=nm.nextFloat();
        ArrayList<Restro> res=findMatch(age,gender,food,rating,pricing);
        for(Restro r: res)
            System.out.println(r.name+" : "+r.rating+" - Rs."+r.pricing);
        sc.close();
        nm.close();
    }
}
